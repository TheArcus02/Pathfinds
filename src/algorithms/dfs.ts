/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { ColAndRow, INode } from '../utils/interfaces';
import { getClosestNodes } from '../utils/utils';

const dfsAlgorithm = (nodes: INode[][], startNodePosition: ColAndRow) => {
  const { col: startCol, row: startRow } = startNodePosition;

  const start = nodes[startRow][startCol];
  const stack: INode[] = [start];
  const visitedNodesInOrder: INode[] = [];
  let visits = 0;

  start.isVisited = true;
  if (nodes.length === 0) return visitedNodesInOrder;

  while (stack.length > 0) {
    const closestNode = stack.pop();
    if (closestNode) {
      if (!closestNode.isWall) {
        visits += 1;
        closestNode.whenVisited = visits;
        visitedNodesInOrder.push(closestNode);
        if (closestNode.isFinish) {
          return visitedNodesInOrder;
        }
        const closestNeightbors = getClosestNodes(closestNode, nodes);
        closestNeightbors.reverse().forEach((neightbor) => {
          neightbor.previousNode = closestNode;
          neightbor.isVisited = true;
          stack.push(neightbor);
        });
      }
    }
  }
};

export default dfsAlgorithm;
