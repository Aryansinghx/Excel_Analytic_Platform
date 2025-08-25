// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import authHeader from "../api/authHeader";

// function InsightsSection({ columns, rows }) {
//   const [insight, setInsight] = useState("");

//   useEffect(() => {
//     if (!rows.length || !columns.length) return;

//     const fetchInsights = async () => {
//       try {
//         const res = await axios.post(
//           "/openai/insights",
//           { columns, rows },
//           { headers: authHeader() }
//         );
//         setInsight(res.data.summary);
//       } catch (err) {
//         console.error("Error fetching insights", err);
//         setInsight("Failed to generate insights.");
//       }
//     };

//     fetchInsights();
//   }, [columns, rows]);

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">🧠 AI Insights</h2>
//       <div className="bg-gray-100 p-4 rounded text-gray-700 whitespace-pre-wrap min-h-[200px]">
//         {insight || "Generating insights..."}
//       </div>
//     </div>
//   );
// }

// export default InsightsSection;

import { useState, useEffect } from "react";
import {api} from "../api/axios";
import authHeader from "../api/authHeader";

function InsightsSection({ insights, loading, onRetry }) {
  // State for manual insight generation
  const [customPrompt, setCustomPrompt] = useState("");
  const [customInsight, setCustomInsight] = useState("");
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);

  const handleCustomInsight = async () => {
    if (!customPrompt.trim()) return;
    
    setIsGeneratingCustom(true);
    try {
      const res = await api.post(
        "/openai/custom-insight",
        { prompt: customPrompt },
        { headers: authHeader() }
      );
      setCustomInsight(res.data.insight);
    } catch (err) {
      console.error("Error generating custom insight", err);
      setCustomInsight("Failed to generate custom insight.");
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">📊 AI Insights</h2>
      
      {/* Main Insights Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Automated Data Analysis</h3>
          <button
            onClick={onRetry}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Regenerating..." : "🔄 Regenerate Insights"}
          </button>
        </div>
        
        {loading ? (
          <div className="bg-gray-100 p-6 rounded flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-600 mr-3"></div>
            <span>Generating insights...</span>
          </div>
        ) : insights ? (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">📋 Summary</h4>
              <p className="text-gray-700">{insights.summary}</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">🔍 Key Findings</h4>
              <ul className="list-disc list-inside space-y-1">
                {insights.keyFindings.map((finding, index) => (
                  <li key={index} className="text-gray-700">{finding}</li>
                ))}
              </ul>
            </div>
            
            {insights.statisticalOverview && Object.keys(insights.statisticalOverview).length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">📈 Statistical Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(insights.statisticalOverview).map(([column, stats]) => (
                    <div key={column} className="bg-white p-3 rounded border">
                      <h5 className="font-medium">{column}</h5>
                      <ul className="mt-1 space-y-1">
                        <li>Average: {stats.average}</li>
                        <li>Minimum: {stats.minimum}</li>
                        <li>Maximum: {stats.maximum}</li>
                        {stats.total && <li>Total: {stats.total}</li>}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">💡 Recommendations</h4>
              <ul className="list-disc list-inside space-y-1">
                {insights.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-700">{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 p-6 rounded text-center">
            <p className="text-gray-600 mb-4">No insights generated yet</p>
            <button 
              onClick={onRetry}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Generate Insights
            </button>
          </div>
        )}
      </div>
      
      {/* Custom Insight Section */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">🔮 Custom Insight Request</h3>
        <div className="mb-4">
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Ask specific questions about your data (e.g., 'What's the correlation between sales and region?')"
            className="w-full p-3 border rounded-md min-h-[100px]"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleCustomInsight}
            disabled={isGeneratingCustom}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isGeneratingCustom ? "Generating..." : "Generate Custom Insight"}
          </button>
          <button
            onClick={() => {
              setCustomPrompt("");
              setCustomInsight("");
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        </div>
        
        {customInsight && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">✨ Custom Insight:</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{customInsight}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InsightsSection;