import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchFlights } from "../api/search.api";
import FlightCard from "../components/flights/FlightCard";

function SearchFlights() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");

  // Fetch all flights
  const { data, isLoading, error } = useQuery({
    queryKey: ["flights"],
    queryFn: () => searchFlights(),
  });

  // Frontend filtering
  const filteredFlights = useMemo(() => {
    if (!data) return [];

    return data.filter((flight) => {
      const matchOrigin = origin
        ? flight.origin.toLowerCase().includes(origin.toLowerCase())
        : true;

      const matchDestination = destination
        ? flight.destination.toLowerCase().includes(destination.toLowerCase())
        : true;

      const matchDate = departDate
        ? new Date(flight.departure_time).toISOString().split("T")[0] ===
          departDate
        : true;

      return matchOrigin && matchDestination && matchDate;
    });
  }, [data, origin, destination, departDate]);

  return (
    <div className="w-full h-full bg-white">
      {/* Search Section */}
      <div className="py-16 px-6" style={{ backgroundColor: "#f4f4f4" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2
              className="text-5xl font-bold text-center mb-3"
              style={{ color: "#0077be" }}
            >
              Find Your Perfect Flight
            </h2>
            <p className="text-center text-gray-600 text-lg">
              Compare and book flights from hundreds of airlines
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* From */}
              <div>
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: "#0077be" }}
                >
                  From
                </label>
                <input
                  type="text"
                  placeholder="Departure City"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-5 py-3 border-2 rounded-lg font-medium transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: "#e0e0e0",
                    backgroundColor: "#ffffff",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0077be";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(0, 119, 190, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* To */}
              <div>
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: "#0077be" }}
                >
                  To
                </label>
                <input
                  type="text"
                  placeholder="Arrival City"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-5 py-3 border-2 rounded-lg font-medium transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: "#e0e0e0",
                    backgroundColor: "#ffffff",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0077be";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(0, 119, 190, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Date */}
              <div>
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: "#0077be" }}
                >
                  Departure Date
                </label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full px-5 py-3 border-2 rounded-lg font-medium transition-all duration-300 focus:outline-none"
                  style={{
                    borderColor: "#e0e0e0",
                    backgroundColor: "#ffffff",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0077be";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(0, 119, 190, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {}}
                  className="w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: "#ff8c00" }}
                >
                  ✈️ Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-24">
              <div
                className="inline-block w-16 h-16 border-4 rounded-full animate-spin mb-6"
                style={{
                  borderColor: "#e0e0e0",
                  borderTopColor: "#0077be",
                }}
              />
              <p className="text-xl font-semibold" style={{ color: "#0077be" }}>
                Searching for flights...
              </p>
              <p className="text-gray-500 mt-2">
                We're finding the best options for you
              </p>
            </div>
          ) : error ? (
            <div
              className="rounded-xl p-8 text-center border-l-4"
              style={{
                backgroundColor: "#fef2f2",
                borderLeftColor: "#ff4444",
              }}
            >
              <svg
                className="w-12 h-12 mx-auto mb-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4v2m0 4v2M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-red-700 font-semibold text-lg">
                Error loading flights
              </p>
              <p className="text-red-600 mt-2">
                {error?.message || "Please try again later"}
              </p>
            </div>
          ) : filteredFlights.length > 0 ? (
            <div>
              {/* Results Header */}
              <div
                className="mb-8 pb-6 border-b-2"
                style={{ borderBottomColor: "#e0e0e0" }}
              >
                <h3
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#0077be" }}
                >
                  Found {filteredFlights.length} flight
                  {filteredFlights.length !== 1 ? "s" : ""}
                </h3>
                <p className="text-gray-600">
                  {origin && destination && departDate
                    ? `From ${origin} to ${destination} on ${new Date(
                        departDate,
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}`
                    : "Showing all available flights"}
                </p>
              </div>

              {/* Flight Cards */}
              <div className="space-y-5">
                {filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-24">
              <svg
                className="w-16 h-16 mx-auto mb-6 opacity-40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "#0077be" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p
                className="text-2xl font-bold mb-2"
                style={{ color: "#0077be" }}
              >
                No flights found
              </p>
              <p className="text-gray-600 mb-8">
                Try adjusting your search criteria
              </p>
              <button
                onClick={() => {
                  setOrigin("");
                  setDestination("");
                  setDepartDate("");
                }}
                className="px-8 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: "#ff8c00" }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchFlights;
