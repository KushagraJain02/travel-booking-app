import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFlightById, getUserById } from "../../api/booking.api.js";

function BookingCard({ booking }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: flight, isLoading: flightLoading } = useQuery({
    queryKey: ["flight", booking.flight_id],
    queryFn: () => getFlightById(booking.flight_id),
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", booking.user_id],
    queryFn: () => getUserById(booking.user_id),
  });

  if (flightLoading || userLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="h-24 bg-linear-to-r from-blue-200 to-blue-300"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!flight || !user) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <p className="text-gray-500">Unable to load booking details</p>
      </div>
    );
  }

  // ✅ Convert price to number and validate
  const price =
    typeof flight.price === "string"
      ? parseFloat(flight.price)
      : flight.price || 0;
  const quantity =
    typeof booking.quantity === "string"
      ? parseInt(booking.quantity)
      : booking.quantity || 1;

  const baseTotal = price * quantity;
  const tax = baseTotal * 0.1;
  const serviceFee = 25;
  const finalTotal = baseTotal + tax + serviceFee;

  // Format date and time
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status color class
  const getStatusColor = (status) => {
    const colors = {
      CONFIRMED: { bg: "#e8f4f8", text: "#0077be", border: "#0077be" },
      PENDING: { bg: "#fff8e8", text: "#ff8c00", border: "#ff8c00" },
      CANCELLED: { bg: "#ffe8e8", text: "#d32f2f", border: "#d32f2f" },
      COMPLETED: { bg: "#e8f5e9", text: "#388e3c", border: "#388e3c" },
    };
    return colors[status] || colors.CONFIRMED;
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const icons = {
      CONFIRMED: "✓",
      PENDING: "⏳",
      CANCELLED: "✕",
      COMPLETED: "✓✓",
    };
    return icons[status] || "•";
  };

  const departureTime = formatTime(flight.departure_date);
  const arrivalTime = formatTime(flight.arrival_date);
  const flightDate = formatDate(flight.departure_date);
  const statusColors = getStatusColor(booking.status);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 hover:shadow-2xl transition-all"
      style={{ borderLeftColor: "#0077be" }}
    >
      {/* Header */}
      <div
        className="p-6 flex justify-between items-start"
        style={{
          background: "linear-gradient(135deg, #0077be 0%, #00a8e8 100%)",
          color: "white",
        }}
      >
        <div>
          <p className="text-sm opacity-90 mb-2 font-medium">Your Booking</p>
          <h3 className="text-3xl font-bold">
            {user.name?.split(" ")[0] || "Traveler"}'s Flight
          </h3>
        </div>
        <span
          className="px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2"
          style={{
            background: statusColors.bg,
            color: statusColors.text,
            border: `2px solid ${statusColors.border}`,
          }}
        >
          <span className="text-lg">{getStatusIcon(booking.status)}</span>
          {booking.status}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Passenger Info */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-md"
            style={{ background: "linear-gradient(135deg, #0077be, #00a8e8)" }}
          >
            {user.name?.charAt(0).toUpperCase() || "T"}
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
              Passenger
            </p>
            <p className="font-bold text-lg text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Flight Route */}
        <div className="flight-route grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">
              Departure
            </p>
            <p className="font-bold text-2xl" style={{ color: "#0077be" }}>
              {flight.origin}
            </p>
            <p className="text-sm text-gray-600 mt-1">{flightDate}</p>
            <p className="text-sm font-semibold text-gray-800">
              {departureTime}
            </p>
          </div>

          <div className="text-center flex flex-col justify-center">
            <svg
              className="w-8 h-8 mx-auto mb-2"
              style={{ color: "#ff8c00" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <p className="text-xs text-gray-500 font-bold">
              {flight.duration || "Direct"}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">
              Arrival
            </p>
            <p className="font-bold text-2xl" style={{ color: "#ff8c00" }}>
              {flight.destination}
            </p>
            <p className="text-sm text-gray-600 mt-1">{flightDate}</p>
            <p className="text-sm font-semibold text-gray-800">{arrivalTime}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs text-gray-600 font-bold uppercase mb-2">
              Flight
            </p>
            <p className="font-bold text-gray-900 text-lg">
              {flight.flight_number}
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-xs text-gray-600 font-bold uppercase mb-2">
              Airline
            </p>
            <p className="font-bold text-gray-900 text-lg">
              {flight.airline || "Premium Airways"}
            </p>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-xs text-gray-600 font-bold uppercase mb-2">
              Passengers
            </p>
            <p className="font-bold text-gray-900 text-lg">
              {quantity} {quantity === 1 ? "Person" : "People"}
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <p className="text-xs text-gray-600 font-bold uppercase mb-2">
              Per Ticket
            </p>
            <p className="font-bold text-gray-900 text-lg">
              ₹{price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-linear-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-xl p-6 mb-6 space-y-3 border border-blue-200">
          <div className="flex justify-between text-gray-700 pb-2">
            <span className="font-medium">
              Base Total ({quantity} × ₹{price.toFixed(2)})
            </span>
            <span className="font-bold">₹{baseTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 pb-2">
            <span className="font-medium">Taxes & Charges</span>
            <span className="font-bold">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 pb-3 border-b border-blue-200">
            <span className="font-medium">Service Fee</span>
            <span className="font-bold">₹{serviceFee.toFixed(2)}</span>
          </div>
          <div
            className="flex justify-between text-xl font-bold"
            style={{ color: "#0077be" }}
          >
            <span>Total Amount</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          style={{
            background: "#f0f8ff",
            color: "#0077be",
            border: "2px solid #0077be",
          }}
        >
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          {isExpanded ? "Hide Details" : "View More Details"}
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 space-y-6 animate-in fade-in duration-300">
            <h4 className="font-bold text-lg" style={{ color: "#0077be" }}>
              📋 Booking Details
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                <span className="text-gray-600 font-medium">Booked On</span>
                <span className="font-semibold text-gray-800">
                  {formatDate(booking.created_at)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                <span className="text-gray-600 font-medium">
                  Booking Status
                </span>
                <span
                  className="font-semibold px-4 py-2 rounded-full text-sm"
                  style={{
                    background: statusColors.bg,
                    color: statusColors.text,
                    border: `1.5px solid ${statusColors.border}`,
                  }}
                >
                  {booking.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Seat Selection
                </span>
                <span className="font-semibold text-gray-800">Available</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                className="flex-1 py-3 rounded-lg font-bold text-white transition-all hover:scale-105 text-sm shadow-md"
                style={{ backgroundColor: "#0077be" }}
                onClick={() => alert("E-ticket download initiated!")}
              >
                📥 Download E-Ticket
              </button>
              <button
                className="flex-1 py-3 rounded-lg font-bold transition-all hover:scale-105 text-sm shadow-md"
                style={{
                  backgroundColor: "#fff",
                  color: "#0077be",
                  border: "2px solid #0077be",
                }}
                onClick={() => alert("Connecting to support...")}
              >
                📞 Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingCard;
