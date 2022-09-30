import { INode } from '../utils/interfaces';

interface INodeComponent {
  node: INode;
}

const Node: React.FC<INodeComponent> = ({ node }) => {
  const getClasses = () => {
    if (node.isStart) {
      return 'bg-green-600';
    }
    if (node.isFinish) {
      return 'bg-red-500';
    }
    if (node.isWall) {
      return 'bg-orange-400';
    }
    return '';
  };
  return (
    <div
      id={`${node.row}-${node.col}`}
      className={`border border-solid border-slate-500 p-2 ${getClasses()}`}
    />
  );
};

export default Node;
