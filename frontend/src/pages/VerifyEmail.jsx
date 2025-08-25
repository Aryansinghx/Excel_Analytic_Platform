// // src/pages/VerifyEmail.jsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../utils/api";

// const VerifyEmail = () => {
//   const { token } = useParams();
//   const [message, setMessage] = useState("Verifying...");

//   useEffect(() => {
//     const verify = async () => {
//       try {
//         const res = await axios.get('/auth/verify-email/${token}');
//         setMessage(res.data.message || "Email verified successfully");
//       } catch (err) {
//         setMessage(
//           err.response?.data?.error || "Verification failed. Token may be expired or invalid."
//         );
//       }
//     };
//     verify();
//   }, [token]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50">
//       <div className="p-6 bg-white rounded shadow text-center space-y-4">
//         <h2 className="text-xl font-semibold text-blue-700">Email Verification</h2>
//         <p className="text-gray-600">{message}</p>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;