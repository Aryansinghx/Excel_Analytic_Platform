// // src/components/UploadSection.jsx

// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from "../utils/api";
// import toast from "react-hot-toast";

// const UploadSection = ({ setExcelColumns, setExcelRows, setFileId }) => {
//   const [loading, setLoading] = useState(false);

//   const onDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     const { columns, rows, fileId } = res.data;
//     setExcelColumns(columns || []);
//     setExcelRows(rows || []);
//     setFileId(fileId);

//     const formData = new FormData();
//     formData.append("file", file); // field must match multer field name

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await axios.post("/excel/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const { columns, rows } = res.data;
//       setExcelColumns(columns);
//       setExcelRows(rows);
//       toast.success("✅ Excel uploaded successfully");
//     } catch (error) {
//       console.error("❌ Upload Error:", error);
//       toast.error("Failed to upload Excel file");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
//       "application/vnd.ms-excel": [".xls"],
//     },
//     onDrop,
//     multiple: false,
//   });

//   return (
//     <div className="bg-white p-6 rounded shadow-md h-full flex flex-col justify-center items-center text-center">
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">Upload Your Excel File</h2>

//       <div
//         {...getRootProps()}
//         className={`w-full max-w-xl border-2 border-dashed p-10 rounded cursor-pointer transition ${
//           isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
//         }`}
//       >
//         <input {...getInputProps()} />
//         {loading ? (
//           <p className="text-blue-500 font-medium">Uploading...</p>
//         ) : isDragActive ? (
//           <p className="text-blue-600">Drop the file here...</p>
//         ) : (
//           <p className="text-gray-500">Drag & drop Excel file here or click to select</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadSection;

// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from "../utils/api";
// import toast from "react-hot-toast";

// const UploadSection = ({ setExcelColumns, setExcelRows, setFileId }) => {
//   const [loading, setLoading] = useState(false);

//   const onDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file); // field must match multer field name

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await axios.post("/excel/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Extract data here, after the axios call and only once
//       const { columns, rows, fileId } = res.data;
//       setExcelColumns(columns || []);
//       setExcelRows(rows || []);
//       setFileId(fileId);
//       toast.success("✅ Excel uploaded successfully");
//     } catch (error) {
//       console.error("❌ Upload Error:", error);
//       toast.error("Failed to upload Excel file");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
//       "application/vnd.ms-excel": [".xls"],
//     },
//     onDrop,
//     multiple: false,
//   });

//   return (
//     <div className="bg-white p-6 rounded shadow-md h-full flex flex-col justify-center items-center text-center">
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">Upload Your Excel File</h2>

//       <div
//         {...getRootProps()}
//         className={`w-full max-w-xl border-2 border-dashed p-10 rounded cursor-pointer transition ${
//           isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
//         }`}
//       >
//         <input {...getInputProps()} />
//         {loading ? (
//           <p className="text-blue-500 font-medium">Uploading...</p>
//         ) : isDragActive ? (
//           <p className="text-blue-600">Drop the file here...</p>
//         ) : (
//           <p className="text-gray-500">Drag & drop Excel file here or click to select</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadSection;

// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from "../utils/api";
// // import toast from "react-hot-toast";

// const UploadSection = ({ setExcelColumns, setExcelRows, setFileId }) => {
//   const [loading, setLoading] = useState(false);

//   const onDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file); // field must match multer field name

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await axios.post("/excel/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const { columns, rows, fileId } = res.data;
//       setExcelColumns(columns || []);
//       setExcelRows(rows || []);
//       setFileId(fileId);
//       toast.success("✅ Excel uploaded successfully");
//     } catch (error) {
//       console.error("❌ Upload Error:", error);
//       toast.error("Failed to upload Excel file");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
//       "application/vnd.ms-excel": [".xls"],
//     },
//     onDrop,
//     multiple: false,
//   });

//   return (
//     <div className="bg-white p-6 rounded shadow-md h-full flex flex-col justify-center items-center text-center">
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">Upload Your Excel File</h2>

//       <div
//         {...getRootProps()}
//         className={`w-full max-w-xl border-2 border-dashed p-10 rounded cursor-pointer transition ${
//           isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
//         }`}
//       >
//         <input {...getInputProps()} />
//         {loading ? (
//           <p className="text-blue-500 font-medium">Uploading...</p>
//         ) : isDragActive ? (
//           <p className="text-blue-600">Drop the file here...</p>
//         ) : (
//           <p className="text-gray-500">Drag & drop Excel file here or click to select</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadSection;

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {api} from "../utils/api";
import Swal from "sweetalert2";

const UploadSection = ({ setExcelColumns, setExcelRows, setFileId }) => {
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.post("/excel/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const { columns, rows, fileId } = res.data;

      if (!columns || !rows || !fileId) {
        throw new Error("Invalid response from server");
      }

      setExcelColumns(columns);
      setExcelRows(rows);
      setFileId(fileId);

      Swal.fire({
        title: "Success!",
        text: "Excel uploaded successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("❌ Upload Error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Failed to upload Excel file.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    onDrop,
    multiple: false,
  });

  return (
    <div className="bg-white p-6 rounded shadow-md h-full flex flex-col justify-center items-center text-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Upload Your Excel File</h2>

      <div
        {...getRootProps()}
        className={`w-full max-w-xl border-2 border-dashed p-10 rounded cursor-pointer transition ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {loading ? (
          <p className="text-blue-500 font-medium">Uploading...</p>
        ) : isDragActive ? (
          <p className="text-blue-600">Drop the file here...</p>
        ) : (
          <p className="text-gray-500">Drag & drop Excel file here or click to select</p>
        )}
      </div>
    </div>
  );
};

export default UploadSection;