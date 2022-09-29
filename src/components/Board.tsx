import { useEffect, useState } from 'react';
import dijkstraAlgorithm from '../algorithms/dijkstra';
import { INode } from '../utils/interfaces';
import Node from './Node';

const Board = () => {
  const [nodes, setNodes] = useState<INode[][]>([]);
  const [cols, setCols] = useState(60);
  const [rows, setRows] = useState(50);
  const [startNode, setStartNode] = useState<Array<number>>([10, 15]);
  const [endNode, setEndNode] = useState<Array<number>>([10, 35]);

  useEffect(() => {
    const generateNode = (col: number, row: number) => {
      const node: INode = {
        col,
        row,
        isStart: row === startNode[0] && col === startNode[1],
        isFinish: row === endNode[0] && col === endNode[1],
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
      };
      return node;
    };

    const tempNodes = [];
    for (let row = 0; row < 60; row += 1) {
      const currRow = [];
      for (let col = 0; col < 50; col += 1) {
        currRow.push(generateNode(col, row));
      }
      tempNodes.push(currRow);
    }
    setNodes(tempNodes);
  }, [cols, rows, endNode, startNode]);
  // dijkstraAlgorithm(nodes, startNode, endNode);
  // console.log(nodes);
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
