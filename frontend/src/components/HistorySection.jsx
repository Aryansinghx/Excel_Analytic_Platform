// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import authHeader from "../api/authHeader";

// function HistorySection() {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const res = await axios.get("/excel/files", { headers: authHeader() });
//         setFiles(res.data.reverse());
//       } catch (err) {
//         console.error("Error loading file history");
//       }
//     };

//     fetchFiles();
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">📜 Upload History</h2>
//       {files.length === 0 ? (
//         <p className="text-gray-500">No uploaded files found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {files.map((file) => (
//             <li key={file._id} className="p-3 border rounded flex justify-between">
//               <div>
//                 <p className="font-medium">{file.metadata.originalName}</p>
//                 <p className="text-sm text-gray-500">{new Date(file.uploadDate).toLocaleString()}</p>
//               </div>
//               <a
//                 href={`/api/excel/files/${file._id}/download`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 Download
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default HistorySection;

// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import authHeader from "../api/authHeader";
// import toast from "react-hot-toast";

// function HistorySection() {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch files from backend (UNCHANGED)
//   const fetchFiles = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/admin/user/uploads", { headers: authHeader() });
//       setFiles(res.data.uploads.reverse());
//     } catch (err) {
//       toast.error("Error loading file history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//     // eslint-disable-next-line
//   }, []);

//   // // Download Handler (UPDATED)
//   // const handleDownload = async (fileId, filename) => {
//   //   try {
//   //     const response = await axios.get(`/api/excel/files/:${fileId}/download`, {
//   //       headers: authHeader(),
//   //       responseType: 'blob',
//   //     });
//   //     const url = window.URL.createObjectURL(new Blob([response.data]));
//   //     const link = document.createElement('a');
//   //     link.href = url;
//   //     link.setAttribute('download', filename || 'file.xlsx');
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     link.remove();
//   //     window.URL.revokeObjectURL(url);
//   //   } catch (err) {
//   //     toast.error("Failed to download file.");
//   //   }
//   // };

//   // // Delete a single file (UPDATED)
//   // const deleteFile = async (fileId) => {
//   //   try {
//   //     await axios.delete(`/api/excel/files/${fileId}`, { headers: authHeader() });
//   //     toast.success("File deleted!");
//   //     fetchFiles();
//   //   } catch (err) {
//   //     toast.error("Failed to delete file");
//   //   }
//   // };

//   // Clear all history (UPDATED)
//   const clearHistory = async () => {
//     try {
//       await axios.delete("/api/excel/files/clear", { headers: authHeader() });
//       toast.success("Upload history cleared!");
//       fetchFiles();
//     } catch (err) {
//       toast.error("Failed to clear history");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">📜 Upload History</h2>
//         <button
//           onClick={clearHistory}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
//           disabled={files.length === 0 || loading}
//         >
//           Clear All History
//         </button>
//       </div>
//       {files.length === 0 ? (
//         <p className="text-gray-500">No uploaded files found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {files.map((file) => (
//             <li
//               key={file._id}
//               className="p-3 border rounded flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-medium">
//                   {file.metadata?.originalName || "Unnamed file"}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   {file.metadata?.userId || "Unknown"}
//                 </p>
//                 {file.createdAt && (
//                   <p className="text-sm text-gray-500">
//                     {new Date(file.createdAt).toLocaleString()}
//                   </p>
//                 )}
//               </div>
//               <div className="flex items-center gap-4">
//                 {/* <button
//                   onClick={() => handleDownload(file._id, file.metadata?.originalName)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Download
//                 </button> */}
//                 {/* <button
//                   onClick={() => deleteFile(file._id)}
//                   className="text-red-600 hover:text-red-800 ml-2"
//                   title="Delete file"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button> */}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default HistorySection;

import { useEffect, useState } from "react";
import {api} from "../api/axios";
import authHeader from "../api/authHeader";
import toast from "react-hot-toast";

function HistorySection() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch files from backend (UNCHANGED)
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/excel/files", { headers: authHeader() });
      setFiles(res.data.uploads.reverse());
    } catch (err) {
      toast.error("Error loading file history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line
  }, []);

  // Download Handler (FIXED: removed colon before id)
  const handleDownload = async (fileId, filename) => {
    try {
      const response = await api.get(`/api/excel/files/${fileId}/download`, {
        headers: authHeader(),
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename || 'file.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Failed to download file.");
    }
  };

  // Delete a single file (FIXED: correct endpoint)
  const deleteFile = async (fileId) => {
    try {
      await api.delete(`/api/excel/files/${fileId}`, { headers: authHeader() });
      toast.success("File deleted!");
      fetchFiles();
    } catch (err) {
      toast.error("Failed to delete file");
    }
  };

  // Clear all history (UNCHANGED)
  const clearHistory = async () => {
    try {
      await api.delete("/api/excel/files/clear", { headers: authHeader() });
      toast.success("Upload history cleared!");
      fetchFiles();
    } catch (err) {
      toast.error("Failed to clear history");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📜 Upload History</h2>
        <button
          onClick={clearHistory}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          disabled={files.length === 0 || loading}
        >
          Clear All History
        </button>
      </div>
      {files.length === 0 ? (
        <p className="text-gray-500">No uploaded files found.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file._id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {file.metadata?.originalName || "Unnamed file"}
                </p>
                <p className="text-xs text-gray-400">
                  {file.metadata?.userId || "Unknown"}
                </p>
                {file.createdAt && (
                  <p className="text-sm text-gray-500">
                    {new Date(file.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleDownload(file._id, file.metadata?.originalName)}
                  className="text-blue-600 hover:underline"
                >
                  Download
                </button>
                <button
                  onClick={() => deleteFile(file._id)}
                  className="text-red-600 hover:text-red-800 ml-2"
                  title="Delete file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistorySection;