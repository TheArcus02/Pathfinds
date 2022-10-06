import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import dijkstraAlgorithm from './algorithms/dijkstra';
import './App.css';
import ConfigMenu from './components/ConfigMenu';
import { DraggableElements, DraggableNode, INode } from './utils/interfaces';
import getShortestPath from './algorithms/shortestPath';
import Node from './components/Node';

const App = () => {
  const [initialNodes, setInitialNodes] = useState<INode[][]>([]);
  const [nodes, setNodes] = useState<INode[][]>([]);
  // const [cols, setCols] = useState(60);
  // const [rows, setRows] = useState(50);
  const [startNode, setStartNode] = useState<DraggableNode>({
    row: 10,
    col: 15,
    prevPos: {
      row: 10,
      col: 15,
    },
  });
  const [endNode, setEndNode] = useState<DraggableNode>({
    row: 20,
    col: 40,
    prevPos: {
      row: 20,
      col: 40,
    },
  });
  const [spreadAnimationEnded, setSpreadAnimationEnded] = useState(false);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [draggedElement, setDraggedElement] =
    useState<DraggableElements | null>(null);

  // initial nodes creation
  useEffect(() => {
    const generateNode = (col: number, row: number) => {
      const node: INode = {
        col,
        row,
        isStart: row === startNode.row && col === startNode.col,
        isFinish: row === endNode.row && col === endNode.col,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
        isPath: false,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle starNode change
  useEffect(() => {
    if (
      startNode.col !== startNode.prevPos.col ||
      startNode.row !== startNode.prevPos.row
    ) {
      setNodes((prev) => {
        const prevCopy = cloneDeep(prev);
        prevCopy[startNode.prevPos.row][startNode.prevPos.col].isStart = false;
        prevCopy[startNode.row][startNode.col].isStart = true;
        setInitialNodes(prevCopy);
        return prevCopy;
      });
    }
  }, [startNode]);

  // handle endNode change
  useEffect(() => {
    if (
      endNode.col !== endNode.prevPos.col ||
      endNode.row !== endNode.prevPos.row
    ) {
      setNodes((prev) => {
        const prevCopy = cloneDeep(prev);
        prevCopy[endNode.prevPos.row][endNode.prevPos.col].isFinish = false;
        prevCopy[endNode.row][endNode.col].isFinish = true;
        setInitialNodes(prevCopy);
        return prevCopy;
      });
    }
  }, [endNode]);

  // handle animations
  useEffect(() => {
    if (spreadAnimationEnded) {
      const finishNode = nodes[endNode.row][endNode.col];
      if (finishNode.previousNode) {
        const nodesInShortestPath = getShortestPath(finishNode);

        const newGrid = cloneDeep(nodes);

        nodesInShortestPath.forEach((node) => {
          const nodeCopy = node;
          nodeCopy.isPath = true;
          newGrid[node.row][node.col] = nodeCopy;
        });
        setNodes(newGrid);
      }
    }
  }, [spreadAnimationEnded, nodes, endNode]);

  const animateDijkstra = () => {
    const nodesVisitedInOrder = dijkstraAlgorithm(cloneDeep(nodes), [
      startNode.row,
      startNode.col,
    ]);
    if (nodesVisitedInOrder?.length) {
      const newNodesGrid = cloneDeep(nodes);

      nodesVisitedInOrder.forEach((node) => {
        newNodesGrid[node.row][node.col] = node;
      });
      setNodes(newNodesGrid);
    }
  };

  // ! delete on production
  // printing current nodes
  // useEffect(() => {
  //   console.log(nodes);
  // }, [nodes]);

  const clearBoard = () => {
    setNodes(initialNodes);
  };

  const handleWallToggle = (row: number, col: number) => {
    setNodes((prev) => {
      const prevCopy = cloneDeep(prev);
      prevCopy[row][col].isWall = true;
      return [...prevCopy];
    });
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    row: number,
    col: number,
  ) => {
    e.preventDefault();
    if (draggedElement === 'startNode') {
      setStartNode((prev) => ({
        row,
        col,
        prevPos: { row: prev.row, col: prev.col },
      }));
    } else if (draggedElement === 'endNode') {
      setEndNode((prev) => ({
        row,
        col,
        prevPos: { row: prev.row, col: prev.col },
      }));
    }
  };

  return (
    <div className='bg-zinc-700 min-h-screen'>
      <ConfigMenu callAlgorithm={animateDijkstra} clearBoard={clearBoard} />
      <div className='w-full'>
        <div
          className='grid grid-cols-[repeat(50,_minmax(0,_1fr))] min-h-full'
          role='grid'
        >
          {nodes.map((row) =>
            row.map((node) => (
              <Node
                node={node}
                key={node.col + node.row}
                setAnimationEnded={setSpreadAnimationEnded}
                toggleWall={handleWallToggle}
                mouseIsPressed={mouseIsPressed}
                setMouseIsPressed={setMouseIsPressed}
                handleDrop={handleDrop}
                setDraggedElement={setDraggedElement}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
