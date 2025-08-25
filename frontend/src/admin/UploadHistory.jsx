import React, { useEffect, useState } from "react";
import {api} from "../../api/axios";

function UploadHistory() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  const isAdmin = adminUser?.role === "admin";

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        setLoading(true);
        const endpoint = isAdmin ? "/admin/uploads" : "/admin/user/uploads";
        const res = await api.get(endpoint);
        setUploads(res.data.uploads || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load upload history");
        setLoading(false);
      }
    };
    fetchUploads();
  }, [isAdmin]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">📜 Upload History</h2>
      {loading ? (
        <div>Loading history...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : uploads.length === 0 ? (
        <div>No uploads found.</div>
      ) : (
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Filename</th>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((item, idx) => (
              <tr key={item._id || idx}>
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{item.metadata?.originalName || "Unnamed file"}</td>
                <td className="py-2 px-4">{item.metadata?.userId || "Unknown"}</td>
                <td className="py-2 px-4">{formatDate(item.createdAt || item.uploadDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

export default UploadHistory;