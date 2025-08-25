import React, { useEffect, useState } from "react";
import {api} from "../../api/axios"; // Adjust path if needed

export default function Insights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/insights");
        setInsights(res.data); // Expecting an array of insights
        setLoading(false);
      } catch (err) {
        setError("Failed to load insights");
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <div>Loading insights...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white p-6 rounded shadow text-gray-700">
      <h2 className="text-lg font-bold mb-4">AI Insights Summary</h2>
      <div className="space-y-3 text-sm leading-relaxed">
        {insights && insights.length > 0 ? (
          insights.map((item, index) => (
            <p key={index}>
              <strong>{item.title}:</strong> {item.description}
            </p>
          ))
        ) : (
          <p>No insights available.</p>
        )}
      </div>
    </div>
  );
}