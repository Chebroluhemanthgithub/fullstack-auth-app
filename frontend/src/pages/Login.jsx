import API from "../utils/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // --- Original state and functions remain unchanged ---
  const [form, setForm] = useState({ email: "", password: "" }); // Renamed 'email' to 'username' for placeholder consistency
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      // NOTE: You might need to adjust 'email' to 'username' in the form state and API call
      // if your backend expects 'username' instead of 'email' based on the UI.
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. Full screen background color (Dark Teal)
    <div className="min-h-screen flex items-center justify-center bg-[#008080] bg-gradient-to-br from-[#008080] to-[#00CED1]">
      {/* 2. Main Card Container (Dark Navy) */}
      <div className="w-full max-w-sm mx-auto rounded-lg shadow-2xl overflow-hidden bg-[#1f2937] p-0">
        
        {/* Sign In Header (Bright Teal) */}
        <div className="text-center">
          <h1 className="text-xl font-bold bg-[#00CED1] text-[#1f2937] py-3 tracking-wider">
            SIGN IN
          </h1>
        </div>

        {/* User Icon Section */}
        <div className="py-8 px-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#374151] flex items-center justify-center mb-6">
            {/* Simple User Icon (You might use an actual SVG/Icon component here) */}
            <svg
              className="w-12 h-12 text-[#9CA3AF]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Username Input Field (Styled for dark theme) */}
            <div className="relative">
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text" // Changed to 'text' for 'username' placeholder, ensure it matches your backend
                name="email" // Keeping name as 'email' to match state, but UX is 'username'
                value={form.email}
                onChange={handleChange}
                // Dark input field with light placeholder text
                className="w-full pl-10 pr-4 py-3 bg-[#374151] border-none rounded-lg text-white placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#00CED1] outline-none"
                placeholder="username"
                required
              />
            </div>

            {/* Password Input Field (Styled for dark theme) */}
            <div className="relative">
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                // Dark input field with light placeholder text
                className="w-full pl-10 pr-4 py-3 bg-[#374151] border-none rounded-lg text-white placeholder-[#9CA3AF] focus:ring-1 focus:ring-[#00CED1] outline-none"
                placeholder="password"
                required
              />
            </div>
            
            {/* Remember Me & Forgot Password Links */}
            <div className="flex justify-between items-center text-xs pt-1">
                <div className="flex items-center">
                    <input type="checkbox" id="remember-me" className="form-checkbox h-3 w-3 text-[#00CED1] rounded bg-transparent border-gray-500 focus:ring-[#00CED1]"/>
                    <label htmlFor="remember-me" className="ml-1 text-[#00CED1]">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-[#00CED1] hover:text-[#9CA3AF]">
                    Forgot your password?
                </Link>
            </div>

            {/* Login Button (Bright Teal) */}
            <button
              type="submit"
              className="w-full bg-[#00CED1] text-[#1f2937] font-bold py-3 rounded-lg mt-6 hover:bg-[#00B0B3] transition-colors"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          {/* This section is not in the image but remains for navigation */}
          <p className="text-sm text-[#9CA3AF] text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#00CED1] hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}