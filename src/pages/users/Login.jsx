import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingBtn from "../../components/LoadingBtn";
import { messageClear, seller_login } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, errorMessage, isLoading } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(seller_login(state));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-[350px] p-2">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-2xl mb-3 font-semibold bg-teal-50 p-2 rounded">
            Please Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="px-3 py-2 outline-none border border-gray-700 bg-transparent rounded-md  focus:border-gray-500 overflow-hidden"
                type="email"
                name="email"
                placeholder="email"
                id="email"
                value={state.email}
                onChange={handleInput}
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                className="px-3 py-2 outline-none border border-gray-700 bg-transparent rounded-md  focus:border-gray-500 overflow-hidden"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
                value={state.password}
                onChange={handleInput}
              />
            </div>

            <button
              disabled={isLoading}
              className="bg-teal-500 w-full text-white rounded-md px-7 py-2 mb-3"
            >
              {isLoading ? <LoadingBtn /> : " Signup"}
            </button>
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already have an no account ?{" "}
                <Link to="/register">Signup here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
