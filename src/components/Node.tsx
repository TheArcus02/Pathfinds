import { useEffect, useState } from 'react';
import { VscDebugStart } from 'react-icons/vsc';
import { CgEditBlackPoint } from 'react-icons/cg';
import { DraggableElements, INode } from '../utils/interfaces';

interface INodeComponent {
  node: INode;
  setAnimationEnded: React.Dispatch<React.SetStateAction<boolean>>;
  toggleWall: (row: number, col: number) => void;
  mouseIsPressed: boolean;
  setMouseIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    row: number,
    col: number,
  ) => void;
  setDraggedElement: (
    value: React.SetStateAction<DraggableElements | null>,
  ) => void;
}

const Node: React.FC<INodeComponent> = ({
  node,
  setAnimationEnded,
  toggleWall,
  mouseIsPressed,
  setMouseIsPressed,
  handleDrop,
  setDraggedElement,
}) => {
  const [classes, setClasses] = useState('');

  useEffect(() => {
    let timeout: number | null = null;

    if (node.isPath) {
      // setting timeout for animation
      timeout = setTimeout(() => {
        setClasses('bg-indigo-700');
        // check if animation ended
        if (node.isFinish) {
          setAnimationEnded(false);
        }
      }, 10 * node.distance);
    } else if (node.isVisited) {
      // setting timeout for animation
      timeout = setTimeout(() => {
        setClasses('bg-emerald-500 animate-visited');
        // check if animation ended
        if (node.isFinish) {
          setAnimationEnded(true);
        }
      }, 10 * node.distance);
    } else if (node.isStart) {
      // setting className
      setClasses('bg-green-600');
    } else if (node.isFinish) {
      setClasses('bg-red-500');
    } else if (node.isWall) {
      setClasses('bg-orange-400');
    } else {
      setClasses('');
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
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
    setAnimationEnded,
  ]);

  const handleMouseDown = (row: number, col: number) => {
    if (!node.isStart && !node.isFinish) {
      toggleWall(row, col);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!node.isStart && !node.isFinish) {
      if (mouseIsPressed) toggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <div
      id={`${node.row}-${node.col}`}
      aria-label={`${node.row}-${node.col}`}
      className={`border border-solid border-slate-500 p-2 relative ${classes}`}
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
          <VscDebugStart className='absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
        </div>
      ) : (
        node.isFinish && (
          <div
            draggable
            onDragStart={() => setDraggedElement('endNode')}
            onDragEnd={() => setDraggedElement(null)}
          >
            <CgEditBlackPoint className='absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
        )
      )}
    </div>
  );
};

export default Node;
