// src/components/Footer.jsx
import { Link } from "react-router-dom";
import ExcelAnalyticsLogo from "../assets/ExcelAnalyticsLogo.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-3 text-xs border-t mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2">
          <img src={ExcelAnalyticsLogo} alt="Excel Analytics Logo" className="h-6 w-6" />
          <span className="font-bold">Excel Analytics Platform</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline transition text-gray-300">Home</Link>
          <Link to="/support" className="hover:underline transition text-gray-300">Support</Link>
          <Link to="/terms" className="hover:underline transition text-gray-300">Terms</Link>
          <Link to="/privacy" className="hover:underline transition text-gray-300">Privacy</Link>
        </div>
        <div className="text-gray-400">&copy; {new Date().getFullYear()} Excel Analytics. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;