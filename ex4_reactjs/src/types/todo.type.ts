export interface Todo {
  id: string;
  content: string;
  checked: boolean;
  createdAt: string;
}

export interface NewTodo {
  content: string;
  checked: boolean;
  createdAt: string;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | boolean;
  todoUpdate: Todo | undefined;
}
