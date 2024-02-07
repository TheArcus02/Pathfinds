import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  clearPath,
  resetNode,
  setWeight,
  toggleWall,
  runGenerateMaze,
} from './redux/nodesSlice';
import useWindowSize from './hooks/useWindowSize';
import { fetchInitialBoard, runAlgorithm } from './redux/thunk';

const App = () => {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);

  const startNode = useSelector((state: RootState) => state.nodes.startNode);
  const endNode = useSelector((state: RootState) => state.nodes.endNode);
  const loading = useSelector((state: RootState) => state.nodes.loading);

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [draggedElement, setDraggedElement] =
    useState<DraggableElements | null>(null);
  const [canRun, setCanRun] = useState(true);
  const [selectedTool, setSelectedTool] = useState<Tools>('Walls');
  const [currentWeight, setCurrentWeight] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  const windowWidth = useWindowSize();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (nodes.length === 0) {
      dispatch(fetchInitialBoard());
    }
  }, [windowWidth, dispatch, nodes]);

  useEffect(() => {
    console.log(nodes, startNode, endNode);
  }, [nodes]);

  useEffect(() => {
    let timer: number;
    if (loading) {
      setShowLoadingMessage(false);
      timer = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 3000);
    } else {
      setShowLoadingMessage(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, row: number, col: number) => {
      e.preventDefault();
      if (draggedElement === 'startNode') dispatch(changeStart({ col, row }));
      else if (draggedElement === 'endNode')
        dispatch(changeFinish({ col, row }));
    },
    [dispatch, draggedElement],
  );

  const handleCallAlgorithm = useCallback(
    (algorithm: Algorithms) => {
      setCanRun(false);
      if (!startNode || !endNode) return;
      dispatch(
        runAlgorithm({
          algorithm,
          startNode,
          endNode,
          nodes,
        }),
      );
    },
    [dispatch, startNode, endNode, nodes],
  );

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

  const handleMouseDown = useCallback(
    (node: INode) => {
      if (!node.isStart && !node.isFinish) {
        const { row, col } = node;
        if (selectedTool === 'Walls') dispatch(toggleWall({ row, col }));
        else if (selectedTool === 'Eraser') dispatch(resetNode({ row, col }));
        else if (selectedTool === 'Weight')
          dispatch(setWeight({ row, col, weight: currentWeight }));
        setMouseIsPressed(true);
      }
    },
    [dispatch, selectedTool, currentWeight],
  );

  const handleMouseEnter = useCallback(
    (node: INode) => {
      if (!node.isStart && !node.isFinish && mouseIsPressed) {
        const { row, col } = node;
        if (selectedTool === 'Walls') dispatch(toggleWall({ row, col }));
        else if (selectedTool === 'Eraser') dispatch(resetNode({ row, col }));
      }
    },
    [dispatch, selectedTool, mouseIsPressed],
  );

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
          {showLoadingMessage && (
            <div className='text-white text-2xl'>
              Initial loading may take up to 2 minutes as the server is starting
              up, please wait...
            </div>
          )}
          {nodes &&
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
