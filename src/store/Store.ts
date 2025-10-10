import { configureStore } from '@reduxjs/toolkit';
import regisReducer from '../context/RegisSlice';
import authReducer from '../context/AuthSlice';
import todoReducer from '../context/TodoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    regis: regisReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
