import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoServices from "../../services/todoServices";

const initialState = {
  todo: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get list of todos
export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, thunkAPI) => {
    try {
      // we can get user token using thunkApi from userSlic
      return await todoServices.getTodos(thunkAPI.getState().user.user.token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create todos
export const addTodos = createAsyncThunk(
  "todos/addTodos",
  async (todo, thunkAPI) => {
    try {
      // we can get user token using thunkApi from userSlic
      return await todoServices.addTodos(todo,thunkAPI.getState().user.user.token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todo = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // to get error message from backend response
      })
      .addCase(addTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todo.push(action.payload);
      })
      .addCase(addTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // to get error message from backend response
      })
  },
});
export const { reset } = todoSlice.actions;
export default todoSlice.reducer;