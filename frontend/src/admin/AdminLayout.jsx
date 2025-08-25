// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import AdminNavbar from './AdminNavbar';
// import AdminSidebar from './AdminSidebar';

// export default function AdminLayout() {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <AdminSidebar />
      
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <AdminNavbar />
        
//         <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
//           <div className="max-w-7xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const SECTIONS = [
  "Overview",
  "Users",
  "Uploads",
  "Insights",
  "Settings",
  "Support"
];

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar sections={SECTIONS} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar sections={SECTIONS} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}