// src/App.jsx
import './styles/global.css';
import React from "react";
import { Routes, Route } from "react-router-dom";

// Components and Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/DashboardLayout";
import Contact from './pages/Contact';
import Login from "./pages/Login";       // 👈 added
import Register from "./pages/Register"; // 👈 added

function App() {
  return (
    <>
      {/* This Navbar is the shared layout and will appear on every page */}
      <Navbar />

      {/* The <main> tag is the container where the correct page will be rendered */}
      <main className="main-with-fixed-nav">
        <Routes>
          {/* The router will render the correct page component here based on the URL */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />         {/* 👈 new */}
          <Route path="/register" element={<Register />} />   {/* 👈 new */}
        </Routes>
      </main>
    </>
  );
}

export default App;