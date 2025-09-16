import { memo } from "react";
import type { Todo } from "../../types/todo.type";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateTodo, deleteTodo, setTodoUpdate } from "../../redux/todoSlice";
import { toast } from "react-toastify";
interface TodoItemProps {
  todo: Todo;
}
const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const { todos, loading } = useAppSelector((state) => state.todos);

  // Delete Todo
  const handleDeleteTodo = async (id: string) => {
    if (loading) return;
    try {
      await dispatch(deleteTodo(id)).unwrap();
      toast.success("Delete todo success");
    } catch (error) {
      toast.error("Delete todo fail!");
      console.error(error);
    }
  };

  // Update status todo
  const handleCheckTodo = async (id: string, checked: boolean) => {
    if (loading) return;
    try {
      await dispatch(updateTodo({ id, body: { checked } })).unwrap();
      toast.success("Update status success");
    } catch (error) {
      toast.error("Update status fail!");
      console.error(error);
    }
  };

  //Open modal
  const handleOpenModal = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    dispatch(setTodoUpdate(todo));
  };

  return (
    <li className="todo__item">
      <span
        className="todo__check"
        onClick={() => {
          handleCheckTodo(todo.id, !todo.checked);
        }}
      >
        {todo.checked && <img src="/svg/Vector.svg" alt="checkbox" />}
      </span>
      <span className="todo__content">{todo.content}</span>
      <div className="todo__icons">
        <img
          className="todo__update"
          src="/svg/Pen_Update.svg"
          alt="update"
          onClick={() => {
            handleOpenModal(todo.id);
          }}
        />
        <img
          className="todo__delete"
          src="/svg/Btn_Delete.svg"
          alt="delete"
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        />
      </div>
    </li>
  );
};
export default memo(TodoItem);
