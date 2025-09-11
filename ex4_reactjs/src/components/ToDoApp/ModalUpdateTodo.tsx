import { useState, useEffect, memo, useCallback } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateTodo, setTodoUpdate } from "../../redux/todoSlice";

const TodoModal = () => {
  const [newContent, setNewContent] = useState<string | undefined>("");

  const dispatch = useAppDispatch();
  const { todoUpdate, loading } = useAppSelector((state) => state.todos);

  useEffect(() => {
    setNewContent(todoUpdate?.content || "");
  }, [todoUpdate]);

  // Update Content Todo
  const handleUpdateTodo = useCallback(
    async (newContent: string) => {
      if (loading || !todoUpdate) return;

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
    },
    [dispatch, loading, todoUpdate]
  );

  if (!todoUpdate) return null;

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
              handleUpdateTodo(newContent || "");
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
