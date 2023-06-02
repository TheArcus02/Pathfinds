import { INode } from '../utils/interfaces';

const getShortestPath = (endNode: INode) => {
  const shortestPath = [];
  let currentNode: INode | null = endNode;
  while (currentNode) {
    console.table(currentNode.col, currentNode.row);
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
};

export default getShortestPath;
