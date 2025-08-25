// src/components/LoginForm.jsx
import { useState } from "react";
// import { FaGoogle } from "react-icons/fa";
//import logo from "../assets/logo.png";
import {api} from "../utils/api";

const LoginForm = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6">
      <div className="text-center">
       
        <h2 className="text-3xl font-bold text-blue-700">Wellcome Back!</h2>
        <p className="text-sm text-gray-500">to your Excel Analytics account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>

      <div className="flex justify-between text-xs mt-2">
        <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
        {/* <a href="/resend-verification" className="text-blue-600 hover:underline">Resend Verification Email</a> */}
      </div>
      <div className="flex justify-between text-xs mt-2">
        <a href="/admin/login" className="text-blue-600 hover:underline">Admin SignIn</a>
      </div>

      <div className="text-center text-gray-400 text-xs">OR</div>

      {/* <button
        type="button"
        className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition"
      >
        <FaGoogle className="mr-2 text-red-500" />
        Sign in with Google
      </button> */}

      <p className="text-center text-xs text-gray-400 mt-2">
        Don't have an account?{' '}
        <span
          onClick={toggle}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default LoginForm;