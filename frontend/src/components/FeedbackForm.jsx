// src/components/FeedbackForm.jsx
import React, { useState } from "react";
import { FaRegCommentDots, FaBug, FaLightbulb, FaHeadset } from "react-icons/fa";

const typeOptions = [
  { label: "Support", icon: <FaHeadset className="inline mr-1 text-blue-600" /> },
  { label: "Feedback", icon: <FaRegCommentDots className="inline mr-1 text-emerald-600" /> },
  { label: "Bug Report", icon: <FaBug className="inline mr-1 text-red-500" /> },
  { label: "Feature Request", icon: <FaLightbulb className="inline mr-1 text-yellow-500" /> },
];

const FeedbackForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    type: "Support",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 📤 TODO: Connect to backend API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "", type: "Support" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-2">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h2 className="text-3xl font-bold mb-6 text-emerald-700 flex items-center gap-2">
          <FaHeadset className="text-2xl text-blue-600" /> Support & Feedback
        </h2>
        {submitted && (
          <div className="mb-4 p-3 rounded bg-emerald-50 text-emerald-700 text-center font-semibold border border-emerald-200">
            ✅ Thank you for your feedback!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 border px-3 py-2 rounded focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 border px-3 py-2 rounded focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Type</label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {typeOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.label}
                  className={`flex items-center px-3 py-1 rounded-full border text-sm font-medium transition-all duration-150 focus:outline-none ${form.type === opt.label ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-emerald-50'}`}
                  onClick={() => setForm({ ...form, type: opt.label })}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Message</label>
            <textarea
              name="message"
              required
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2 rounded focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-700 text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-emerald-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;