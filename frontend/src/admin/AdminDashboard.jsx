// // src/admin/AdminDashboard.jsx

// import React, { useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminNavbar from "./AdminNavbar";
// import Overview from "./sections/Overview";
// import Users from "./sections/Users";
// import Uploads from "./sections/Uploads";
// import Insights from "./sections/Insights";
// import Settings from "./sections/Settings";
// import FeedbackForm from "../components/FeedbackForm";

// const AdminDashboard = () => {
//   const [selected, setSelected] = useState("Overview");

//   const renderSection = () => {
//     switch (selected) {
//       case "Users":
//         return <Users />;
//       case "Uploads":
//         return <Uploads />;
//       case "Insights":
//         return <Insights />;
//       case "Settings":
//         return <Settings />;
//       case "Support":
//         return <FeedbackForm />;
//       default:
//         return <Overview />;
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-tr from-blue-50 via-white to-blue-100">
//       {/* Sidebar */}
//       <aside className="w-64 hidden md:block shadow-md z-10">
//         <AdminSidebar selected={selected} setSelected={setSelected} />
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex flex-col flex-1">
//         {/* Navbar */}
//         <AdminNavbar />

//         {/* Content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out">
//             <h2 className="text-2xl font-bold text-blue-700 mb-4 capitalize">{selected}</h2>
//             <div className="animate-fade-in">{renderSection()}</div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { api } from "../api/axios"; // adjust path if needed
import "../../styles/admin.css";   // ✅ your CSS
import "../../styles/utils.css";   // ✅ your CSS

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard stats");
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="admin-dashboard">
      {/* ✅ Title styled via admin.css */}
      <h1 className="page-title">Welcome Admin</h1>

      <h2 className="text-2xl font-bold text-blue-700 mb-4 capitalize">
        Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <p className="text-lg font-semibold">Total Users</p>
          <p className="text-3xl font-bold text-blue-700">
            {stats.totalUsers}
          </p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <p className="text-lg font-semibold">Active Users</p>
          <p className="text-3xl font-bold text-green-700">
            {stats.activeUsers}
          </p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <p className="text-lg font-semibold">Recent Activity</p>
          <ul className="mt-2 text-sm">
            {stats.recentActivity && stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((item, idx) => (
                <li key={idx}>
                  {item.action} by {item.userId} at{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </li>
              ))
            ) : (
              <li>No recent activity</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
