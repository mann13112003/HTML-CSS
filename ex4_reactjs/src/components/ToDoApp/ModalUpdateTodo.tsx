import { useState, useEffect, memo } from "react";
import { toast } from "react-toastify";
import type { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, setTodoUpdate } from "../../redux/todoSlice";

const TodoModal = () => {
  const [newContent, setNewContent] = useState<string | undefined>("");

  const dispatch = useDispatch<AppDispatch>();
  const { todoUpdate, loading } = useSelector(
    (state: RootState) => state.todos
  );

  useEffect(() => {
    setNewContent(todoUpdate?.content || "");
  }, [todoUpdate]);

  if (!todoUpdate) return null;

  // Update Content Todo
  const handleUpdateTodo = async (newContent: string) => {
    if (loading) return;
    if (!todoUpdate) return;
    if (!newContent.trim()) {
      toast.warn("Please enter new todo!");
      return;
    }
    if (newContent.trim() === todoUpdate.content.trim()) {
      toast.info("Todo content is unchanged!");
      return;
    }
    try {
      await dispatch(
        updateTodo({ id: todoUpdate.id, body: { content: newContent } })
      ).unwrap();
      dispatch(setTodoUpdate(undefined));
      toast.success("Update todo success!");
    } catch (error) {
      toast.error("Update todo fail!");
      console.error(error);
    }
  };

  return (
    <div className="modal__backdrop">
      <div className="modal">
        <h3 className="modal__title">Update Todo</h3>
        <div className="new__todo">
          <label>Todo: </label>
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </div>
        <div className="modal__actions">
          <button
            className="modal__btn"
            onClick={() => dispatch(setTodoUpdate(undefined))}
          >
            Cancel
          </button>
          <button
            className="modal__btn"
            onClick={() => {
              if (!newContent || !newContent.trim()) return;
              handleUpdateTodo(newContent);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(TodoModal);
