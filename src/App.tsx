import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './App.css';
import ConfigMenu from './components/ConfigMenu';
import {
  Algorithms,
  DraggableElements,
  INode,
  Tools,
} from './utils/interfaces';
import Node from './components/Node';
import { AppDispatch, RootState } from './redux/store';
import {
  changeFinish,
  changeStart,
  // clearBoard,
  clearPath,
  resetNode,
  runAlgorithm,
  setWeight,
  toggleWall,
  runGenerateMaze,
} from './redux/nodesSlice';
import useWindowSize from './hooks/useWindowSize';
import { fetchInitialBoard } from './redux/thunk';

const App = () => {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const loading = useSelector((state: RootState) => state.nodes.loading);

  const dispatch = useDispatch<AppDispatch>();

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [draggedElement, setDraggedElement] =
    useState<DraggableElements | null>(null);
  const [canRun, setCanRun] = useState(true);
  const [selectedTool, setSelectedTool] = useState<Tools>('Walls');
  const [currentWeight, setCurrentWeight] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const windowWidth = useWindowSize();

  useEffect(() => {
    dispatch(fetchInitialBoard());
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
    dispatch(fetchInitialBoard());
    setCanRun(true);
  };

  const handleClearPath = () => {
    dispatch(clearPath());
    setCanRun(true);
  };

  const handleGenerateMaze = () => {
    dispatch(runGenerateMaze());
    setCanRun(true);
  };

  const handleMouseDown = (node: INode) => {
    if (!node.isStart && !node.isFinish) {
      const { row, col } = node;
      if (selectedTool === 'Walls') dispatch(toggleWall({ row, col }));
      else if (selectedTool === 'Eraser') dispatch(resetNode({ row, col }));
      else if (selectedTool === 'Weight')
        dispatch(setWeight({ row, col, weight: currentWeight }));
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (node: INode) => {
    if (!node.isStart && !node.isFinish && mouseIsPressed) {
      const { row, col } = node;
      if (selectedTool === 'Walls') dispatch(toggleWall({ row, col }));
      else if (selectedTool === 'Eraser') dispatch(resetNode({ row, col }));
    }
  };

  return (
    <div className='bg-zinc-800 min-h-screen'>
      <ConfigMenu
        callAlgorithm={handleCallAlgorithm}
        clearBoard={handleClearBoard}
        clearPath={handleClearPath}
        generateMaze={handleGenerateMaze}
        canRun={canRun}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        weight={currentWeight}
        setWeight={setCurrentWeight}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        loading={loading}
      />
      <div className='w-full'>
        <div className='flex flex-col items-center'>
          {!loading &&
            nodes &&
            nodes.map((row) => (
              <div className='flex'>
                {row.map((node) => (
                  <Node
                    node={node}
                    key={node.col + node.row}
                    handleDrop={handleDrop}
                    setDraggedElement={setDraggedElement}
                    handleMouseDown={handleMouseDown}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseUp={() => setMouseIsPressed(false)}
                    animationSpeed={animationSpeed}
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
