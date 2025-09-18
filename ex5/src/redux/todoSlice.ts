import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiRequest } from "../services/api";
import type { Todo, NewTodo, TodoState } from "../types/todo.type";

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: false,
  todoUpdate: undefined,
};

//fetch todo
export const fetchTodos = createAsyncThunk<Todo[]>(
  "todos/fetchTodos",
  async () => {
    return await apiRequest<Todo[]>({
      path: "/",
      method: "GET",
    });
  }
);

//add todo
export const addTodo = createAsyncThunk<Todo, NewTodo>(
  "todos/addTodo",
  async (newTodo) => {
    return await apiRequest<Todo, NewTodo>({
      path: "/",
      method: "POST",
      body: newTodo,
    });
  }
);

//delete todo
export const deleteTodo = createAsyncThunk<string, string>(
  "todos/deleteTodo",
  async (id) => {
    await apiRequest<void>({
      path: `/${id}`,
      method: "DELETE",
    });
    return id;
  }
);

//update todo
export const updateTodo = createAsyncThunk<
  Todo,
  { id: string; body: Partial<Todo> }
>("todos/updateTodo", async ({ id, body }) => {
  return await apiRequest<Todo, Partial<Todo>>({
    path: `/${id}`,
    method: "PUT",
    body,
  });
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodoUpdate(state, action: PayloadAction<Todo | undefined>) {
      state.todoUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fail to fetch todos";
      })
      // add todo
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fail to add todo";
      })

      // delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fail to delete todo";
      })

      // update todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) state.todos[index] = action.payload;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fail to update todo";
      });
  },
});

export const { setTodoUpdate } = todoSlice.actions;

export default todoSlice.reducer;
