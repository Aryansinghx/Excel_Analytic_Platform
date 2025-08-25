import { useDropzone } from "react-dropzone";

function ExcelDropzone({ onFileUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": [],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`p-6 border-2 border-dashed rounded-lg text-center ${
        isDragActive ? "bg-blue-100 border-blue-500" : "bg-white"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive
          ? "📂 Drop the Excel file here..."
          : "📁 Drag & drop Excel file or click to browse"}
      </p>
    </div>
  );
}

export default ExcelDropzone;