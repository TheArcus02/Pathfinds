/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { ColAndRow, INode, NodesState } from '../utils/interfaces';
import dijkstraAlgorithm from '../algorithms/dijkstra';
import getShortestPath from '../algorithms/shortestPath';
import getMaxCols from '../utils/utils';

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
    isVisited: false,
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

    runDijkstra: (state) => {
      const { startNode, nodes } = state;

      const nodesVisitedInOrder = dijkstraAlgorithm(cloneDeep(nodes), [
        startNode.row,
        startNode.col,
      ]);
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
  runDijkstra,
  setPath,
  clearPath,
} = nodesSlice.actions;
export default nodesSlice.reducer;
