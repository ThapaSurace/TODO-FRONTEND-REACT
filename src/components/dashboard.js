import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DiYeoman } from "react-icons/di";
import {
  addTodos,
  getTodos,
  reset,
  updateTodo,
} from "../features/todos/todoSlice";
import Todocard from "./todoCard";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState("");
  const [updateTodoId, setUpdateTodoId] = useState("");
  const { todo } = useSelector((state) => state.todo);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getTodos());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleTodochange = (e) => {
    setTodoText(e.target.value);
  };
  
  // adding and updating todo
  const onSubmit = (e) => {
    e.preventDefault();
    if (updateTodoId !== "" && todoText) {
      const updateData = {
        updateTodoId,
        todoText,
      };
      dispatch(updateTodo(updateData));
      setTodoText("");
      setUpdateTodoId("");
    } else {
      dispatch(addTodos(todoText));
      setTodoText("");
    }
  };

  return (
    <>
      <div className=" max-w-lg mx-auto border-4 border-indigo-500 p-4 mt-8">
        <div className="flex items-center gap-x-2 mb-3 justify-center">
          <DiYeoman size={30} />
          <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>
        </div>
        <div className="mb-3">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="todo"
              name="todo"
              value={todoText}
              placeholder="Add todo..."
              onChange={handleTodochange}
            />
          </form>
        </div>
        <div className="flex flex-col gap-2">
          {todo?.map((item) => (
            <Todocard
              todo={item}
              key={item?._id}
              setTodoText={setTodoText}
              setUpdateTodoId={setUpdateTodoId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
