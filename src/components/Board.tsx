import { INode } from '../utils/interfaces';
import Node from './Node';

interface IBoard {
  nodes: INode[][];
}

const Board: React.FC<IBoard> = ({ nodes }) => {
  // console.log(dijkstraAlgorithm(nodes, startNode, endNode));
  return (
    <div className='w-full'>
      <div className='grid grid-cols-[repeat(50,_minmax(0,_1fr))] min-h-full'>
        {nodes.map((row) =>
          row.map((node) => <Node node={node} key={node.col + node.row} />),
        )}
      </div>
    </div>
  );
};

export default Board;
