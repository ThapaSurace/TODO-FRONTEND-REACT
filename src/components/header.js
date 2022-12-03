import React from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/authentication/userSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <>
      <div className="border-b-2 border-blue-400 p-3 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between ">
          <Link to="/">
            <h1 className="text-2xl font-extrabold text-gray-600 uppercase">
              todo list
            </h1>
          </Link>
          <div>
            {user ? (
              <div
                onClick={handleLogout}
                className="flex items-center cursor-pointer"
              >
                <AiOutlineLogout size={25} />
                <span className="text-lg font-semibold  text-gray-600">
                  Logout
                </span>
              </div>
            ) : (
              <div className="flex gap-x-10">
                <Link to="login">
                  <div className="flex items-center  hover:text-blue-500">
                    <AiOutlineLogin size={25} />
                    <span className="text-lg font-semibold ">Login</span>
                  </div>
                </Link>
                <Link to="register">
                  <div className="flex items-center hover:text-blue-500">
                    <BsPersonFill size={25} />
                    <span className="text-lg font-semibold ">Register</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
