import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { fetchTodos, addTodo } from "../redux/todoSlice";
import type { NewTodo } from "../types/todo.type";
import TodoItem from "../components/ToDoApp/TodoItem";
import TodoModal from "../components/ToDoApp/ModalUpdateTodo";
import { useAppDispatch, useAppSelector } from "../redux/store";
import "./ToDoApp.css";

function ToDoAppPage() {
  const inputRefTodo = useRef<HTMLInputElement>(null);

  const { todos, loading } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  //Fetch todo
  const handleFetchData = async () => {
    if (loading) return;
    try {
      await dispatch(fetchTodos());
      toast.success("Fetch todos success!");
    } catch (err) {
      toast.error("Fetch data fail!");
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  //Add todo
  const handleAddTodo = async () => {
    if (loading) return;
    if (!inputRefTodo.current?.value.trim()) {
      toast.warn("Please enter content!");
      inputRefTodo.current?.focus();
      return;
    }
    try {
      const newTodo: NewTodo = {
        content: inputRefTodo.current?.value,
        checked: false,
        createdAt: new Date().toISOString(),
      };
      await dispatch(addTodo(newTodo)).unwrap();
      toast.success("Add todo success");
      inputRefTodo.current.value = "";
      inputRefTodo.current?.focus();
    } catch (error) {
      toast.error("Add todo fail!");
      console.error(error);
    }
  };

  return (
    <>
      <div className="container__todo">
        <div className="todo">
          <h1 className="todo__title">To Do App</h1>
          <div className="todo__input-group">
            <input
              type="text"
              className="todo__input"
              placeholder="some words"
              ref={inputRefTodo}
            />
            <button className="todo__add-btn" onClick={handleAddTodo}>
              <img src="/svg/Add_Plus.svg" alt="Add_plus" />
            </button>
          </div>
          <hr className="todo__divider" />
          {loading && <h3>Loading ...</h3>}
          <ul className="todo__list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </div>
      <TodoModal />
    </>
  );
}

export default ToDoAppPage;
