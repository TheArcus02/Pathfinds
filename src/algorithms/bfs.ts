/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { INode } from '../utils/interfaces';
import { getClosestNodes } from '../utils/utils';

const bfsAlgorithm = (nodes: INode[][], startNodePosition: number[]) => {
  const start = nodes[startNodePosition[0]][startNodePosition[1]];
  const queue: INode[] = [start];
  const visitedNodesInOrder: INode[] = [];
  let visits = 0;

  start.isVisited = true;
  if (nodes.length === 0) return visitedNodesInOrder;

  while (queue.length > 0) {
    const closestNode = queue.shift();
    if (closestNode) {
      if (!closestNode.isWall) {
        visits += 1;
        closestNode.whenVisited = visits;
        visitedNodesInOrder.push(closestNode);
        if (closestNode.isFinish) {
          return visitedNodesInOrder;
        }
        const closestNeightbors = getClosestNodes(closestNode, nodes);
        closestNeightbors.forEach((neightbor) => {
          neightbor.previousNode = closestNode;
          neightbor.isVisited = true;
          queue.push(neightbor);
        });
      }
    }
  }
};

export default bfsAlgorithm;
