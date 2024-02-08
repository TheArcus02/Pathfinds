/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ColAndRow, DraggableElements, INode } from '../utils/interfaces';
import getShortestPath from '../algorithms/shortestPath';
import { fetchInitialBoard, fetchMaze, runAlgorithm } from './thunk';

export interface NodesSliceState {
  nodes: INode[][];
  startNode: ColAndRow | undefined;
  endNode: ColAndRow | undefined;
  loading: boolean;
  error: string | null;
}


const initialState: NodesSliceState = {
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
      })
      .addCase(runAlgorithm.pending, (state) => {
        state.loading = true;
      })
      .addCase(runAlgorithm.fulfilled, (state, action) => {
        if (action.payload?.length) {
          action.payload.forEach((node: INode) => {
            state.nodes[node.row][node.col] = node;
          });
        }
        
        state.loading = false;
      })
      .addCase(runAlgorithm.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchMaze.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaze.fulfilled, (state, action) => {
        state.nodes = action.payload;
        state.loading = false;
      })
      .addCase(fetchMaze.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
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
    changeNodePosition: (state, action: PayloadAction<ColAndRow & {
      nodeType: DraggableElements;
    }>) =>{
      const { col, row, nodeType } = action.payload;

      if(nodeType === 'startNode' && state.startNode){
        const prevStart = state.nodes[state.startNode.row][state.startNode.col];
        const newStart = state.nodes[row][col];
        
        prevStart.isStart = false;
        newStart.isStart = true;
        state.startNode = { col, row };
      } else if(nodeType === 'endNode' && state.endNode){
        const prevEnd = state.nodes[state.endNode.row][state.endNode.col];
        const newEnd = state.nodes[row][col];
        
        prevEnd.isFinish = false;
        newEnd.isFinish = true;
        state.endNode = { col, row };
      }
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
      state.nodes[row][col].isWall = false;
      state.nodes[row][col].weight = 0;
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
  changeNodePosition,
  toggleWall,
  setPath,
  clearPath,
  resetNode,
  setWeight,
} = nodesSlice.actions;
export default nodesSlice.reducer;
