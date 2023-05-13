import { TbMathFunction } from 'react-icons/tb';
import { RiToolsFill } from 'react-icons/ri';
import { VscRunAll } from 'react-icons/vsc';
import { AiOutlineClear } from 'react-icons/ai';
import { FaRegHourglass, FaEraser, FaWeightHanging } from 'react-icons/fa';
import { MdClearAll } from 'react-icons/md';
import { GiBrickWall } from 'react-icons/gi';
import { useState } from 'react';
import { parseInt } from 'lodash';
import { Algorithms, Tools } from '../utils/interfaces';
import ActionButton from './ActionButton';

interface IConfigMenu {
  callAlgorithm: (algorithm: Algorithms) => void;
  clearBoard: () => void;
  clearPath: () => void;
  canRun: boolean;
  selectedTool: Tools;
  setSelectedTool: React.Dispatch<React.SetStateAction<Tools>>;
  weight: number;
  setWeight: React.Dispatch<React.SetStateAction<number>>;
}

const ConfigMenu: React.FC<IConfigMenu> = ({
  callAlgorithm,
  clearBoard,
  clearPath,
  canRun,
  selectedTool,
  setSelectedTool,
  weight,
  setWeight,
}) => {
  const algorithms: Algorithms[] = ['dijkstra', 'astar', 'dfs', 'bfs'];
  const tools: Tools[] = ['Walls', 'Weight', 'Eraser'];

  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithms>('dijkstra');

  const getToolIcon = (tool: Tools) => {
    if (tool === 'Walls') return GiBrickWall;
    if (tool === 'Weight') return FaWeightHanging;
    if (tool === 'Eraser') return FaEraser;
    return undefined;
  };

  return (
    <div className='py-3 md:py-4 px-1 md:px-4 bg-zinc-900 w-full flex justify-center'>
      <div className='grid grid-cols-3 w-full max-w-screen-2xl'>
        <div className='border-r-2 border-dotted border-gray-400 px-1 md:px-2'>
          <div className='hidden md:flex items-center mb-3'>
            <TbMathFunction className='text-gray-100 mr-1 text-2xl' />
            <h3 className='text-xl text-gray-100 font-medium'>Algorithms</h3>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-1 w-full'>
            {algorithms.map((algo) => (
              <ActionButton
                action={() => setSelectedAlgorithm(algo)}
                buttonColor='sky-700'
                hoverColor='sky-600'
                disabledColor='sky-500'
                textColor='gray-100'
                disabled={algo === selectedAlgorithm}
                text={algo.charAt(0).toUpperCase() + algo.slice(1)}
                key={algo}
              />
            ))}
          </div>
        </div>
        <div className='border-r-2 border-dotted border-gray-400 px-1 md:px-6'>
          <div className='hidden md:flex items-center mb-3'>
            <RiToolsFill className='text-gray-100 mr-1 text-2xl' />
            <h3 className='text-xl text-gray-100 font-medium'>Tools</h3>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
            {tools.map((tool) => (
              <ActionButton
                disabledColor={selectedTool === tool ? 'zinc-700' : undefined}
                hoverColor='bg-zinc-800'
                textColor='gray-100'
                Icon={getToolIcon(tool)}
                iconSize='23px'
                iconColor='gray-100'
                action={() => setSelectedTool(tool)}
                text={tool.charAt(0).toUpperCase() + tool.slice(1)}
                disabled={selectedTool === tool}
                HideTextOnSm
                key={tool}
              />
            ))}
            <div className='custom-number-input'>
              <div className='hidden md:block w-full text-gray-100 text-sm font-semibold mb-1'>
                Set Weight
              </div>
              <div className='flex items-center gap-2'>
                <div>
                  <FaWeightHanging size='23px' className='text-gray-100' />
                </div>
                <div className='flex flex-row w-1 md:w-20 rounded-lg'>
                  <button
                    type='button'
                    onClick={() => setWeight((state) => state - 1)}
                    className=' bg-zinc-700 text-gray-100 hover:text-gray-200 hover:bg-zinc-600 h-full px-1 rounded-l cursor-pointer outline-none'
                  >
                    <span className='m-auto text-2xl font-thin'>−</span>
                  </button>
                  <input
                    type='number'
                    id='custom-input-number'
                    className='text-center min-w-[15px] w-full bg-zinc-500 font-semibold text-md hover:text-gray-300 focus:text-gray-100  md:text-basecursor-default flex items-center text-gray-100  outline-none'
                    name='custom-input-number'
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                  />
                  <button
                    type='button'
                    onClick={() => setWeight((state) => state + 1)}
                    className='bg-zinc-700 text-gray-100 hover:text-gray-200 hover:bg-zinc-600 h-full px-1 rounded-r cursor-pointer'
                  >
                    <span className='m-auto text-2xl font-thin'>+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='px-6'>
          <div className='hidden md:flex items-center mb-3'>
            <FaRegHourglass className='text-gray-100 mr-1 text-xl' />
            <h3 className='text-xl text-gray-100 font-medium'>Actions</h3>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <ActionButton
              buttonColor='zinc-200'
              Icon={VscRunAll}
              iconColor='zinc-200'
              iconSize='23px'
              action={() => callAlgorithm(selectedAlgorithm)}
              hoverColor='bg-green-400'
              disabled={!canRun}
              text='Run'
              HideTextOnSm
            />
            <ActionButton
              buttonColor='zinc-200'
              Icon={AiOutlineClear}
              iconSize='23px'
              iconColor='zinc-200'
              action={() => clearPath()}
              hoverColor='bg-amber-600'
              text='Clear Path'
              HideTextOnSm
            />
            <ActionButton
              buttonColor='zinc-200'
              Icon={MdClearAll}
              iconSize='23px'
              iconColor='zinc-200'
              action={() => clearBoard()}
              hoverColor='bg-red-400'
              text='Clear Path'
              HideTextOnSm
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigMenu;
