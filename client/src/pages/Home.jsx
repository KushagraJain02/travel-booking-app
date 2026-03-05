import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="text-black min-h-screen flex items-center justify-center pt-20 pb-20"
        style={{
          background: "linear-gradient(135deg, #0077be 0%, #00a8e8 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content - Rich Information */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Explore the World with SkyTravel
            </h2>
            <p className="text-xl mb-8 opacity-90 text-white">
              Book your perfect flight at unbeatable prices. Discover
              destinations, compare flights, and travel with confidence.
            </p>

            {/* Key Features/Info Boxes */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm hover:bg-opacity-15 transition-all">
                <div className="shrink-0 w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <span className="text-lg">✈️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-black">
                    Best Flight Deals
                  </h4>
                  <p className="opacity-80 text-sm text-black">
                    Save up to 50% on flights to 500+ destinations worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm hover:bg-opacity-15 transition-all">
                <div className="shrink-0 w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-black">
                    100% Secure Booking
                  </h4>
                  <p className="opacity-80 text-sm text-black">
                    Your payments and personal data are protected with SSL
                    encryption
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm hover:bg-opacity-15 transition-all">
                <div className="shrink-0 w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-black">
                    Instant Confirmation
                  </h4>
                  <p className="opacity-80 text-sm text-black">
                    Get your e-ticket within seconds of booking confirmation
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white border-opacity-20 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">10M+</p>
                <p className="text-xs opacity-75 mt-1 text-white">
                  Travelers Served
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-xs opacity-75 mt-1 text-white">
                  Destinations
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-xs opacity-75 mt-1 text-white">
                  Daily Flights
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/search-flights")}
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
              style={{ backgroundColor: "#ff8c00" }}
            >
              <span>🔍</span> Search Flights Now
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <svg className="w-full h-96" viewBox="0 0 400 400" fill="none">
              {/* Airplane illustration */}
              <circle
                cx="200"
                cy="200"
                r="180"
                stroke="white"
                strokeWidth="2"
                opacity="0.1"
              />
              <path
                d="M100 200 Q200 100 300 200"
                stroke="white"
                strokeWidth="3"
                fill="none"
                opacity="0.3"
              />
              <g transform="translate(200, 200)">
                {/* Plane body */}
                <rect
                  x="-60"
                  y="-15"
                  width="120"
                  height="30"
                  fill="white"
                  rx="10"
                />
                {/* Wings */}
                <rect
                  x="-100"
                  y="-8"
                  width="200"
                  height="16"
                  fill="white"
                  opacity="0.7"
                />
                {/* Tail */}
                <path
                  d="M 50 -15 L 70 -30 L 70 30 Z"
                  fill="white"
                  opacity="0.7"
                />
                {/* Cockpit */}
                <circle cx="-40" cy="0" r="8" fill="#ff8c00" />
              </g>
              {/* Decorative elements */}
              <circle cx="80" cy="100" r="15" fill="white" opacity="0.2" />
              <circle cx="320" cy="300" r="20" fill="white" opacity="0.15" />
              <circle cx="100" cy="320" r="10" fill="white" opacity="0.2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3
            className="text-4xl font-bold text-center mb-4"
            style={{
              background: "linear-gradient(135deg, #0077be, #ff8c00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Popular Destinations
          </h3>
          <p className="text-center text-gray-600 mb-12">
            Discover amazing places around the world
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Paris */}
            <div className="rounded-xl overflow-hidden bg-white shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <div className="h-48 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-white opacity-80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <div className="p-6">
                <h4
                  className="text-xl font-bold mb-2"
                  style={{ color: "#0077be" }}
                >
                  Paris
                </h4>
                <p className="text-gray-600 mb-4">
                  Experience romance and art in the City of Light
                </p>
                <button
                  onClick={() => navigate("/search-flights")}
                  className="w-full py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
                  style={{ backgroundColor: "#ff8c00" }}
                >
                  Explore
                </button>
              </div>
            </div>

            {/* Card 2 - Tokyo */}
            <div className="rounded-xl overflow-hidden bg-white shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <div className="h-48 bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-white opacity-80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                </svg>
              </div>
              <div className="p-6">
                <h4
                  className="text-xl font-bold mb-2"
                  style={{ color: "#0077be" }}
                >
                  Tokyo
                </h4>
                <p className="text-gray-600 mb-4">
                  Discover vibrant culture and modern innovation
                </p>
                <button
                  onClick={() => navigate("/search-flights")}
                  className="w-full py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
                  style={{ backgroundColor: "#ff8c00" }}
                >
                  Explore
                </button>
              </div>
            </div>

            {/* Card 3 - Dubai */}
            <div className="rounded-xl overflow-hidden bg-white shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
              <div className="h-48 bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-white opacity-80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm0-13c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
                </svg>
              </div>
              <div className="p-6">
                <h4
                  className="text-xl font-bold mb-2"
                  style={{ color: "#0077be" }}
                >
                  Dubai
                </h4>
                <p className="text-gray-600 mb-4">
                  Luxury shopping and desert adventures await
                </p>
                <button
                  onClick={() => navigate("/search-flights")}
                  className="w-full py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
                  style={{ backgroundColor: "#ff8c00" }}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6" style={{ backgroundColor: "#f4f4f4" }}>
        <div className="max-w-6xl mx-auto">
          <h3
            className="text-4xl font-bold text-center mb-12"
            style={{ color: "#0077be" }}
          >
            Why Choose SkyTravel?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#0077be" }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h4
                className="text-xl font-bold mb-2"
                style={{ color: "#0077be" }}
              >
                Best Prices
              </h4>
              <p className="text-gray-600">
                We guarantee the lowest fares on all flights worldwide
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#ff8c00" }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <h4
                className="text-xl font-bold mb-2"
                style={{ color: "#0077be" }}
              >
                24/7 Support
              </h4>
              <p className="text-gray-600">
                Our dedicated team is always here to help you
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#0077be" }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
              <h4
                className="text-xl font-bold mb-2"
                style={{ color: "#0077be" }}
              >
                Easy Booking
              </h4>
              <p className="text-gray-600">
                Simple and secure booking process in just minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="text-white py-20 px-6"
        style={{
          background: "linear-gradient(135deg, #0077be 0%, #00a8e8 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">
            Ready to Book Your Flight?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join millions of travelers who trust SkyTravel for their booking
            needs
          </p>
          <button
            onClick={() => navigate("/search-flights")}
            className="px-8 py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105"
            style={{ backgroundColor: "#ff8c00" }}
          >
            Start Searching
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
