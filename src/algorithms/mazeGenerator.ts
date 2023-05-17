/* eslint-disable no-param-reassign */
import { INode } from '../utils/interfaces';

const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getWalls = (nodes: INode[][], node: INode): INode[] => {
  const walls: INode[] = [];
  const { row, col } = node;
  if (row > 0) walls.push(nodes[row - 1][col]);
  if (row < nodes.length - 1) walls.push(nodes[row + 1][col]);
  if (col > 0) walls.push(nodes[row][col - 1]);
  if (col < nodes[0].length - 1) walls.push(nodes[row][col + 1]);
  return walls.filter((wall) => wall.isWall);
};

const prim = (nodes: INode[][]) => {
  const startingNode = nodes[0][0];
  startingNode.isWall = false;
  const walls = getWalls(nodes, startingNode);
  while (walls.length > 0) {
    const randomWall = walls[getRandomInteger(0, walls.length - 1)];

    randomWall.isWall = false;
    const newWalls = getWalls(nodes, randomWall);
    walls.push(...newWalls);
    walls.splice(walls.indexOf(randomWall), 1);
    // * Debugging
    // const nodesWithWalls = nodes
    //   .flatMap((node) => node)
    //   .filter((node) => node.isWall);
    // nodesWithWalls.length < 10 && console.log(nodesWithWalls);
  }
  return nodes;
};

const generateMaze = (nodes: INode[][]): INode[][] => {
  // Set all nodes' isWall property to true initially
  nodes[0][0].isWall = true;
  nodes.forEach((row) =>
    row.forEach((node) => {
      node.isWall = true;
    }),
  );
  nodes = prim(nodes);
  console.log('maze generated');
  return nodes;
};

export default generateMaze;
