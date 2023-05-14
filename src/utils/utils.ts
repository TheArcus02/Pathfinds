import { INode } from './interfaces';

export const getMaxCols = () => {
  const colWidth = 26; // 26px x 26px
  const screenWidth = document.body.offsetWidth;
  console.log(screenWidth / colWidth);
  return Math.floor(screenWidth / colWidth);
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
