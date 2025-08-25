// src/components/AIInsights.jsx
import React from "react";
import Lottie from "lottie-react";
import aiAnimation from "../assets/ai.json";

const AIInsights = () => {
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800"> AI Insights</h2>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Left: Lottie Animation */}
        <div className="max-w-md mx-auto">
          <Lottie animationData={aiAnimation} loop={true} />
        </div>

        {/* Right: Dummy AI summary (replace with real API data later) */}
        <div className="bg-gray-50 p-4 rounded shadow text-gray-700 space-y-3">
          <h3 className="text-xl font-semibold text-blue-600">Summary Report</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>Uploaded data contains 5,000+ records.</li>
            <li>Top category: "Sales" in Q4 2024.</li>
            <li>Anomaly detected in Q2 with 40% drop.</li>
            <li>Revenue trends are upward in the last 3 quarters.</li>
            <li>Recommendation: Target product 'Z' in next quarter.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;