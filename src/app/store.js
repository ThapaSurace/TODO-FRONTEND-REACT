import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/authentication/userSlice';
import  todoReducer  from '../features/todos/todoSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer
  },
});
