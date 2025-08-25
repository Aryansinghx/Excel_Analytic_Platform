// src/pages/TwoFactorPrompt.jsx
import { useState } from "react";
import {api} from "../utils/api";
import { useNavigate } from "react-router-dom";

const TwoFactorPrompt = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await api.post("/auth/2fa/verify", { token });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow space-y-4 max-w-sm w-full">
        <h2 className="text-xl font-bold text-center">Two-Factor Authentication</h2>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full border px-4 py-2 rounded focus:outline-none"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default TwoFactorPrompt;