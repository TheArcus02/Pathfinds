/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { VscDebugStart } from 'react-icons/vsc';
import { FaFlagCheckered } from 'react-icons/fa';
import { GiBrickWall } from 'react-icons/gi';
import { DraggableElements, INode } from '../utils/interfaces';
import { setPath, toggleWall } from '../redux/nodesSlice';

interface INodeComponent {
  node: INode;
  mouseIsPressed: boolean;
  setMouseIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  setDraggedElement: (
    value: React.SetStateAction<DraggableElements | null>,
  ) => void;
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    row: number,
    col: number,
  ) => void;
}

const Node: React.FC<INodeComponent> = ({
  node,
  mouseIsPressed,
  setMouseIsPressed,
  setDraggedElement,
  handleDrop,
}) => {
  const dispatch = useDispatch();
  const animationSpeed = 100;
  const [classes, setClasses] = useState('');

  useEffect(() => {
    let timeout: number | null = null;

    if (node.isPath) {
      // setting timeout for animation
      timeout = setTimeout(() => {
        setClasses('bg-indigo-700');
      }, animationSpeed * node.distance);
    } else if (node.isVisited) {
      // setting timeout for animation
      timeout = setTimeout(() => {
        setClasses('bg-emerald-500 animate-visited');
        // check if animation ended and start animating path
        if (node.isFinish) {
          dispatch(setPath());
        }
      }, animationSpeed * node.whenVisited);
    } else {
      setClasses('');
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    node.isFinish,
    node.isVisited,
    node.isPath,
    node.isWall,
    node.isStart,
    node.distance,
    node.row,
    node.col,
    node.whenVisited,
    dispatch,
  ]);

  const handleMouseDown = (row: number, col: number) => {
    if (!node.isStart && !node.isFinish) {
      dispatch(toggleWall({ row, col }));
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!node.isStart && !node.isFinish && mouseIsPressed) {
      dispatch(toggleWall({ row, col }));
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <div
      id={`${node.row}-${node.col}`}
      aria-label={`${node.row}-${node.col}`}
      className={`border border-solid border-slate-600 p-3 relative ${classes}`}
      onMouseDown={() => handleMouseDown(node.row, node.col)}
      onMouseEnter={() => handleMouseEnter(node.row, node.col)}
      onMouseUp={() => handleMouseUp()}
      role='gridcell'
      tabIndex={0}
      onDrop={(e) => handleDrop(e, node.row, node.col)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
    >
      {node.isStart ? (
        <div
          draggable
          onDragStart={() => setDraggedElement('startNode')}
          onDragEnd={() => setDraggedElement(null)}
        >
          <VscDebugStart
            size='26px'
            className='text-white bg-sky-600 absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          />
        </div>
      ) : node.isFinish ? (
        <div
          draggable
          onDragStart={() => setDraggedElement('endNode')}
          onDragEnd={() => setDraggedElement(null)}
        >
          <FaFlagCheckered
            size='26px'
            className='text-white bg-rose-600 absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          />
        </div>
      ) : (
        node.isWall && (
          <div>
            <GiBrickWall
              size='26px'
              className='text-orange-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
            />
          </div>
        )
      )}
    </div>
  );
};

export default Node;
