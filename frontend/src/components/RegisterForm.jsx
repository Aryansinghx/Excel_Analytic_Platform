// src/components/RegisterForm.jsx
import '../../styles/auth.css';
import '../../styles/utils.css';

import { useState } from "react";
// import { FaGoogle } from "react-icons/fa";
import {api} from "../utils/api";
// import { useGoogleLogin } from '@react-oauth/google';


const RegisterForm = ({ toggle }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Google OAuth handler
  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       const res = await axios.post('/auth/google', {
  //         token: tokenResponse.credential || tokenResponse.access_token,
  //       });
  //       if (res.data.token && res.data.user) {
  //         localStorage.setItem('token', res.data.token);
  //         localStorage.setItem('user', JSON.stringify(res.data.user));
  //         window.location.href = '/dashboard';
  //       } else {
  //         alert(res.data.message || 'Google signup successful!');
  //       }
  //     } catch (err) {
  //       setError(err?.response?.data?.error || 'Google signup failed.');
  //     }
  //   },
  //   onError: () => setError('Google Sign Up Failed'),
  //   flow: 'implicit',
  // });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await api.post("/auth/register", {
        name: fullName,
        email,
        password,
      });
      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/dashboard";
      } else {
        alert(res.data.message || "Registration successful!.");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Registration failed. Try again.");
    }
  };

  return (
    <div className="w-full max-w-md p-0 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Your Account</h2>
        <p className="text-sm text-gray-500">Start with Excel Analytics today</p>
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <div className="text-center text-gray-400 text-xs">OR</div>
      {/* <button
        type="button"
        onClick={() => googleLogin()}
        className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition mt-1"
      >
        <FaGoogle className="mr-2 text-red-500 text-lg" />
        <span className="font-medium">Sign up with Google</span>
      </button> */}
      <p className="text-center text-xs text-gray-400 mt-2">
        Already have an account?{' '}
        <span
          onClick={toggle}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;