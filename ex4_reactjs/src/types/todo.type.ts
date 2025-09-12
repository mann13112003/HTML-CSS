export interface Todo {
  id: string;
  content: string;
  checked: boolean;
  createdAt: string;
}

export type NewTodo = Omit<Todo, "id">;

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | boolean;
  todoUpdate: Todo | undefined;
}
