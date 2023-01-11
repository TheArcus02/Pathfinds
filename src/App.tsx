import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './App.css';
import ConfigMenu from './components/ConfigMenu';
import { Algorithms, DraggableElements } from './utils/interfaces';
import Node from './components/Node';
import { RootState } from './redux/store';
import {
  changeFinish,
  changeStart,
  clearBoard,
  clearPath,
  runAlgorithm,
} from './redux/nodesSlice';
import useWindowSize from './hooks/useWindowSize';

const App = () => {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const dispatch = useDispatch();

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [draggedElement, setDraggedElement] =
    useState<DraggableElements | null>(null);
  const [canRun, setCanRun] = useState(true);

  const windowWidth = useWindowSize();

  useEffect(() => {
    dispatch(clearBoard());
  }, [windowWidth, dispatch]);

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    row: number,
    col: number,
  ) => {
    e.preventDefault();
    if (draggedElement === 'startNode') dispatch(changeStart({ col, row }));
    else if (draggedElement === 'endNode') dispatch(changeFinish({ col, row }));
  };

  const handleCallAlgorithm = (algorithm: Algorithms) => {
    setCanRun(false);
    dispatch(runAlgorithm(algorithm));
  };

  const handleClearBoard = () => {
    dispatch(clearBoard());
    setCanRun(true);
  };

  const handleClearPath = () => {
    dispatch(clearPath());
    setCanRun(true);
  };

  return (
    <div className='bg-zinc-800 min-h-screen'>
      <ConfigMenu
        callAlgorithm={handleCallAlgorithm}
        clearBoard={handleClearBoard}
        clearPath={handleClearPath}
        canRun={canRun}
      />
      <div className='w-full'>
        <div className='flex flex-col items-center'>
          {nodes.map((row) => (
            <div className='flex'>
              {row.map((node) => (
                <Node
                  node={node}
                  key={node.col + node.row}
                  handleDrop={handleDrop}
                  mouseIsPressed={mouseIsPressed}
                  setMouseIsPressed={setMouseIsPressed}
                  setDraggedElement={setDraggedElement}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
