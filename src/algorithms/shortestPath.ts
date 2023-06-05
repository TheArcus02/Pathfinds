import { INode } from '../utils/interfaces';

const getShortestPath = (endNode: INode) => {
  const shortestPath = [];
  let currentNode: INode | null = endNode;
  while (currentNode) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
};

export default getShortestPath;
