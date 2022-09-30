import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import dijkstraAlgorithm from './algorithms/dijkstra';
import './App.css';
import Board from './components/Board';
import ConfigMenu from './components/ConfigMenu';
import { INode } from './utils/interfaces';
import getShortestPath from './algorithms/shortestPath';

const App = () => {
  const [initialNodes, setInitialNodes] = useState<INode[][]>([]);
  const [nodes, setNodes] = useState<INode[][]>([]);
  // const [cols, setCols] = useState(60);
  // const [rows, setRows] = useState(50);
  const [startNode, setStartNode] = useState<Array<number>>([10, 15]);
  const [endNode, setEndNode] = useState<Array<number>>([11, 20]);
  const [spreadAnimationEnded, setSpreadAnimationEnded] = useState(false);

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
    setInitialNodes(tempNodes);
    setNodes(tempNodes);
  }, [endNode, startNode]);

  useEffect(() => {
    const animateShortestPath = (shortestPath: INode[]) => {
      shortestPath.forEach((node, index) => {
        setTimeout(() => {
          document
            .getElementById(`${node.row}-${node.col}`)
            ?.classList.add('bg-indigo-700');
        }, 10 * index);
      });
    };

    if (spreadAnimationEnded) {
      const finishNode = nodes[endNode[0]][endNode[1]];
      if (finishNode.previousNode) {
        const nodesInShortestPath = getShortestPath(finishNode);
        animateShortestPath(nodesInShortestPath);
        setSpreadAnimationEnded(false);
      }
    }
  }, [spreadAnimationEnded, nodes, endNode]);

  const animateDijkstra = () => {
    const nodesVisitedInOrder = dijkstraAlgorithm(cloneDeep(nodes), startNode);
    if (nodesVisitedInOrder?.length) {
      const newNodesGrid = cloneDeep(nodes);

      nodesVisitedInOrder.forEach((node, index) => {
        newNodesGrid[node.row][node.col] = node;
        setTimeout(() => {
          if (!node.isStart && !node.isFinish) {
            document
              .getElementById(`${node.row}-${node.col}`)
              ?.classList.add('bg-emerald-500');
          }
          if (index === nodesVisitedInOrder.length - 1)
            setSpreadAnimationEnded(true);
        }, 10 * index);
      });
      setNodes(newNodesGrid);
    }
  };

  const clearBoard = () => {
    setNodes(initialNodes);
  };

  return (
    <div className='bg-zinc-700 min-h-screen flex w-full'>
      <ConfigMenu callAlgorithm={animateDijkstra} />
      <Board nodes={nodes.slice()} />
    </div>
  );
};

export default App;
