import { INode } from './interfaces';
import { COL_WIDTH } from './constants';

export const getMaxCols = () => {
  const screenWidth = document.body.offsetWidth || window.innerWidth;
  return Math.floor(screenWidth / COL_WIDTH);
};

export const getClosestNodes = (node: INode, nodes: INode[][]) => {
  const neightbors: INode[] = [];
  const { col, row } = node;
  if (row > 0) {
    neightbors.push(nodes[row - 1][col]);
  }
  if (row < nodes.length - 1) {
    neightbors.push(nodes[row + 1][col]);
  }
  if (col > 0) {
    neightbors.push(nodes[row][col - 1]);
  }
  if (col < nodes[0].length - 1) {
    neightbors.push(nodes[row][col + 1]);
  }
  return neightbors.filter((neightbor) => !neightbor.isVisited);
};
