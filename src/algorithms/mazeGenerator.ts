/* eslint-disable no-param-reassign */
import { ColAndRow, INode } from '../utils/interfaces';

const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const computeFrontierNodes = (nodes: INode[][], node: INode): INode[] => {
  const { row, col } = node;
  const frontierNodes: INode[] = [];
  if (row > 1) frontierNodes.push(nodes[row - 2][col]);
  if (row < nodes.length - 2) frontierNodes.push(nodes[row + 2][col]);
  if (col > 1) frontierNodes.push(nodes[row][col - 2]);
  if (col < nodes[0].length - 2) frontierNodes.push(nodes[row][col + 2]);
  // eslint-disable-next-line no-return-assign
  frontierNodes.forEach((cell) => cell.foundBy = {col, row})
  return frontierNodes.filter((cell) => cell.isWall);
};

const prim = (nodes: INode[][]) => {
  // getting random starting node
  const startingNode =
    nodes[getRandomInteger(0, nodes.length - 1)][
      getRandomInteger(0, nodes[0].length - 1)
    ];

  // setting starting node to passage
  startingNode.isWall = false;

  // getting frontier nodes (walls with distance 2 within the grid)
  const frontierNodes = computeFrontierNodes(nodes, startingNode);

  while (frontierNodes.length > 0) {
    // getting random frontier node
    const randomFrontierNode = frontierNodes[getRandomInteger(0, frontierNodes.length - 1)];
    const { row, col, foundBy } = randomFrontierNode;

    // getting node between random frontier node and 
    // node that found the random frontier node
    // eslint-disable-next-line prettier/prettier
    const nodeBetween = nodes[row - (row - foundBy!.row) / 2][col - (col - foundBy!.col) / 2]; 
    
    // setting node between to passage
    nodeBetween.isWall = false;
    randomFrontierNode.isWall = false;

    // getting new frontier nodes
    const newFrontierNodes = computeFrontierNodes(nodes, randomFrontierNode);

    // adding new frontier nodes to frontier nodes
    frontierNodes.push(...newFrontierNodes);
    
    // removing random frontier node from frontier nodes
    frontierNodes.splice(frontierNodes.indexOf(randomFrontierNode), 1);
  }

  return nodes;
};

const generateMaze = (nodes: INode[][], startNode: ColAndRow, endNode: ColAndRow): INode[][] => {
  // Set all nodes' isWall property to true initially
  nodes.forEach((row) =>
    row.forEach((node) => {
      node.isWall = true;
    }),
  );

  // Generate maze
  nodes = prim(nodes);

  // Make sure that start and end nodes are not walls
  const {row: startRow, col:startCol } = startNode;
  const {row: endRow, col: endCol } = endNode;
  nodes[startRow][startCol].isWall = false;
  nodes[endRow][endCol].isWall = false;


  return nodes;
};

export default generateMaze;
