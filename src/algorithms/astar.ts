/* eslint-disable no-param-reassign */
import { ColAndRow, INode } from '../utils/interfaces';
import { getClosestNodes } from '../utils/utils';

const sortNodes = (unvisitedNodes: INode[]) => {
  return unvisitedNodes.sort(
    (nodeA, nodeB) =>
      nodeA.distance +
      nodeA.heuristic +
      nodeA.weight -
      (nodeB.distance + nodeB.heuristic + nodeB.weight),
  );
};

const guessHeuristic = (nodePos: ColAndRow, target: ColAndRow) => {
  const { col: x1, row: y1 } = nodePos;
  const { col: x2, row: y2 } = target;
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const updateUnvisitedNodes = (
  neightbors: INode[],
  currentNode: INode,
  target: ColAndRow,
) => {
  neightbors.forEach((neightbor) => {
    neightbor.distance = currentNode.distance + 1;
    neightbor.heuristic = guessHeuristic(
      { col: neightbor.col, row: neightbor.row },
      target,
    );
    neightbor.previousNode = currentNode;
  });
};

const astarAlgorithm = (
  nodes: INode[][],
  startNodePosition: ColAndRow,
  endNodePosition: ColAndRow,
  // eslint-disable-next-line consistent-return
) => {
  const visitedNodesInOrder: INode[] = [];
  if (nodes.length === 0) return visitedNodesInOrder;

  const { col: startCol, row: startRow } = startNodePosition;
  const startNode = nodes[startRow][startCol];

  startNode.distance = 0;
  startNode.heuristic = guessHeuristic(startNodePosition, endNodePosition);

  let unvisitedNodes = nodes.flatMap((node) => node);
  let visits = 0;

  while (unvisitedNodes.length) {
    unvisitedNodes = sortNodes(unvisitedNodes);
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
        updateUnvisitedNodes(closestNeightbors, closestNode, endNodePosition);
      }
    }
  }
};
export default astarAlgorithm;
