import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="bg-gray-900 text-gray-300 mt-20 border-t"
      style={{ borderTopColor: "#ff8c00" }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg transition-transform hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #0077be, #ff8c00)",
                }}
              />
              <h2 className="text-2xl font-bold" style={{ color: "#0077be" }}>
                SkyTravel
              </h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for finding and booking flights worldwide.
              Travel with confidence.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: "rgba(0, 119, 190, 0.1)",
                  color: "#0077be",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: "rgba(0, 119, 190, 0.1)",
                  color: "#0077be",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.25 4 5 5-4-11-8-11z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: "rgba(0, 119, 190, 0.1)",
                  color: "#0077be",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-white font-bold mb-6 text-lg"
              style={{ color: "#ff8c00" }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search-flights"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Search Flights
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bookings"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="text-white font-bold mb-6 text-lg"
              style={{ color: "#ff8c00" }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="text-white font-bold mb-6 text-lg"
              style={{ color: "#ff8c00" }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              className="text-white font-bold mb-6 text-lg"
              style={{ color: "#ff8c00" }}
            >
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider mb-1">
                  Email
                </p>
                <a
                  href="mailto:support@skytravel.com"
                  className="text-white font-medium hover:text-orange-400 transition-colors"
                >
                  support@skytravel.com
                </a>
              </li>
              <li>
                <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider mb-1">
                  Phone
                </p>
                <a
                  href="tel:+1234567890"
                  className="text-white font-medium hover:text-orange-400 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider mb-1">
                  Hours
                </p>
                <p className="text-gray-400">24/7 Available</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SkyTravel. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 text-sm hover:text-white transition-colors"
            >
              Security
            </a>
            <a
              href="#"
              className="text-gray-500 text-sm hover:text-white transition-colors"
            >
              Accessibility
            </a>
            <a
              href="#"
              className="text-gray-500 text-sm hover:text-white transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
