// import React, { useState } from "react";
// import axios from "../api/axios";

// function ResendVerification() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     try {
//       const res = await axios.post("/auth/resend-verification", { email });
//       setMessage(res.data.message || "Verification email sent. Check your inbox.");
//     } catch (err) {
//       setMessage(err?.response?.data?.error || "Failed to send verification email.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-10 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Resend Verification Email</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           disabled={loading}
//         >
//           {loading ? "Sending..." : "Resend Email"}
//         </button>
//       </form>
//       {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
//     </div>
//   );
// }

// export default ResendVerification; 