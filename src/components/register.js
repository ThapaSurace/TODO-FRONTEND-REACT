import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register,reset } from "../features/authentication/userSlice";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const handleChange = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      dispatch(reset);
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };
  const { name, email, password, confirmedPassword } = registerData;
  return (
    <>
      <div className="container mx-auto my-14 shadow-md  max-w-sm p-3">
        <div className="text-center text-3xl font-bold text-indigo-500">
          Create an Account
        </div>
        <form onSubmit={onSubmit} className="mt-2 mx-auto">
          <div>
            <label className="block" htmlFor="text">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="text"
                value={name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block" htmlFor="email">
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block" htmlFor="passowrd">
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block" htmlFor="conformpassowrd">
              Conform Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                name="confirmedPassword"
                id="conformpassword"
                value={confirmedPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-3 ">
            <button
              disabled={
                name === "" ||
                email === "" ||
                password === "" ||
                confirmedPassword === ""
              }
              type="submit"
              className="bg-indigo-500  hover:bg-indigo-600 p-2 text-white rounded-md text-base font-semibold w-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
