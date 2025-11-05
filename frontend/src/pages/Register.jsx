import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api"; // Use real backend API

// --- InputField Component ---
const InputField = React.memo(({ label, name, type, value, onChange, icon }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      required
      className="w-full pl-10 pr-4 py-3 bg-gray-700 border-none rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-teal-400 outline-none transition-colors"
    />
  </div>
));

export default function Register() {
  const [form, setForm] = useState({ name: "", dob: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call real backend API
      const res = await API.post("/auth/register", form);

      // Save login session only if registration succeeds
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      // Handle backend errors properly
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const DARK_NAVY = "#1f2937";
  const ACCENT_TEAL = "#00CED1";
  const DARK_TEAL_GRADIENT = "bg-gradient-to-br from-teal-800 to-teal-400";

  return (
    <div className={`min-h-screen flex items-center justify-center ${DARK_TEAL_GRADIENT} p-4`}>
      <div
        className="w-full max-w-md mx-auto rounded-xl shadow-2xl overflow-hidden p-0 transform transition-all duration-300 hover:scale-[1.01]"
        style={{ backgroundColor: DARK_NAVY }}
      >
        <div className="text-center">
          <h1
            className="text-xl font-extrabold py-3 tracking-widest"
            style={{ backgroundColor: ACCENT_TEAL, color: DARK_NAVY }}
          >
            CREATE ACCOUNT
          </h1>
        </div>

        <div className="py-8 px-8 flex flex-col items-center">
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              }
            />

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border-none rounded-lg text-white appearance-none focus:ring-1 focus:ring-teal-400 outline-none transition-colors"
              />
            </div>

            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              }
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-3 rounded-lg mt-6 hover:bg-teal-500 transition-colors shadow-lg uppercase tracking-widest"
              style={{ backgroundColor: ACCENT_TEAL, color: DARK_NAVY }}
            >
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-400 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
