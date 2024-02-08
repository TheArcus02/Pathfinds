import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import ConfigMenu from './components/ConfigMenu';
import Node from './components/Node';
import { AppDispatch, RootState } from './redux/store';
import useWindowSize from './hooks/useWindowSize';
import { fetchInitialBoard, useTool } from './redux/thunk';
import { DraggableElements } from './utils/interfaces';
import { changeNodePosition } from './redux/nodesSlice';

const App = () => {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const loading = useSelector((state: RootState) => state.nodes.loading);

  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  const windowWidth = useWindowSize();
  const dispatch = useDispatch<AppDispatch>();

  // Using ref to prevent re-renders of nodes when mouse is pressed
  const mouseIsPressed = useRef(false);

  useEffect(() => {
    const handleMouseDown = () => (mouseIsPressed.current = true);
    const handleMouseUp = () => (mouseIsPressed.current = false);

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (nodes.length === 0) {
      dispatch(fetchInitialBoard());
    }
  }, [windowWidth, dispatch, nodes]);

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

  const handleMouseAction = useCallback(
    (e:React.MouseEvent<HTMLDivElement, MouseEvent>, col: number, row: number ) => {
      if(e.type === 'mousedown') {
        dispatch(useTool({ row, col }));
      }else if (e.type === 'mouseenter' && mouseIsPressed.current) {
        dispatch(useTool({ row, col }));
      }
    },
    [dispatch, mouseIsPressed]
  );

  const handleDragStart = useCallback((
    e: React.DragEvent<HTMLDivElement>,
    type: DraggableElements
  ) => {
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDrop = useCallback((
    e: React.DragEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    e.preventDefault();
    const dragType = e.dataTransfer.getData("text/plain") as DraggableElements;
    dispatch(
      changeNodePosition({
        col,
        row,
        nodeType: dragType,
      })
    );
    mouseIsPressed.current = false;
  }, [dispatch]);


  return (
    <div className='bg-zinc-800 min-h-screen'>
      <ConfigMenu />
      <div className='w-full'>
        <div className='flex flex-col items-center'>
          {showLoadingMessage && (
            <div className='text-white text-2xl'>
              Initial loading may take up to 2 minutes as the server is starting
              up, please wait...
            </div>
          )}
          {nodes &&
            nodes.map((row, i) => (
              <div className='flex' key={i}>
                {row.map((node) => (
                  <Node
                    node={node}
                    key={`col:${node.col}, row:${node.row}`}
                    handleMouse={handleMouseAction}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
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
