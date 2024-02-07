import React, { useState } from 'react';
import { FaRegHourglass } from 'react-icons/fa';
import ActionButton from './ActionButton';
import { VscRunAll } from 'react-icons/vsc';
import { GiMaze } from 'react-icons/gi';
import { AiOutlineClear } from 'react-icons/ai';
import { MdClearAll } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchInitialBoard, fetchMaze, runAlgorithm } from '../redux/thunk';
import { clearPath } from '../redux/nodesSlice';
import { Algorithms } from '../utils/interfaces';

const ActionsPanel = ({
  selectedAlgorithm,
}: {
  selectedAlgorithm: Algorithms,
}) => {
  const [canRun, setCanRun] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const handleClearBoard = () => {
    dispatch(fetchInitialBoard());
    setCanRun(true);
  };

  const handleClearPath = () => {
    dispatch(clearPath());
    setCanRun(true);
  };

  const handleGenerateMaze = () => {
    dispatch(fetchMaze());
    setCanRun(true);
  };

  const handleCallAlgorithm = (algorithm: Algorithms) => {
    setCanRun(false);
    dispatch(
      runAlgorithm({
        algorithm,
      })
    );
  };
  return (
    <>
      <div className='hidden md:flex items-center mb-3'>
        <FaRegHourglass className='text-gray-100 mr-1 text-xl' />
        <h3 className='text-xl text-gray-100 font-medium'>Actions</h3>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <ActionButton
          Icon={VscRunAll}
          iconColor='zinc-200'
          iconSize='23px'
          action={() => handleCallAlgorithm(selectedAlgorithm)}
          hoverColor='green-400'
          disabled={!canRun}
          text='Run'
          textColor='gray-100'
          HideTextOnSm
        />
        <ActionButton
          Icon={GiMaze}
          iconSize='23px'
          iconColor='zinc-200'
          action={() => handleGenerateMaze()}
          hoverColor='red-400'
          text='Generate Maze'
          textColor='gray-100'
          HideTextOnSm
        />
        <ActionButton
          Icon={AiOutlineClear}
          iconSize='23px'
          iconColor='zinc-200'
          action={() => handleClearPath()}
          hoverColor='amber-600'
          text='Clear Path'
          textColor='gray-100'
          HideTextOnSm
        />
        <ActionButton
          Icon={MdClearAll}
          iconSize='23px'
          iconColor='zinc-200'
          action={() => handleClearBoard()}
          hoverColor='red-400'
          text='Clear Board'
          textColor='gray-100'
          HideTextOnSm
        />
      </div>
    </>
  );
};

export default ActionsPanel;
