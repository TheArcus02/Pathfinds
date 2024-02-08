/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Algorithms, ColAndRow, INode } from '../utils/interfaces';
import { getMaxCols } from '../utils/utils';
import { RootState } from './store';
import { resetNode, setWeight, toggleWall } from './nodesSlice';

interface FetchBoardParams {
  start: ColAndRow;
  finish: ColAndRow;
  totalRows: number;
  totalCols: number;
}

export const fetchInitialBoard = createAsyncThunk(
  'nodes/fetchInitialBoard',
  async (_, { rejectWithValue }) => {
    try {
      const totalCols = getMaxCols();
      const data: FetchBoardParams = {
        start: {
          row: 20,
          col: Math.floor(totalCols / 2) - 3,
        },
        finish: {
          row: 20,
          col: Math.floor(totalCols / 2),
        },
        totalRows: 45,
        totalCols,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/board`,
        data
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const runAlgorithm = createAsyncThunk<
  Array<INode>, // Return type of the fulfilled action
  { algorithm: Algorithms }, // Argument type for the thunk
  {
    state: RootState, // Type of the Redux state
    rejectValue: string, // Type for the rejection value
  }
>(
  'nodes/runAlgorithm',
  async ({ algorithm }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { startNode, endNode, nodes } = state.nodes;

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/${algorithm}`,
        { startNode, endNode, nodes }
      );

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMaze = createAsyncThunk<
  INode[][],
  void,
  {
    state: RootState,
    rejectValue: string,
  }
>('nodes/fetchMaze', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const { nodes } = state.nodes;

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/maze`,
      { nodes }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      // Make sure to correctly handle and return the error payload
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

export const useTool = createAsyncThunk<
  void,
  { row: number, col: number },
  {
    state: RootState,
  }
>('tools/useTool', async ({ row, col }, { getState, dispatch }) => {
  const state = getState();
  const { selectedTool, currentWeight } = state.tools;

  if (selectedTool === 'Walls') {
    dispatch(toggleWall({ row, col }));
  } else if (selectedTool === 'Eraser') {
    dispatch(resetNode({ row, col }));
  } else if (selectedTool === 'Weight') {
    dispatch(setWeight({ row, col, weight: currentWeight }));
  }
});
