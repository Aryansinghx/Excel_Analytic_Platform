import React, { useRef, useState } from "react";
import { Bar, Line, Pie, Doughnut, Radar, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

const ChartSection = ({ columns, rows }) => {
  const chartRef = useRef();
  const chartContainerRef = useRef();

  const [xAxis, setXAxis] = useState(columns[0] || "");
  const [yAxis1, setYAxis1] = useState(columns[1] || "");
  const [yAxis2, setYAxis2] = useState(columns[2] || "");
  const [chartType, setChartType] = useState("bar");
  const [yColor1, setYColor1] = useState("#3b82f6");
  const [yColor2, setYColor2] = useState("#f97316");
  const [aiSummary] = useState("");
  // const [loading, setLoading] = useState(false);

  const xLabels = rows.map((row) => String(row[xAxis]));
  const yValues1 = rows.map((row) => parseFloat(row[yAxis1]) || 0);
  const yValues2 = rows.map((row) => parseFloat(row[yAxis2]) || 0);

  const chartData = {
    labels: xLabels,
    datasets:
      chartType === "pie"
        ? [
            {
              label: yAxis1,
              data: yValues1,
              backgroundColor: xLabels.map(
                (_, i) => `hsl(${(i * 360) / xLabels.length}, 70%, 60%)`
              ),
              borderColor: "#fff",
              borderWidth: 1,
            },
          ]
        : [
            {
              label: yAxis1,
              data: yValues1,
              backgroundColor: yColor1,
              borderColor: yColor1,
              borderWidth: 2,
              tension: 0.4,
            },
            {
              label: yAxis2,
              data: yValues2,
              backgroundColor: yColor2,
              borderColor: yColor2,
              borderWidth: 2,
              tension: 0.4,
            },
          ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutElastic",
    },
    plugins: {
      legend: { display: true, position: "bottom" },
      tooltip: { enabled: true },
    },
  };

  // const fetchAiSummary = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("token");
  //     const res = await axios.post(
  //       "/excel/insights",
  //       { xAxis, yAxis: yAxis1, rows },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setAiSummary(res.data.summary || "No summary available");
  //   } catch (err) {
  //     toast.error("Failed to fetch AI insight");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const downloadAsPNG = async () => {
    const canvas = await html2canvas(chartContainerRef.current);
    const link = document.createElement("a");
    link.download = `${chartType}-chart.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadAsPDF = async () => {
    const canvas = await html2canvas(chartContainerRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${chartType}-chart.pdf`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📊 Chart Visualization</h2>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">Chart Type</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="bar">📊 Bar</option>
            <option value="line">📈 Line</option>
            <option value="pie">🍩 Pie (Y1 only)</option>
            <option value="doughnut">🍩 Doughnut (Y1 only)</option>
            <option value="radar">📡 Radar (Y1 only)</option>
            <option value="scatter">🔬 Scatter (Y1/Y2)</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">X Axis</label>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            {columns.map((col) => (
              <option key={col}>{col}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Y Axis 1</label>
          <select
            value={yAxis1}
            onChange={(e) => setYAxis1(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            {columns.map((col) => (
              <option key={col}>{col}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Y Axis 2</label>
          <select
            value={yAxis2}
            onChange={(e) => setYAxis2(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            {columns.map((col) => (
              <option key={col}>{col}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Color Pickers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-xs text-gray-500">Y1 Color</label>
          <input
            type="color"
            value={yColor1}
            onChange={(e) => setYColor1(e.target.value)}
            className="w-full h-8"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Y2 Color</label>
          <input
            type="color"
            value={yColor2}
            onChange={(e) => setYColor2(e.target.value)}
            className="w-full h-8"
          />
        </div>
      </div>

      {/* Chart Display */}
      <div ref={chartContainerRef} className="bg-gray-50 p-6 rounded shadow-sm mb-6">
        {chartType === "bar" && <Bar ref={chartRef} data={chartData} options={chartOptions} />}
        {chartType === "line" && <Line ref={chartRef} data={chartData} options={chartOptions} />}
        {chartType === "pie" && <Pie ref={chartRef} data={chartData} options={chartOptions} />}
        {chartType === "doughnut" && <Doughnut ref={chartRef} data={chartData} options={chartOptions} />}
        {chartType === "radar" && <Radar ref={chartRef} data={chartData} options={chartOptions} />}
        {chartType === "scatter" && <Scatter ref={chartRef} data={{
          datasets: [
            {
              label: `${yAxis1} vs ${yAxis2}`,
              data: rows.map(row => ({ x: parseFloat(row[yAxis1]) || 0, y: parseFloat(row[yAxis2]) || 0 })),
              backgroundColor: yColor1,
            },
          ],
        }} options={chartOptions} />}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={downloadAsPNG}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          📥 Download PNG
        </button>
        <button
          onClick={downloadAsPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          📄 Download PDF
        </button>
        {/* <button
          onClick={fetchAiSummary}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          🤖 {loading ? "Analyzing..." : "Get AI Insight"}
        </button> */}
      </div>

      {aiSummary && (
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-blue-700 rounded">
          <strong>AI Insight:</strong> {aiSummary}
        </div>
      )}
    </div>
  );
};

export default ChartSection;