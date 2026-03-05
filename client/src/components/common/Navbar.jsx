import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-10 h-10 rounded-lg transition-transform duration-300 group-hover:scale-110"
            style={{ background: "linear-gradient(135deg, #0077be, #ff8c00)" }}
          ></div>
          <span
            className="text-2xl font-bold transition-colors duration-300"
            style={{ color: "#0077be" }}
          >
            SkyTravel
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {user && (
            <>
              <Link
                to="/search-flights"
                className="font-medium transition-all duration-300 relative group"
                style={{ color: "#0077be" }}
              >
                Search Flights
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "#ff8c00" }}
                ></span>
              </Link>

              <Link
                to="/my-bookings"
                className="font-medium transition-all duration-300 relative group"
                style={{ color: "#0077be" }}
              >
                My Bookings
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "#ff8c00" }}
                ></span>
              </Link>
            </>
          )}

          {/* Admin link */}
          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className="font-medium transition-all duration-300 relative group"
              style={{ color: "#0077be" }}
            >
              Admin Dashboard
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "#ff8c00" }}
              ></span>
            </Link>
          )}

          {/* Auth Buttons */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-6 py-2 rounded-lg font-semibold transition-all duration-300"
                style={{
                  color: "#0077be",
                  border: "2px solid #0077be",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 119, 190, 0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 119, 190, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-8 py-2 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: "#ff8c00" }}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-8 py-2 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: "#ff6b6b" }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
