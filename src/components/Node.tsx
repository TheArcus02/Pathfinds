import { useEffect, useState } from 'react';
import { INode } from '../utils/interfaces';

interface INodeComponent {
  node: INode;
  setAnimationEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Node: React.FC<INodeComponent> = ({ node, setAnimationEnded }) => {
  const [classes, setClasses] = useState('');

  useEffect(() => {
    let timeout: number | null = null;
    if (node.isVisited) {
      timeout = setTimeout(() => {
        setClasses('bg-emerald-500 animate-visited');
        if (node.isFinish) {
          setAnimationEnded(true);
        }
      }, 150 * node.distance);
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
  }, [node, setAnimationEnded]);

  return (
    <div
      id={`${node.row}-${node.col}`}
      className={`border border-solid border-slate-500 p-2 ${classes}`}
    />
  );
};

export default Node;
