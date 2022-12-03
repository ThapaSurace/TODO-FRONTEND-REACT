import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DiYeoman } from "react-icons/di";
import { addTodos, getTodos, reset } from "../features/todos/todoSlice";
import Todocard from "./todoCard";

const Dashboard = () => {
  const [todoText, setTodoText] = useState("");

  const { user } = useSelector((state) => state.user);
  const { todo } = useSelector((state) => state.todo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getTodos());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodos(todoText));
    setTodoText("");
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
              onChange={(e) => setTodoText(e.target.value)}
            />
          </form>
        </div>
        <div className="flex flex-col gap-2">
          {todo?.map((item) => (
            <Todocard todo={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
