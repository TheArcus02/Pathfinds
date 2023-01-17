/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { VscDebugStart } from 'react-icons/vsc';
import { FaFlagCheckered, FaWeightHanging } from 'react-icons/fa';
import { GiBrickWall } from 'react-icons/gi';
import { DraggableElements, INode } from '../utils/interfaces';
import { setPath } from '../redux/nodesSlice';

interface INodeComponent {
  node: INode;
  setDraggedElement: (
    value: React.SetStateAction<DraggableElements | null>,
  ) => void;
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    row: number,
    col: number,
  ) => void;
  handleMouseDown: (node: INode) => void;
  handleMouseEnter: (node: INode) => void;
  handleMouseUp: () => void;
}

const Node: React.FC<INodeComponent> = ({
  node,
  setDraggedElement,
  handleDrop,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) => {
  const dispatch = useDispatch();
  const animationSpeed = 10;
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

  return (
    <div
      id={`${node.row}-${node.col}`}
      aria-label={`${node.row}-${node.col}`}
      className={`border border-solid border-slate-600 p-3 relative ${classes}`}
      onMouseDown={() => handleMouseDown(node)}
      onMouseEnter={() => handleMouseEnter(node)}
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
      ) : node.isWall ? (
        <div className='animate-place'>
          <GiBrickWall
            size='26px'
            className=' text-orange-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          />
        </div>
      ) : (
        node.weight !== 0 && (
          <div className='relative animate-place'>
            <FaWeightHanging
              size='23px'
              className='text-gray-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
            />
            <span className='text-grey-700 z-10 text-[12px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3'>
              {node.weight}
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default Node;
