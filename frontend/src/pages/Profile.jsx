import { useState } from "react";
import {api} from "../api/axios";
import authHeader from "../api/authHeader";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pic, setPic] = useState(null);

  const handlePicUpload = async () => {
    const formData = new FormData();
    formData.append("profilePic", pic);

    try {
      await api.post("/upload/profile/upload-pic", formData, {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile picture updated!");
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>

      <div className="mb-4">
        <img
          src={
            user.profilePic ||
            `https://ui-avatars.com/api/?name=${user.name}&background=random`
          }
          alt="avatar"
          className="w-24 h-24 rounded-full border mb-2"
        />
        <p className="text-gray-700 font-medium">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPic(e.target.files[0])}
        className="mb-2"
      />
      <br />
      <button
        onClick={handlePicUpload}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Upload New Picture
      </button>
    </div>
  );
}

export default Profile;