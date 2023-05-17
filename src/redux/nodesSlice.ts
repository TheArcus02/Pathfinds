/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { Algorithms, ColAndRow, INode, NodesState } from '../utils/interfaces';
import dijkstraAlgorithm from '../algorithms/dijkstra';
import getShortestPath from '../algorithms/shortestPath';
import { getMaxCols } from '../utils/utils';
import bfsAlgorithm from '../algorithms/bfs';
import dfsAlgorithm from '../algorithms/dfs';
import astarAlgorithm from '../algorithms/astar';
import generateMaze from '../algorithms/mazeGenerator';

const START_ROW = 20;
const FINISH_ROW = 20;
const TOTAL_ROWS = 45;

const generateNode = (
  col: number,
  row: number,
  START_COL: number,
  FINISH_COL: number,
) => {
  const node: INode = {
    col,
    row,
    isStart: row === START_ROW && col === START_COL,
    isFinish: row === FINISH_ROW && col === FINISH_COL,
    distance: Infinity,
    heuristic: Infinity,
    isVisited: false,
    whenVisited: 0,
    isWall: false,
    previousNode: null,
    isPath: false,
    weight: 0,
  };
  return node;
};

const getInitialState = () => {
  const TOTAL_COLS = getMaxCols();
  const FINISH_COL = Math.floor(TOTAL_COLS / 2);
  const START_COL = Math.floor(TOTAL_COLS / 2) - 3;
  return {
    nodes: [...Array(TOTAL_ROWS).keys()].map((row) =>
      [
        ...Array(TOTAL_COLS > FINISH_COL ? TOTAL_COLS : FINISH_COL + 1).keys(),
      ].map((col) => generateNode(col, row, START_COL, FINISH_COL)),
    ),
    startNode: {
      row: START_ROW,
      col: START_COL,
    },
    endNode: {
      row: FINISH_ROW,
      col: FINISH_COL,
    },
  };
};

const initialState: NodesState = getInitialState();

export const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    clearBoard: () => getInitialState(),

    changeStart: (state, action: PayloadAction<ColAndRow>) => {
      const { col, row } = action.payload;
      const { nodes, startNode } = state;

      const prevStart = nodes[startNode.row][startNode.col];
      const newStart = nodes[row][col];

      state.startNode = action.payload;
      prevStart.isStart = false;
      newStart.isStart = true;
    },

    changeFinish: (state, action: PayloadAction<ColAndRow>) => {
      const { col, row } = action.payload;
      const { nodes, endNode } = state;

      const prevStart = nodes[endNode.row][endNode.col];
      const newStart = nodes[row][col];

      state.endNode = action.payload;
      prevStart.isFinish = false;
      newStart.isFinish = true;
    },

    toggleWall: (state, action: PayloadAction<ColAndRow>) => {
      const { col, row } = action.payload;
      state.nodes[row][col].isWall = true;
    },

    setWeight: (
      state,
      action: PayloadAction<ColAndRow & Pick<INode, 'weight'>>,
    ) => {
      const { col, row, weight } = action.payload;
      state.nodes[row][col].weight = weight;
    },

    resetNode: (state, action: PayloadAction<ColAndRow>) => {
      const { col, row } = action.payload;
      state.nodes[row][col] = initialState.nodes[row][col];
    },

    runAlgorithm: (state, action: PayloadAction<Algorithms>) => {
      const { startNode, nodes, endNode } = state;
      const algorithm = action.payload;

      const pickAlgorithm = (algo: Algorithms) => {
        if (algo === 'dijkstra')
          return dijkstraAlgorithm(cloneDeep(nodes), startNode);
        if (algo === 'bfs') return bfsAlgorithm(cloneDeep(nodes), startNode);
        if (algo === 'dfs') return dfsAlgorithm(cloneDeep(nodes), startNode);
        if (algo === 'astar')
          return astarAlgorithm(cloneDeep(nodes), startNode, endNode);
        return undefined;
      };

      const nodesVisitedInOrder = pickAlgorithm(algorithm);
      if (nodesVisitedInOrder?.length) {
        nodesVisitedInOrder.forEach((node) => {
          nodes[node.row][node.col] = node;
        });
      }
    },

    runGenerateMaze: (state) => {
      const { nodes } = state;
      const newNodes = generateMaze(cloneDeep(nodes));
      console.log(newNodes);
      state.nodes = newNodes;
    },

    setPath: (state) => {
      const { nodes, endNode } = state;
      const finishNode = nodes[endNode.row][endNode.col];

      if (finishNode.previousNode) {
        const nodesInShortestPath = getShortestPath(finishNode);

        nodesInShortestPath.forEach((node) => {
          nodes[node.row][node.col].isPath = true;
        });
      }
    },

    clearPath: (state) => {
      const { nodes } = state;
      nodes.forEach((row) =>
        row.forEach((node) => {
          node.isPath = false;
          node.isVisited = false;
          node.distance = Infinity;
        }),
      );
    },
  },
});

export const {
  clearBoard,
  changeStart,
  changeFinish,
  toggleWall,
  runAlgorithm,
  setPath,
  clearPath,
  resetNode,
  setWeight,
  runGenerateMaze,
} = nodesSlice.actions;
export default nodesSlice.reducer;
