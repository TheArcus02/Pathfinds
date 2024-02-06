/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { Algorithms, ColAndRow, INode } from '../utils/interfaces';
import dijkstraAlgorithm from '../algorithms/dijkstra';
import getShortestPath from '../algorithms/shortestPath';
import bfsAlgorithm from '../algorithms/bfs';
import dfsAlgorithm from '../algorithms/dfs';
import astarAlgorithm from '../algorithms/astar';
import generateMaze from '../algorithms/mazeGenerator';
import { fetchInitialBoard } from './thunk';

interface InitialState {
  nodes: INode[][];
  startNode: ColAndRow | undefined;
  endNode: ColAndRow | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  nodes: [],
  startNode: undefined,
  endNode: undefined,
  loading: false,
  error: null,
};

export const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInitialBoard.fulfilled, (state, action) => {
        state.nodes = action.payload.nodes;
        state.startNode = action.payload.startNode;
        state.endNode = action.payload.endNode;
        state.loading = false;
      })
      .addCase(fetchInitialBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  reducers: {
    changeStart: (state, action: PayloadAction<ColAndRow>) => {
      const { col, row } = action.payload;
      const { nodes, startNode } = state;
      
      if(!startNode || !nodes) return;

      const prevStart = nodes[startNode.row][startNode.col];
      const newStart = nodes[row][col];

      state.startNode = action.payload;
      prevStart.isStart = false;
      newStart.isStart = true;
    },

    changeFinish: (state, action: PayloadAction<ColAndRow>) => {
      const { col, row } = action.payload;
      const { nodes, endNode } = state;

      if(!endNode || !nodes) return;

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

      if(!startNode || !endNode || !nodes) return;

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
      const { nodes, startNode, endNode } = state;
      if(!startNode || !endNode || !nodes) return;
      const newNodes = generateMaze(cloneDeep(nodes), startNode, endNode);
      state.nodes = newNodes;
    },

    setPath: (state) => {
      const { nodes, endNode } = state;
      
      if(!endNode || !nodes) return;

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
          node.previousNode = null;
        }),
      );
    },
  },
});

export const {
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
