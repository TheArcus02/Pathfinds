import { INode } from '../utils/interfaces';

interface INodeComponent {
  node: INode;
}

const Node: React.FC<INodeComponent> = ({ node }) => {
  return (
    <div
      className={`border border-solid border-slate-500 p-2 ${
        node.isStart ? 'bg-green-600' : node.isFinish && 'bg-red-500'
      }`}
    />
  );
};

export default Node;
