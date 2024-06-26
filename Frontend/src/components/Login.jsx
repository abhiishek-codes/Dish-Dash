import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ setIsSwapped }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = {
        email: email,
        password: password,
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        formdata
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      const redirect = location.state?.from || "/";
      navigate(redirect);
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error.response.data.error)) {
          // Handle array of errors
          const errors = error.response.data.error.map((err) => err.message);
          setErrorMessage(errors.join(", "));
        } else if (typeof error.response.data.message === "string") {
          // Handle single error message
          setErrorMessage(error.response.data.message);
        } else {
          // Handle other errors (network issues, etc.)
          setErrorMessage(error.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-5 my-auto items-center w-full max-w-md mx-auto px-8 rounded-lg shadow-md ">
      <h1 className="font-['Basis'] tracking-wide text-2xl sm:text-5xl text-white">
        Welcome Back
      </h1>
      <h2 className="font-['customSans'] tracking-tight text-base sm:text-2xl text-white">
        Sign in to your account
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-6 w-full"
        method="post"
      >
        <div className="flex flex-col gap-y-2 font-['customSans']">
          <label htmlFor="email" className="text-white text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="w-full border-gray-300 bg-white text-bgmedgrey focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password" className="text-white text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="w-full border-gray-300 bg-white text-bgmedgrey focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="py-2 rounded-md bg-indigo-600 text-white font-semibold bg-bggreen active:scale-95 transition-transform duration-300"
        >
          Login
        </button>
      </form>
      <label
        className="text-[1rem] text-white cursor-pointer"
        onClick={() => setIsSwapped((prev) => !prev)}
      >
        Not registered yet: Sign up
      </label>
      {errorMessage && (
        <div className="text-red-500 text-lg ">{errorMessage}</div>
      )}
    </div>
  );
};

export default Login;
