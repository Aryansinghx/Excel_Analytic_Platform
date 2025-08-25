// // src/admin/AdminSidebar.jsx

// import React from "react";
// import {
//   FaChartPie,
//   FaUsers,
//   FaCloudUploadAlt,
//   FaLightbulb,
//   FaCog,
//   FaHeadset,
// } from "react-icons/fa";

// const tabs = [
//   { label: "Overview", icon: <FaChartPie /> },
//   { label: "Users", icon: <FaUsers /> },
//   { label: "Uploads", icon: <FaCloudUploadAlt /> },
//   { label: "Insights", icon: <FaLightbulb /> },
//   { label: "Settings", icon: <FaCog /> },
//   { label: "Support", icon: <FaHeadset /> },
// ];

// const AdminSidebar = ({ selected, setSelected }) => {
//   return (
//     <div className="h-full w-64 bg-blue-600 text-white flex flex-col p-4">
//       <h1 className="text-2xl font-bold mb-8 text-center tracking-wide">
//         Hello, Admin 
//       </h1>

//       <nav className="flex flex-col gap-2">
//         {tabs.map((tab) => (
//           <button
//             key={tab.label}
//             onClick={() => setSelected(tab.label)}
//             className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
//               ${
//                 selected === tab.label
//                   ? "bg-white text-blue-600"
//                   : "hover:bg-blue-500"
//               }`}
//           >
//             <span className="text-lg">{tab.icon}</span>
//             {tab.label}
//           </button>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaCloudUploadAlt,
  FaLightbulb,
  FaCog,
  FaHeadset,
  FaSignOutAlt
} from "react-icons/fa";

const tabs = [
  { label: "Overview", icon: <FaChartPie className="text-lg" />, path: "" },
  { label: "Users", icon: <FaUsers className="text-lg" />, path: "users" },
  { label: "Uploads", icon: <FaCloudUploadAlt className="text-lg" />, path: "uploads" },
  { label: "Insights", icon: <FaLightbulb className="text-lg" />, path: "insights" },
  { label: "Settings", icon: <FaCog className="text-lg" />, path: "settings" },
  { label: "Support", icon: <FaHeadset className="text-lg" />, path: "support" },
];

const AdminSidebar = () => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser")) || { name: "Admin" };
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current path after /admin/
  const currentPath = location.pathname.replace("/admin/", "");

  return (
    <div className="h-full w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white flex flex-col">
      <div className="p-6 border-b border-blue-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-500 p-2 rounded-lg">
            <FaChartPie className="text-xl" />
          </div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-3 bg-blue-600/40 p-3 rounded-lg">
          <div className="bg-blue-500 p-2 rounded-full">
            <img 
              src={adminUser.profilePic || `https://ui-avatars.com/api/?name=${adminUser.name}&background=0ea5e9&color=fff`} 
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{adminUser.name}</p>
            <p className="text-xs text-blue-200">Administrator</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-4 flex-1">
        {tabs.map((tab) => {
          // For Overview, match "" or "/"
          const isActive =
            (tab.path === "" && (currentPath === "" || currentPath === "/")) ||
            (tab.path !== "" && currentPath.startsWith(tab.path));
          return (
            <button
              key={tab.label}
              onClick={() => navigate(`/admin/${tab.path}`)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${isActive ? "bg-white text-blue-700 shadow-md" : "hover:bg-blue-600"}
              `}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
        
        <div className="mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("adminUser");
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium w-full hover:bg-blue-600 text-red-100"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;