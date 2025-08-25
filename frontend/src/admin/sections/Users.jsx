// import React from "react";

// const users = [
//   { name: "Mahak Agarwal", email: "agarwalmahak2010@gmail.com", role: "Admin" },
//   { name: "Suman Das", email: "ku2sumandas1999@gmail.com", role: "Admin" },
//   { name: "Rahul Ghorpade", email: "rahulghorpade0707@gmail.com", role: "Admin" },
//   { name: "Vikram T", email: "vikramt10124@gmail.com", role: "Admin" },
//   { name: "Subhrank", email: "subhrankpriya@gmail.com", role: "Admin"}
// ];

// function Users() {
//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <table className="min-w-full text-sm">
//         <thead className="bg-gray-100 text-gray-700">
//           <tr>
//             <th className="px-6 py-3 text-left">Name</th>
//             <th className="px-6 py-3 text-left">Email</th>
//             <th className="px-6 py-3 text-left">Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u, i) => (
//             <tr key={i} className="border-t hover:bg-gray-50">
//               <td className="px-6 py-3">{u.name}</td>
//               <td className="px-6 py-3">{u.email}</td>
//               <td className="px-6 py-3">
//                 <span className="inline-block px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
//                   {u.role}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Users;


  import React, { useEffect, useState } from "react";
  import {api} from "../../api/axios"; // Adjust the import if your axios instance is elsewhere

  function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleting, setDeleting] = useState("");
    const adminUser = JSON.parse(localStorage.getItem("adminUser"));

    // Fetch users from backend
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const res = await api.get("/admin/users");
          setUsers(res.data.users);
          setLoading(false);
        } catch (err) {
          if (err.response && err.response.status === 401) {
            setError("Session expired. Please log in again.");
          } else {
            setError(err.response?.data?.message || "Failed to load users");
          }
          setLoading(false);
        }
      };
      fetchUsers();
    }, [success]);

    // Delete user handler
    const handleDelete = async (userId) => {
      if (userId === adminUser?.id || userId === adminUser?._id) {
        setError("You cannot delete your own admin account.");
        return;
      }
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      setDeleting(userId);
      try {
        await api.delete(`/admin/users/${userId}`);
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        setSuccess("User deleted successfully.");
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete user");
      }
      setDeleting("");
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <span className="text-gray-500">Loading users...</span>
        </div>
      );
    }

    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
            {success}
          </div>
        )} 
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{u.name}</td>
                <td className="px-6 py-3">{u.email}</td>
                <td className="px-6 py-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs
                    ${u.role === "admin" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    onClick={() => handleDelete(u._id)}
                    disabled={deleting === u._id}
                    title="Delete user"
                  >
                    {deleting === u._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  export default Users;