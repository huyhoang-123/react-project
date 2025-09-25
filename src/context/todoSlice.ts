import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../services/api";

export type todoType = {
  name: string;
  description: string;
  assignee: string;
  priority: string;
  status: string;
};

export const fetchTodo = createAsyncThunk("todo/get", async () => {
  try {
    const res = await api.get("/todos");
    return res.data;
  } catch (error) {
    console.error(`fetch error: ${error}`);
    return null;
  }
});

export const createTodo = createAsyncThunk(
  "todo/post",
  async (data: todoType) => {
    try {
      const res = await api.post("/todos", data);
      return res.data;
    } catch (error) {
      console.error(`create error: ${error}`);
      return null;
    }
  }
);
export const editTodo = createAsyncThunk("todo/put", async (data: any) => {
  try {
    const res = await api.put(`/todos/${data.id}`,data);
    return res.data;
  } catch (error) {
    console.error(`edit error: ${error}`);
    return null;
  }
});
export const deleteTodo = createAsyncThunk("todo/delete", async (id: string) => {
  try {
    const res = await api.delete(`/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error(`delete error: ${error}`);
    return null;
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTodo.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchTodo.rejected, (state) => {
        (state.loading = false), (state.error = true);
      });
    //ADD TODO
    builder.addCase(createTodo.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    //EDIT TODO
    builder.addCase(editTodo.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    //DELETETODO
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
  },
});

export default todoSlice.reducer;
