// src/admin/sections/Overview.jsx

function Overview() {
  const stats = [
    { label: "Total Users", value: "134", color: "bg-blue-100 text-blue-800" },
    { label: "Files Uploaded", value: "98", color: "bg-green-100 text-green-800" },
    { label: "Insights Generated", value: "42", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`p-6 rounded-lg shadow-sm ${stat.color}`}
        >
          <div className="text-lg font-medium">{stat.label}</div>
          <div className="text-2xl font-bold mt-2">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

export default Overview;