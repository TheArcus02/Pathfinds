/* eslint-disable no-param-reassign */
import { ColAndRow, INode } from '../utils/interfaces';
import { getClosestNodes } from '../utils/utils';

const sortNodesByDistance = (unvisitedNodes: INode[]) => {
  return unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNodes = (neightbors: INode[], currentNode: INode) => {
  neightbors.forEach((neightbor) => {
    const neightborCopy = neightbor;
    neightborCopy.distance = currentNode.distance + 1;
    neightborCopy.previousNode = currentNode;
  });
};

const dijkstraAlgorithm = (
  nodes: INode[][],
  startNodePosition: ColAndRow,
  // eslint-disable-next-line consistent-return
) => {
  const visitedNodesInOrder: INode[] = [];
  if (nodes.length === 0) return visitedNodesInOrder;

  const { col: startCol, row: startRow } = startNodePosition;
  nodes[startRow][startCol].distance = 0;
  let unvisitedNodes = nodes.flatMap((node) => node);
  let visits = 0;

  while (unvisitedNodes.length) {
    unvisitedNodes = sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode) {
      if (!closestNode.isWall) {
        visits += 1;
        closestNode.isVisited = true;
        closestNode.whenVisited = visits;
        visitedNodesInOrder.push(closestNode);
        if (closestNode.isFinish || closestNode.distance === Infinity) {
          return visitedNodesInOrder;
        }
        const closestNeightbors = getClosestNodes(closestNode, nodes);
        updateUnvisitedNodes(closestNeightbors, closestNode);
      }
    }
  }
};
export default dijkstraAlgorithm;
