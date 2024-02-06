/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ColAndRow } from '../utils/interfaces';
import { getMaxCols } from '../utils/utils';

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
        data,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
