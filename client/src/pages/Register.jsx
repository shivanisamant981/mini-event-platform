import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      {/* Name */}
      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4
                   focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Email */}
      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4
                   focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password */}
      <input
        type="password"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6
                   focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
                   hover:bg-blue-500 transition"
      >
        Register
      </button>

      {/* Login Link */}
      <p className="text-sm text-center text-gray-500 mt-4">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </form>
  </div>
  );
}



