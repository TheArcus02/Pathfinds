import { useEffect, useState } from 'react';
import { INode } from '../utils/interfaces';

interface INodeComponent {
  node: INode;
  setAnimationEnded: React.Dispatch<React.SetStateAction<boolean>>;
  toggleWall: (row: number, col: number) => void;
  mouseIsPressed: boolean;
  setMouseIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Node: React.FC<INodeComponent> = ({
  node,
  setAnimationEnded,
  toggleWall,
  mouseIsPressed,
  setMouseIsPressed,
}) => {
  const [classes, setClasses] = useState('');

  useEffect(() => {
    let timeout: number | null = null;
    if (node.isPath) {
      timeout = setTimeout(() => {
        setClasses('bg-indigo-700');
        if (node.isFinish) {
          setAnimationEnded(false);
        }
      }, 50 * node.distance);
    } else if (node.isVisited) {
      timeout = setTimeout(() => {
        setClasses('bg-emerald-500 animate-visited');
        if (node.isFinish) {
          setAnimationEnded(true);
        }
      }, 10 * node.distance);
    } else if (node.isFinish) {
      setClasses('bg-red-500');
    } else if (node.isWall) {
      setClasses('bg-orange-400');
    } else if (node.isStart) {
      setClasses('bg-green-600');
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
    setAnimationEnded,
  ]);

  const handleMouseDown = (row: number, col: number) => {
    toggleWall(row, col);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (mouseIsPressed) toggleWall(row, col);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <div
      id={`${node.row}-${node.col}`}
      aria-label={`${node.row}-${node.col}`}
      className={`border border-solid border-slate-500 p-2 ${classes}`}
      onMouseDown={() => handleMouseDown(node.row, node.col)}
      onMouseEnter={() => handleMouseEnter(node.row, node.col)}
      onMouseUp={() => handleMouseUp()}
      role='gridcell'
      tabIndex={0}
    />
  );
};

export default Node;
