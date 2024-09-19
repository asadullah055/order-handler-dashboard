import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { seller_register } from "../../features/auth/authSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(seller_register(state)).unwrap();
    if (result) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-[350px] p-2">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-2xl mb-3 font-semibold bg-teal-50 p-2 rounded">
            Registration{" "}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input
                className="px-3 py-2 outline-none border border-gray-700 bg-transparent rounded-md p-1 focus:border-gray-500 overflow-hidden"
                type="text"
                name="name"
                value={state.name}
                onChange={handleInput}
                placeholder="name"
                id="name"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="px-3 py-2 outline-none border border-gray-700 bg-transparent rounded-md p-1 focus:border-gray-500 overflow-hidden"
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
                className="px-3 py-2 outline-none border border-gray-700 bg-transparent rounded-md p-1 focus:border-gray-500 overflow-hidden"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                value={state.password}
                onChange={handleInput}
                required
              />
            </div>

            <button className="bg-teal-500 w-full text-white rounded-md px-7 py-2 mb-3">
              Signup
            </button>
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already have an account ? <Link to="/login">Signin here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
