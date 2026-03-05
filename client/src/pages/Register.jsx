import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await registerUser(name, email, password);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#0077be" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-2xl shadow-2xl p-10"
          style={{ backgroundColor: "#ffffff" }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: "#0077be" }}
            >
              SkyTravel
            </h1>
            <p className="text-sm font-medium" style={{ color: "#666666" }}>
              Your Journey Starts Here
            </p>
          </div>

          {/* Register Form Title */}
          <h2 className="text-2xl font-bold mb-1" style={{ color: "#0077be" }}>
            Create Account
          </h2>
          <p className="text-sm mb-8" style={{ color: "#999999" }}>
            Join SkyTravel and start booking flights
          </p>

          {/* Error Message */}
          {error && (
            <div
              className="mb-6 p-4 border rounded-xl"
              style={{ backgroundColor: "#ffe8e8", borderColor: "#ff6b6b" }}
            >
              <p style={{ color: "#d32f2f" }} className="text-sm text-center">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#0077be" }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border rounded-lg transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#e0e0e0",
                  backgroundColor: "#f4f4f4",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "0 0 0 2px rgba(0, 119, 190, 0.2)";
                  e.target.style.borderColor = "#0077be";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                  e.target.style.borderColor = "#e0e0e0";
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#0077be" }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#e0e0e0",
                  backgroundColor: "#f4f4f4",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "0 0 0 2px rgba(0, 119, 190, 0.2)";
                  e.target.style.borderColor = "#0077be";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                  e.target.style.borderColor = "#e0e0e0";
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#0077be" }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-3 border rounded-lg transition-all duration-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#e0e0e0",
                  backgroundColor: "#f4f4f4",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "0 0 0 2px rgba(0, 119, 190, 0.2)";
                  e.target.style.borderColor = "#0077be";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                  e.target.style.borderColor = "#e0e0e0";
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 rounded mt-1"
                style={{ borderColor: "#0077be", accentColor: "#0077be" }}
                required
              />
              <label
                htmlFor="terms"
                className="text-sm cursor-pointer"
                style={{ color: "#333333" }}
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium"
                  style={{ color: "#0077be" }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium"
                  style={{ color: "#0077be" }}
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                backgroundColor: isLoading ? "#0077be" : "#ff8c00",
                boxShadow: isLoading
                  ? "0 4px 6px rgba(0, 119, 190, 0.3)"
                  : "0 4px 6px rgba(255, 140, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "#ff9d1a";
                  e.target.style.boxShadow =
                    "0 6px 12px rgba(255, 140, 0, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "#ff8c00";
                  e.target.style.boxShadow = "0 4px 6px rgba(255, 140, 0, 0.3)";
                }
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full"
                style={{ borderTopColor: "#e0e0e0", borderTopWidth: "1px" }}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white" style={{ color: "#999999" }}>
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center" style={{ color: "#666666" }}>
            <span
              className="font-semibold cursor-pointer transition-colors hover:underline"
              style={{ color: "#ff8c00" }}
              onClick={() => navigate("/login")}
            >
              Sign in here
            </span>
          </p>

          {/* Footer */}
          <p
            className="text-center text-xs mt-8 pt-6"
            style={{
              color: "#999999",
              borderTopColor: "#e0e0e0",
              borderTopWidth: "1px",
            }}
          >
            By registering, you agree to our{" "}
            <a
              href="#"
              className="hover:underline"
              style={{ color: "#0077be" }}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="hover:underline"
              style={{ color: "#0077be" }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
