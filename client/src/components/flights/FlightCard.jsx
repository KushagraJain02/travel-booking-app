import { useNavigate } from "react-router-dom";

function FlightCard({ flight }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${flight.id}`, {
      state: { flight },
    });
  };

  // Format time to readable format
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate flight duration
  const calculateDuration = (departure, arrival) => {
    const diff = new Date(arrival) - new Date(departure);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden mb-4 border border-gray-100"
      style={{ boxShadow: "0 4px 12px rgba(0, 119, 190, 0.1)" }}
    >
      {/* Header with Flight Number and Price */}
      <div className="bg-linear-to-r from-blue-50 to-blue-50 p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold"
              style={{ backgroundColor: "#0077be" }}
            >
              {flight.airline_code}
            </span>
            <h2 className="text-2xl font-bold" style={{ color: "#0077be" }}>
              {flight.flight_number}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">Starting from</p>
            <p className="text-3xl font-bold" style={{ color: "#ff8c00" }}>
              ₹{flight.price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Flight Details */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Departure */}
          <div className="text-center">
            <p className="text-4xl font-bold mb-2" style={{ color: "#0077be" }}>
              {new Date(flight.departure_time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="text-gray-600 font-semibold">{flight.origin}</p>
            <p className="text-sm text-gray-500">
              {new Date(flight.departure_time).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Duration with Arrow */}
          <div className="flex flex-col items-center justify-center">
            <p
              className="text-lg font-semibold mb-2"
              style={{ color: "#0077be" }}
            >
              {calculateDuration(flight.departure_time, flight.arrival_time)}
            </p>
            <div className="relative w-full h-1 bg-linear-to-r from-blue-300 to-orange-400 rounded-full mb-2" />
            {/* <svg
              className="w-6 h-6 text-gray-400 mb-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg> */}
            {/* <p className="text-xs text-gray-500">
              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop(s)`}
            </p> */}
          </div>

          {/* Arrival */}
          <div className="text-center">
            <p className="text-4xl font-bold mb-2" style={{ color: "#0077be" }}>
              {new Date(flight.arrival_time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="text-gray-600 font-semibold">{flight.destination}</p>
            <p className="text-sm text-gray-500">
              {new Date(flight.arrival_time).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-gray-200">
          <div>
            <p className="text-xs text-gray-600 mb-1">Airline</p>
            <p className="font-semibold text-gray-800">{flight.airline_name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Aircraft</p>
            <p className="font-semibold text-gray-800">
              {flight.aircraft_type}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Class</p>
            <p className="font-semibold text-gray-800">{flight.cabin_class}</p>
          </div>
        </div>

        {/* Availability and Action Button */}
        <div className="flex justify-between items-center">
          <div>
            <span
              className={`inline-block px-4 py-2 rounded-lg font-semibold text-sm ${
                flight.seats_available > 10
                  ? "bg-green-100 text-green-700"
                  : flight.seats_available > 0
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {flight.seats_available > 0
                ? flight.seats_available > 10
                  ? `${flight.seats_available} seats available`
                  : `Only ${flight.seats_available} seat(s) left`
                : "Sold Out"}
            </span>
          </div>

          <button
            onClick={handleBookNow}
            disabled={flight.seats_available === 0}
            className={`px-8 py-3 rounded-lg font-semibold transition-all transform ${
              flight.seats_available > 0
                ? "text-white hover:scale-105 shadow-lg hover:shadow-xl"
                : "bg-gray-400 text-white cursor-not-allowed opacity-60"
            }`}
            style={{
              backgroundColor:
                flight.seats_available > 0 ? "#ff8c00" : "#cccccc",
            }}
          >
            {flight.seats_available > 0 ? "Book Now ✈️" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
