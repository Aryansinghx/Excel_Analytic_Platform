import { useState } from "react";
import {api} from "../api/axios";
import authHeader from "../api/authHeader";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [name, setName] = useState(user.name || "");
  const [email] = useState(user.email || "");
  const [message, setMessage] = useState("");

  const updateProfile = async () => {
    try {
      const res = await api.put(
        "/user/update",
        { name },
        { headers: authHeader() }
      );
      setMessage("✅ Profile updated.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Update failed.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-gray-700">⚙️ Settings</h2>

      <label className="block text-sm font-medium">Name</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block text-sm font-medium mt-4">Email (cannot change)</label>
      <input type="email" className="border p-2 w-full" value={email} readOnly />

      <button
        onClick={updateProfile}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Profile
      </button>

      {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
    </div>
  );
}

export default Settings;