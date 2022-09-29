import { INode } from '../utils/interfaces';

const sortNodesByDistance = (unvisitedNodes: INode[]) => {
  return unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getClosestNodes = (node: INode, nodes: INode[][]) => {
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

const updateUnvisitedNodes = (neightbors: INode[], currentNode: INode) => {
  neightbors.forEach((neightbor) => {
    const neightborCopy = neightbor;
    neightborCopy.distance = currentNode.distance + 1;
    neightborCopy.previousNode = currentNode;
  });
};

const dijkstraAlgorithm = (
  nodes: INode[][],
  startNodePosition: number[],
  targetNodePosition: number[],
  // eslint-disable-next-line consistent-return
) => {
  if (nodes.length === 0) return false;

  const visitedNodesInOrder = [];
  const nodesCopy = nodes.slice();
  nodesCopy[startNodePosition[0]][startNodePosition[1]].distance = 0;
  let unvisitedNodes = nodesCopy.flatMap((node) => node);

  while (unvisitedNodes.length) {
    unvisitedNodes = sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode) {
      if (!closestNode.isWall) {
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode.isFinish || closestNode.distance === Infinity) {
          return visitedNodesInOrder;
        }
        const closestNeightbors = getClosestNodes(closestNode, nodes);
        updateUnvisitedNodes(closestNeightbors, closestNode);
        // console.log(sortNodesByDistance(unvisitedNodes));
      }
    }
  }
};

export default dijkstraAlgorithm;
