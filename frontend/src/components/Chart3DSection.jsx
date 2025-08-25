// // src/components/Chart3DSection.jsx
// import React, { useRef, useState } from "react";
// import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

// const Bar = ({ x, y, height, color }) => {
//   const mesh = useRef();
//   return (
//     <mesh ref={mesh} position={[x, height / 2, y]}>
//       <boxGeometry args={[0.8, height, 0.8]} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };

// const Line = ({ points, color }) => {
//   const geometry = new THREE.BufferGeometry().setFromPoints(points);
//   return (
//     <line geometry={geometry}>
//       <lineBasicMaterial attach="material" color={color} linewidth={2} />
//     </line>
//   );
// };

// const Chart3DSection = ({ columns, rows }) => {
//   const [chartType, setChartType] = useState("bar"); // bar | pie | line | doughnut | scatter
//   const [xAxis, setXAxis] = useState(columns[0]);
//   const [yAxis, setYAxis] = useState(columns[1]);
//   const [xColor, setXColor] = useState("#4287f5");
//   const [yColor, setYColor] = useState("#f54291");

//   const xValues = rows.map((row) => row[xAxis]);
//   const yValues = rows.map((row) => parseFloat(row[yAxis]) || 0);

//   return (
//     <div className="p-6 bg-white rounded shadow-md w-full max-w-6xl mx-auto">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">📈 3D Chart Viewer</h2>

//       {/* Chart controls */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div>
//           <label className="text-sm font-medium text-gray-600">Chart Type</label>
//           <select
//             value={chartType}
//             onChange={(e) => setChartType(e.target.value)}
//             className="w-full p-2 border rounded mt-1"
//           >
//             <option value="bar">Bar Chart</option>
//             <option value="line">Line Chart</option>
//             <option value="pie">Pie Chart</option>
//             <option value="doughnut">Doughnut Chart</option>
//             <option value="scatter">Scatter Chart</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium text-gray-600">X-Axis</label>
//           <select
//             value={xAxis}
//             onChange={(e) => setXAxis(e.target.value)}
//             className="w-full p-2 border rounded mt-1"
//           >
//             {columns.map((col) => (
//               <option key={col} value={col}>
//                 {col}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium text-gray-600">Y-Axis</label>
//           <select
//             value={yAxis}
//             onChange={(e) => setYAxis(e.target.value)}
//             className="w-full p-2 border rounded mt-1"
//           >
//             {columns.map((col) => (
//               <option key={col} value={col}>
//                 {col}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-2 gap-2 mt-1">
//           <div>
//             <label className="text-xs text-gray-500">X Color</label>
//             <input
//               type="color"
//               value={xColor}
//               onChange={(e) => setXColor(e.target.value)}
//               className="w-full h-8 border"
//             />
//           </div>
//           <div>
//             <label className="text-xs text-gray-500">Y Color</label>
//             <input
//               type="color"
//               value={yColor}
//               onChange={(e) => setYColor(e.target.value)}
//               className="w-full h-8 border"
//             />
//           </div>
//         </div>
//       </div>

//       {/* 3D Canvas */}
//       <div className="w-full h-[500px] bg-gray-50 rounded">
//         <Canvas shadows>
//           <ambientLight intensity={0.6} />
//           <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
//           <PerspectiveCamera makeDefault position={[10, 12, 15]} />
//           <OrbitControls />

//           {/* Chart types rendering */}
//           {chartType === "bar" &&
//             xValues.map((label, index) => (
//               <Bar
//                 key={index}
//                 x={index * 1.5}
//                 y={0}
//                 height={yValues[index]}
//                 color={yColor}
//               />
//             ))}

//           {chartType === "line" && (
//             <Line
//               points={xValues.map((_, index) => [index * 1.5, yValues[index], 0])}
//               color={xColor}
//             />
//           )}

//           {chartType === "pie" && (
//             <mesh>
//               <torusGeometry args={[5, 2, 16, 100]} />
//               <meshStandardMaterial color={xColor} />
//             </mesh>
//           )}

//           {chartType === "doughnut" && (
//             <mesh>
//               <torusGeometry args={[5, 1, 16, 100]} />
//               <meshStandardMaterial color={yColor} />
//             </mesh>
//           )}

//           {chartType === "scatter" && (
//             <group>
//               {xValues.map((_, i) => (
//                 <mesh key={i} position={[parseFloat(xValues[i]) || 0, parseFloat(yValues[i]) || 0, 0]}>
//                   <sphereGeometry args={[0.2, 16, 16]} />
//                   <meshStandardMaterial color={xColor} />
//                 </mesh>
//               ))}
//             </group>
//           )}
//         </Canvas>
//       </div>
//     </div>
//   );
// };

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const Bar = ({ x, y, height, color }) => {
  const mesh = useRef();
  return (
    <mesh ref={mesh} position={[x, height / 2, y]}>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Line = ({ points, color }) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={2} />
    </line>
  );
};

const Chart3DSection = ({ columns = [], rows = [] }) => {
  // Safeguard against undefined props
  const safeColumns = Array.isArray(columns) ? columns : [];
  const safeRows = Array.isArray(rows) ? rows : [];
  
  // Initialize state with safeguards
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState(safeColumns[0] || '');
  const [yAxis, setYAxis] = useState(safeColumns[1] || '');
  const [xColor, setXColor] = useState("#4287f5");
  const [yColor, setYColor] = useState("#f54291");

  // Safely extract values with fallbacks
  const xValues = safeRows.map((row) => row[xAxis] || '');
  const yValues = safeRows.map((row) => {
    const val = parseFloat(row[yAxis]);
    return isNaN(val) ? 0 : val;
  });

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">📈 3D Chart Viewer</h2>

      {/* Chart controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-600">Chart Type</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="doughnut">Doughnut Chart</option>
            <option value="scatter">Scatter Chart</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">X-Axis</label>
          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            disabled={safeColumns.length === 0}
          >
            {safeColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Y-Axis</label>
          <select
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            disabled={safeColumns.length === 0}
          >
            {safeColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <div>
            <label className="text-xs text-gray-500">X Color</label>
            <input
              type="color"
              value={xColor}
              onChange={(e) => setXColor(e.target.value)}
              className="w-full h-8 border"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Y Color</label>
            <input
              type="color"
              value={yColor}
              onChange={(e) => setYColor(e.target.value)}
              className="w-full h-8 border"
            />
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-[500px] bg-gray-50 rounded">
        {safeColumns.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No data available. Please upload an Excel file first.
          </div>
        ) : (
          <Canvas shadows>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <PerspectiveCamera makeDefault position={[10, 12, 15]} />
            <OrbitControls />

            {/* Chart types rendering */}
            {chartType === "bar" &&
              xValues.map((label, index) => (
                <Bar
                  key={index}
                  x={index * 1.5}
                  y={0}
                  height={yValues[index]}
                  color={yColor}
                />
              ))}

            {chartType === "line" && (
              <Line
                points={xValues.map((_, index) => [index * 1.5, yValues[index], 0])}
                color={xColor}
              />
            )}

            {chartType === "pie" && (
              <mesh>
                <torusGeometry args={[5, 2, 16, 100]} />
                <meshStandardMaterial color={xColor} />
              </mesh>
            )}

            {chartType === "doughnut" && (
              <mesh>
                <torusGeometry args={[5, 1, 16, 100]} />
                <meshStandardMaterial color={yColor} />
              </mesh>
            )}

            {chartType === "scatter" && (
              <group>
                {xValues.map((_, i) => (
                  <mesh 
                    key={i} 
                    position={[
                      parseFloat(xValues[i]) || 0, 
                      parseFloat(yValues[i]) || 0, 
                      0
                    ]}
                  >
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color={xColor} />
                  </mesh>
                ))}
              </group>
            )}
          </Canvas>
        )}
      </div>
    </div>
  );
};

export default Chart3DSection;

// export default Chart3DSection;