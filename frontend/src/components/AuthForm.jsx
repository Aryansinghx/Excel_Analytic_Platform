import React from "react";
import SocialButtons from "./SocialButtons";

function AuthForm({ isLogin, toggle }) {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isLogin ? "Welcome Back" : "Join Excel Analytics"}
      </h2>

      <form className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <SocialButtons />

      <p className="mt-4 text-center text-sm">
        {isLogin ? (
          <>
            New here?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={toggle}>
              Create Account
            </span>
          </>
        ) : (
          <>
            Already a member?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={toggle}>
              Login here
            </span>
          </>
        )}
      </p>
    </div>
  );
}

export default AuthForm;