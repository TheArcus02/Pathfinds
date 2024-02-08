/* eslint-disable no-nested-ternary */
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VscDebugStart } from 'react-icons/vsc';
import { FaFlagCheckered, FaWeightHanging } from 'react-icons/fa';
import { GiBrickWall } from 'react-icons/gi';
import { DraggableElements, INode } from '../utils/interfaces';
import { changeNodePosition, setPath } from '../redux/nodesSlice';
import { AppDispatch, RootState } from '../redux/store';

interface NodeProps {
  node: INode;
  handleMouse: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => void
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    element: DraggableElements
  ) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => void;
}

const areEqual = (prevProps: NodeProps, nextProps: NodeProps) => {
  return (
    prevProps.node.isVisited === nextProps.node.isVisited &&
    prevProps.node.isPath === nextProps.node.isPath &&
    prevProps.node.weight === nextProps.node.weight &&
    prevProps.node.isFinish === nextProps.node.isFinish &&
    prevProps.node.isStart === nextProps.node.isStart &&
    prevProps.node.isWall === nextProps.node.isWall
  );
};

const Node = memo(({ node, handleMouse, onDrop, onDragStart }: NodeProps) => {
  console.log('Node rendered', node.row, node.col);
  const animationSpeed = useSelector(
    (state: RootState) => state.tools.animationSpeed
  );

  const [classes, setClasses] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const animatePath = () => {
    return setTimeout(() => {
      setClasses('bg-indigo-700');
    }, animationSpeed * node.distance);
  };

  const animateVisited = () => {
    return setTimeout(() => {
      setClasses('bg-emerald-500 animate-visited');
      if (node.isFinish) {
        dispatch(setPath());
      }
    }, animationSpeed * node.whenVisited);
  };

  useEffect(() => {
    let pathTimeout: number;
    let visitedTimeout: number;

    setClasses('');

    if (node.isPath) {
      pathTimeout = animatePath();
    } else if (node.isVisited) {
      visitedTimeout = animateVisited();
    }

    return () => {
      clearTimeout(pathTimeout);
      clearTimeout(visitedTimeout);
    };
  }, [node]);

  return (
    <div
      id={`${node.row}-${node.col}`}
      aria-label={`${node.row}-${node.col}`}
      className={`border border-solid border-slate-600 p-3 relative ${classes}`}
      onMouseDown={(e) => handleMouse(e, node.col, node.row)}
      onMouseEnter={(e) => handleMouse(e, node.col, node.row)}
      role='gridcell'
      tabIndex={0}
      onDrop={(e) => onDrop(e, node.row, node.col)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
    >
      {node.isStart ? (
        <div draggable onDragStart={(e) => onDragStart(e, 'startNode')}>
          <VscDebugStart
            size='26px'
            className='text-white bg-sky-600 absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          />
        </div>
      ) : node.isFinish ? (
        <div draggable onDragStart={(e) => onDragStart(e, 'endNode')}>
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
}, areEqual);

export default Node;
