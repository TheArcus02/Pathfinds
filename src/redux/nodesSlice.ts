/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { clone, cloneDeep, endsWith, pick } from 'lodash';
import { Algorithms, ColAndRow, INode, NodesState } from '../utils/interfaces';
import dijkstraAlgorithm from '../algorithms/dijkstra';
import getShortestPath from '../algorithms/shortestPath';
import { getMaxCols } from '../utils/utils';
import bfsAlgorithm from '../algorithms/bfs';
import dfsAlgorithm from '../algorithms/dfs';
import astarAlgorithm from '../algorithms/astar';

const START_ROW = 20;
const START_COL = 15;
const FINISH_ROW = 20;
const FINISH_COL = 40;
const TOTAL_ROWS = 45;

const generateNode = (col: number, row: number) => {
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
  };
  return node;
};

const getInitialState = () => {
  const TOTAL_COLS = getMaxCols();
  return {
    nodes: [...Array(TOTAL_ROWS).keys()].map((row) =>
      [
        ...Array(TOTAL_COLS > FINISH_COL ? TOTAL_COLS : FINISH_COL + 1).keys(),
      ].map((col) => generateNode(col, row)),
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
} = nodesSlice.actions;
export default nodesSlice.reducer;
