// import React, { useState, useEffect, useRef } from "react";
// import axios from "../../api/axios"; // Adjust path if needed

// export default function Uploads() {
//   const [file, setFile] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const fileInputRef = useRef();
//   const adminUser = JSON.parse(localStorage.getItem("adminUser"));
//   const user = JSON.parse(localStorage.getItem("user"));
//   const isAdmin = adminUser?.role === "admin";
//   // Fetch upload history
//   useEffect(() => {
//   //   const fetchUploads = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const res = await axios.get("/admin/uploads");
//   //       setUploads(res.data.uploads || []);
//   //       setLoading(false);
//   //     } catch (err) {
//   //       setError("Failed to load upload history");
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchUploads();
//   // }, [success]);
//   const fetchUploads = async () => {
//   try {
//       setLoading(true);
//       // Admin sees all uploads, user sees only their own
//       const endpoint = isAdmin ? "/admin/uploads" : "/admin/user/uploads";
//       const res = await axios.get(endpoint);
//       setUploads(res.data.uploads || []);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load upload history");
//       setLoading(false);
//     }
//   };
//   fetchUploads();
//   // eslint-disable-next-line
// }, [success, isAdmin]);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setError("");
//     setSuccess("");
//   };

//   // Handle file upload
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError("Please select a file to upload.");
//       return;
//     }
//     setUploading(true);
//     setError("");
//     setSuccess("");
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       await axios.post("/admin/uploads", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setSuccess("File uploaded successfully!");
//       setFile(null);
//       fileInputRef.current.value = "";
//     } catch (err) {
//       setError("Upload failed. Please try again.");
//     }
//     setUploading(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-lg font-bold mb-2">Upload Excel File</h2>
//         <form onSubmit={handleUpload} className="flex flex-col items-center space-y-4">
//           <input
//             type="file"
//             accept=".xlsx,.xls"
//             onChange={handleFileChange}
//             ref={fileInputRef}
//             className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             disabled={uploading}
//           >
//             {uploading ? "Uploading..." : "Upload"}
//           </button>
//           {error && <div className="text-red-600">{error}</div>}
//           {success && <div className="text-green-600">{success}</div>}
//         </form>
//       </div>

//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-lg font-bold mb-2">Upload History</h2>
//         {loading ? (
//           <div>Loading history...</div>
//         ) : uploads.length === 0 ? (
//           <div>No uploads found.</div>
//         ) : (
//           <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
//             {uploads.map((upload, idx) => (
//               <li key={idx}>
//                 {upload.fileName} — uploaded {timeAgo(upload.createdAt)} by {upload.userEmail || "Unknown"}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// // Helper to display "x days ago"
// function timeAgo(dateString) {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffMs = now - date;
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//   if (diffDays === 0) return "today";
//   if (diffDays === 1) return "1 day ago";
//   return `${diffDays} days ago`;
// }

import React, { useState, useEffect, useRef } from "react";
import {api} from "../../api/axios";

export default function Uploads() {
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef();

  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  const user = JSON.parse(localStorage.getItem("user"));
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
    // eslint-disable-next-line
  }, [success, isAdmin]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setUploading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/admin/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("File uploaded successfully!");
      setFile(null);
      fileInputRef.current.value = "";
    } catch (err) {
      setError("Upload failed. Please try again.");
    }
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Upload Excel File</h2>
        <form onSubmit={handleUpload} className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Upload History</h2>
        {loading ? (
          <div>Loading history...</div>
        ) : uploads.length === 0 ? (
          <div>No uploads found.</div>
        ) : (
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            {uploads.map((upload, idx) => (
              <li key={upload._id || idx}>
                {upload.metadata?.originalName || "Unnamed file"}
                {" — uploaded "}
                {timeAgo(upload.createdAt || upload.uploadDate)}
                {" by "}
                {upload.metadata?.userId || "Unknown"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function timeAgo(dateString) {
  if (!dateString) return "unknown date";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}