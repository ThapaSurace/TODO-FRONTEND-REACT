import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import moment from "moment";
import { deleteTodo } from "../features/todos/todoSlice";

// passing default value to props
const Todocard = ({
  todo = {},
  setTodoText = () => {},
  setUpdateTodoId = () => {},
}) => {
  const dispatch = useDispatch();

  // converting date to required format
  const convertDate = (date) => {
    return moment(date).format("L"); // 12/02/2022
  };

  const handleEditTodo = () => {
    setTodoText(todo.todo);
    setUpdateTodoId(todo._id);
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo?._id));
  };

  return (
    <>
      <div className=" bg-gray-700 px-2 py-1 rounded-md flex justify-between items-center ">
        <div className="flex flex-col justify-between gap-y-1">
          <p className="text-lg font-semibold text-white cursive">
            {todo.todo}
          </p>
          <p className="todo-date text-xs text-white capitalize">
            created at: {convertDate(todo.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <MdModeEdit
            onClick={handleEditTodo}
            size={25}
            className="text-white cursor-pointer"
          />
          <AiFillDelete
            onClick={handleDeleteTodo}
            size={25}
            className="text-white cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Todocard;
