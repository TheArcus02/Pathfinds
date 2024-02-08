import { configureStore } from '@reduxjs/toolkit';
import nodesSlice from './nodesSlice';
import toolsSlice from './toolsSlice';

export const store = configureStore({
  reducer: {
    nodes: nodesSlice,
    tools: toolsSlice,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
