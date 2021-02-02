import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../component/TodoForm/todoSlice';

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
});
