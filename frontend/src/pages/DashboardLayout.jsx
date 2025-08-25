// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import UploadSection from "../components/UploadSection";
// import ChartSection from "../components/ChartSection";
// import Chart3DSection from "../components/Chart3DSection";
// import InsightsSection from "../components/InsightsSection";
// import HistorySection from "../components/HistorySection";
// import api from "../utils/api";

// function DashboardLayout() {
//   const [selected, setSelected] = useState("Upload Excel");
//   const [excelColumns, setExcelColumns] = useState([]);
//   const [excelRows, setExcelRows] = useState([]);
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);

//   // Fetch upload history on mount
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await api.get("/excel/files");
//         setHistory(res.data.files || []);
//       } catch (err) {
//         console.error("❌ Failed to load history", err);
//         setError("Failed to fetch files.");
//       }
//     };
//     fetchHistory();
//   }, []);

//   const renderSection = () => {
//     switch (selected) {
//       case "Upload Excel":
//         return (
//           <UploadSection
//             setExcelColumns={setExcelColumns}
//             setExcelRows={setExcelRows}
//           />
//         );
//       case "Chart Viewer":
//         return (
//           <ChartSection
//             columns={excelColumns}
//             rows={excelRows}
//           />
//         );
//       case "3D Chart Viewer":
//         return (
//           <Chart3DSection
//             columns={excelColumns}
//             rows={excelRows}
//           />
//         );
//       case "AI Insights":
//         return (
//           <InsightsSection
//             columns={excelColumns}
//             rows={excelRows}
//           />
//         );
//       case "Upload History":
//         return <HistorySection history={history} />;
//       default:
//         return <UploadSection />;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar selected={selected} setSelected={setSelected} />
//         <div className="flex-1 p-6 overflow-y-auto">{renderSection()}</div>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;

// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import UploadSection from "../components/UploadSection";
// import ChartSection from "../components/ChartSection";
// import Chart3DSection from "../components/Chart3DSection";
// import InsightsSection from "../components/InsightsSection";
// import HistorySection from "../components/HistorySection";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// function DashboardLayout() {
//   const [selected, setSelected] = useState("Upload Excel");
//   const [excelColumns, setExcelColumns] = useState([]);
//   const [excelRows, setExcelRows] = useState([]);
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);
//   const [fileId, setFileId] = useState(null); // Track uploaded file ID
//   const [insights, setInsights] = useState(null); // Store AI insights
//   const [loadingInsights, setLoadingInsights] = useState(false); // Loading state

//   // Fetch upload history on mount
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await api.get("/excel/files");
//         setHistory(res.data.files || []);
//       } catch (err) {
//         console.error("❌ Failed to load history", err);
//         setError("Failed to fetch files.");
//       }
//     };
//     fetchHistory();
//   }, []);

//   // Function to fetch AI insights
//   const handleGetAIInsight = async () => {
//     if (!fileId) {
//       toast.error('Please upload a file first');
//       return;
//     }

//     setLoadingInsights(true);
//     try {
//       const response = await api.get(`/excel/files/${fileId}/insights`);
//       setInsights(response.data.insights);
//       setSelected('AI Insights');
//       toast.success('AI insights generated');
//     } catch (error) {
//       console.error('Failed to get AI insights:', error);
//       toast.error('Failed to generate AI insights');
//     } finally {
//       setLoadingInsights(false);
//     }
//   };

//   const renderSection = () => {
//     switch (selected) {
//       case "Upload Excel":
//         return (
//           <UploadSection
//             setExcelColumns={setExcelColumns}
//             setExcelRows={setExcelRows}
//             setFileId={setFileId} // Pass setFileId to capture uploaded file ID
//           />
//         );
//       case "Chart Viewer":
//         return (
//           <ChartSection
//             columns={excelColumns}
//             rows={excelRows}
//           />
//         );
//       case "3D Chart Viewer":
//         return (
//           <Chart3DSection
//             columns={excelColumns}
//             rows={excelRows}
//           />
//         );
//       case "AI Insights":
//         return (
//           <InsightsSection
//             insights={insights}
//             loading={loadingInsights}
//             onRetry={handleGetAIInsight}
//           />
//         );
//       case "Upload History":
//         return <HistorySection history={history} />;
//       default:
//         return <UploadSection />;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar selected={selected} setSelected={setSelected} />
//         <div className="flex-1 p-6 overflow-y-auto">
//           {/* AI Insight button - shows when data is available and not in AI Insights view */}
//           {excelColumns.length > 0 && selected !== 'AI Insights' && (
//             <div className="mb-4 flex justify-end">
//               <button
//                 onClick={handleGetAIInsight}
//                 disabled={loadingInsights}
//                 className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center"
//               >
//                 {loadingInsights ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Generating Insights...
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
//                     </svg>
//                     Get AI Insight
//                   </>
//                 )}
//               </button>
//             </div>
//           )}
          
//           {renderSection()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;

// import { useState, useEffect } from "react";
// import "../styles/dashboard.css"
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import UploadSection from "../components/UploadSection";
// import ChartSection from "../components/ChartSection";
// import Chart3DSection from "../components/Chart3DSection";
// import InsightsSection from "../components/InsightsSection";
// import HistorySection from "../components/HistorySection";
// import {api} from "../utils/api";
// import toast from "react-hot-toast";

// function DashboardLayout() {
//   const [selected, setSelected] = useState("Upload Excel");
//   const [excelColumns, setExcelColumns] = useState([]);
//   const [excelRows, setExcelRows] = useState([]);
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);
//   const [fileId, setFileId] = useState(null);
//   const [insights, setInsights] = useState(null);
//   const [loadingInsights, setLoadingInsights] = useState(false);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await api.get("/excel/files");
//         setHistory(res.data.files || []);
//       } catch (err) {
//         console.error("❌ Failed to load history", err);
//         setError("Failed to fetch files.");
//       }
//     };
//     fetchHistory();
//   }, []);

//   const handleGetAIInsight = async () => {
//     if (!fileId) {
//       toast.error('Please upload a file first');
//       return;
//     }

//     setLoadingInsights(true);
//     try {
//       const response = await api.get(`/excel/files/${fileId}/insights`);
//       setInsights(response.data.insights);
//       setSelected('AI Insights');
//       toast.success('AI insights generated');
//     } catch (error) {
//       console.error('Failed to get AI insights:', error);
//       toast.error('Failed to generate AI insights');
//     } finally {
//       setLoadingInsights(false);
//     }
//   };

//   const renderSection = () => {
//     switch (selected) {
//       case "Upload Excel":
//         return (
//           <UploadSection
//             setExcelColumns={setExcelColumns}
//             setExcelRows={setExcelRows}
//             setFileId={setFileId}
//           />
//         );
//       case "Chart Viewer":
//         return (
//           <ChartSection
//             columns={excelColumns || []}
//             rows={excelRows || []}
//           />
//         );
//       case "3D Chart Viewer":
//         return (
//           <Chart3DSection
//             columns={excelColumns || []}
//             rows={excelRows || []}
//           />
//         );
//       case "AI Insights":
//         return (
//           <InsightsSection
//             insights={insights}
//             loading={loadingInsights}
//             onRetry={handleGetAIInsight}
//           />
//         );
//       // case "Upload History":
//       //   return <HistorySection history={history} />;
//       // default:
//       //   return <UploadSection />;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar selected={selected} setSelected={setSelected} />
//         <div className="flex-1 p-6 overflow-y-auto">
//           {/* Safeguard against undefined arrays */}
//           {(excelColumns?.length > 0 || selected === 'AI Insights') && selected !== 'Upload Excel' && (
//             <div className="mb-4 flex justify-end">
//               <button
//                 onClick={handleGetAIInsight}
//                 disabled={loadingInsights}
//                 className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center"
//               >
//                 {loadingInsights ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Generating Insights...
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
//                     </svg>
//                     Get AI Insight
//                   </>
//                 )}
//               </button>
//             </div>
//           )}
          
//           {renderSection()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;


import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UploadSection from "../components/UploadSection";
import ChartSection from "../components/ChartSection";
import Chart3DSection from "../components/Chart3DSection";
import InsightsSection from "../components/InsightsSection";
// import HistorySection from "../components/HistorySection";
import { api } from "../utils/api";
import toast from "react-hot-toast";

function DashboardLayout() {
  const [selected, setSelected] = useState("Upload Excel");
  const [excelColumns, setExcelColumns] = useState([]);
  const [excelRows, setExcelRows] = useState([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [fileId, setFileId] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/excel/files");
        setHistory(res.data.files || []);
      } catch (err) {
        console.error("Failed to load history", err);
        setError("Failed to fetch files.");
      }
    };
    fetchHistory();
  }, []);

  const handleGetAIInsight = async () => {
    if (!fileId) {
      toast.error("Please upload a file first");
      return;
    }
    setLoadingInsights(true);
    try {
      const response = await api.get(`/excel/files/${fileId}/insights`);
      setInsights(response.data.insights);
      setSelected("AI Insights");
      toast.success("AI insights generated");
    } catch (error) {
      console.error("Failed to get AI insights:", error);
      toast.error("Failed to generate AI insights");
    } finally {
      setLoadingInsights(false);
    }
  };

  const renderSection = () => {
    switch (selected) {
      case "Upload Excel":
        return (
          <section className="dashboard-card col-12">
            <div className="card__head">
              <h3 className="card__title">Upload Your Excel File</h3>
              <span className="pill">CSV/XLSX</span>
            </div>
            <UploadSection
              setExcelColumns={setExcelColumns}
              setExcelRows={setExcelRows}
              setFileId={setFileId}
            />
          </section>
        );
      case "Chart Viewer":
        return (
          <section className="dashboard-card col-12">
            <div className="card__head">
              <h3 className="card__title">Chart Viewer</h3>
            </div>
            <ChartSection columns={excelColumns || []} rows={excelRows || []} />
          </section>
        );
      case "3D Chart Viewer":
        return (
          <section className="dashboard-card col-12">
            <div className="card__head">
              <h3 className="card__title">3D Chart Viewer</h3>
            </div>
            <Chart3DSection columns={excelColumns || []} rows={excelRows || []} />
          </section>
        );
      case "AI Insights":
        return (
          <section className="dashboard-card col-12">
            <div className="card__head">
              <h3 className="card__title">AI Insights</h3>
            </div>
            <InsightsSection
              insights={insights}
              loading={loadingInsights}
              onRetry={handleGetAIInsight}
            />
          </section>
        );
      // case "Upload History":
      //   return (
      //     <section className="dashboard-card col-12">
      //       <div className="card__head">
      //         <h3 className="card__title">Upload History</h3>
      //       </div>
      //       <HistorySection history={history} />
      //     </section>
      //   );
      default:
        return (
          <section className="dashboard-card col-12">
            <UploadSection
              setExcelColumns={setExcelColumns}
              setExcelRows={setExcelRows}
              setFileId={setFileId}
            />
          </section>
        );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        {/* Optional header bar inside the page */}
        <div className="dashboard__header">
          <div>
            <h1 className="dashboard__title">Dashboard</h1>
            <p className="dashboard__subtitle">
              Upload, visualize, and analyze your Excel data
            </p>
          </div>

          {(excelColumns?.length > 0 || selected === "AI Insights") &&
            selected !== "Upload Excel" && (
              <div className="toolbar">
                <button
                  onClick={handleGetAIInsight}
                  disabled={loadingInsights}
                  className="btn btn--primary"
                >
                  {loadingInsights ? "Generating..." : "Get AI Insight"}
                </button>
              </div>
            )}
        </div>

        <div className="dashboard__grid">
          {/* Left sidebar + content layout */}
          <section className="col-3">
            <div className="dashboard-card">
              <div className="card__head">
                <h3 className="card__title">Navigation</h3>
              </div>
              <Sidebar selected={selected} setSelected={setSelected} />
            </div>
          </section>

          <section className="col-9">
            <div className="dashboard__grid">
              {/* Render the selected section as a card within right area */}
              {renderSection()}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
