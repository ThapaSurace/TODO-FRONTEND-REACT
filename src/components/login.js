import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authentication/userSlice";
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isError, isSuccess, message} = useSelector((state)=>state.user)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if (isSuccess || user) {
      navigate("/");
    }
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const  userData = {email,password}
    dispatch(login(userData))

  };
  const { email, password } = loginData;
  return (
    <>
      <div className="tailwind-forms container mx-auto my-14 shadow-md  max-w-sm p-3">
        <div className="text-center text-3xl font-bold text-indigo-500">
          Login your account
        </div>
        <form onSubmit={onSubmit} className="mt-2 mx-auto">
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

          <div className="mt-3 ">
            <button
              disabled={email === "" || password === ""}
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 p-2 text-white rounded-md text-base font-semibold w-full"
            >
              Login
            </button>
            <div className="mt-3">
                <p>Dont Have Account?<Link to="/register"><span className="text-blue-500 underline"> Register Here</span></Link></p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
