// // // src/components/Navbar.js
// // import React from "react";
// // import Logo from "../assets/logo1.jpg";  // 👈 importing your logo file

// // function Navbar() {
// //   return (
// //     <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
// //       {/* Left side - Logo */}
// //       {/* <div className="flex items-center">
// //         <img 
// //           src={Logo} 
// //           alt="Excel Analytics Logo" 
// //           className="h-12 w-auto rounded-lg"

// //         />
// //         <span className="ml-3 text-lg font-bold">Excel Analytics</span>
// //       </div> */}
// //       <div className="max-w-7xl mx-auto flex justify-between items-center">
// //         <h1
// //           className="text-xl font-bold tracking-wide cursor-pointer text-black"
// //           onClick={()=>navigate("/dashboard") }
// //         >
// //           Excel-Analytics
// //         </h1>
// //       </div>

// //       {/* Right side - Menu */}
// //       <div className="flex space-x-6">
// //         <a href="/" className="hover:text-gray-400">Home</a>
// //         <a href="/dashboard" className="hover:text-gray-400">Dashboard</a>
// //         <a href="/admin" className="hover:text-gray-400">Admin</a>
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;


// import React from "react";
// import {useNavigate} from "react-router-dom";
// import Logo from "../assets/logo1.jpg";

// function Navbar () {
//   const navigate = useNavigate();

//   return (
//     <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 shadow-md">
//       <div className="flex items-center space-x-3 cursor-pointer" onClick={()=>navigate("/")}>
//         <img src={Logo} alt="Excel-Analytic-Platform" className="logo" />
//         <span className="text-xl font-bold text-blue">Excel Analytics</span>
//         </div>
//         <div className="flex space-x-6">
//           <a href="/" className="text-gray-300 hover:text-blue transition duration-200">Home</a>
//           <a href="/dashboard" className="text-gray-300 hover:text-blue transition duration-200">Dashboard</a>
//           <a href="/admin" className="text-gray-300 hover:text-blue transition duration-200">Admin</a>
//         </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState } from "react"; // 1. Import useState
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo1.jpg";
import '../styles/navbar.css';
import '../styles/utils.css';

function Navbar() {
  const navigate = useNavigate();
  // 2. Create a state variable to track if the menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav__inner">
        {/* Brand */}
        <div className="nav__brand" onClick={() => navigate("/")}>
          <img src={Logo} alt="Excel Analytics" className="nav__logo" />
          <span className="nav__title">Excel Analytics</span>
        </div>

        {/* Desktop menu - now with dynamic class */}
        <nav className={`nav__links ${isMenuOpen ? "is-open" : ""}`}> 
        {/* 4. Apply the 'is-open' class based on the state */}
          <Link to="/" className="nav__link">Home</Link>
          <Link to="/dashboard" className="nav__link">Dashboard</Link>
          <Link to="/admin" className="nav__link nav__link--cta">Admin</Link>
          <Link to="/about" className="nav__link nav__link--cta">About</Link>
        </nav>

        {/* Mobile menu button - now updates state */}
        <button
          className="nav__toggle"
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // 3. Toggle the state on click
        >
          <span className="nav__bar" />
          <span className="nav__bar" />
          <span className="nav__bar" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;