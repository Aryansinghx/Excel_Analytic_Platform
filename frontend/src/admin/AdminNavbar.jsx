// // src/admin/AdminNavbar.jsx
// import { useNavigate } from "react-router-dom";

// function AdminNavbar() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const avatar = user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || "Admin"}`;
//   const name = user?.name || "Admin";

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="w-full p-4 bg-white shadow flex justify-between items-center">
//       <h1 className="text-xl font-bold text-gray-700">Admin Panel</h1>

//       <div className="flex items-center space-x-4 text-sm text-gray-600">
//         <button
//           onClick={() => navigate("/support")}
//           className="hover:text-blue-600 transition"
//         >
//           Support
//         </button>
//         <div className="flex items-center space-x-2">
//           <img
//             src={avatar}
//             alt="avatar"
//             className="w-8 h-8 rounded-full object-cover border"
//           />
//           <span>{name}</span>
//         </div>
//         <button
//           onClick={logout}
//           className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AdminNavbar;

import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  // Get admin user from localStorage (stored during admin login)
  const adminUser = JSON.parse(localStorage.getItem("adminUser")) || { name: "Admin" };
  const avatar = adminUser.profilePic || `https://ui-avatars.com/api/?name=${adminUser.name}&background=0ea5e9&color=fff`;

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div className="w-full p-4 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Excel Analytic Platform - Admin Panel</h1>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
          />
          <div className="text-right">
            <p className="font-medium text-gray-800">{adminUser.name}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="ml-4 bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition flex items-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;