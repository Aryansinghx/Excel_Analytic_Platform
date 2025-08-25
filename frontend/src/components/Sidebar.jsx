function Sidebar({ selected, setSelected }) {
  const menu = [
    "Upload Excel",
    "Chart Viewer",
    "3D Chart Viewer",
    "AI Insights",
    // "Upload History",
  ];

  return (
    <div className="w-64 bg-gray-100 min-h-screen px-4 py-6 space-y-3 shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Dashboard</h2>
      {menu.map((item, index) => (
        <div
          key={index}
          onClick={() => setSelected(item)}
          className={`p-2 rounded cursor-pointer transition ${
            selected === item
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;