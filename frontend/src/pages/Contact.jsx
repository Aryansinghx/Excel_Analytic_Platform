import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { api } from "../api/axios";
import "./contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/contact", form);
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      {/* Hero */}
      <div className="contact__hero">
        <div className="contact__badge">
          <FaEnvelope />
        </div>
        <h1 className="contact__title">Contact Us</h1>
        <p className="contact__lead">
          Have a question, feedback, or need support? Fill out the form below or
          reach out to us directly.
        </p>
      </div>

      {/* Content */}
      <div className="contact__grid">
        {/* Contact Info */}
        <div className="card card--info">
          <div className="info__row">
            <FaEnvelope /> abc@gmail.com
          </div>
          <div className="info__row">
            <FaPhone /> +1 (555) 123-4567
          </div>
          <div className="info__row">
            <FaMapMarkerAlt /> India, IN 10001
          </div>

          <div className="social">
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          {submitted ? (
            <div className="success">
              <FaCheckCircle />
              <div>
                Thank you for reaching out! We'll get back to you soon.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                className="input"
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <textarea
                className="textarea"
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
              />

              {error && <div className="error">{error}</div>}

              <button className="btn" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
