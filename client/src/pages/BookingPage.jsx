import { useContext, useState, useEffect } from "react";
import { createBooking } from "../api/booking.api";
import { getFlightById } from "../api/inventory.api";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function BookingPage() {
  const { flightId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [loadingFlight, setLoadingFlight] = useState(true);
  const [flightData, setFlightData] = useState(location.state?.flight || null);

  const [currentStep, setCurrentStep] = useState(1);
  const [passengers, setPassengers] = useState([]);
  const [numPassengers, setNumPassengers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // 🔹 Fetch Flight Data
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        if (flightData) {
          setLoadingFlight(false);
          return;
        }

        if (flightId) {
          const data = await getFlightById(flightId);
          setFlightData(data);
        }
      } catch (err) {
        console.error("Error fetching flight:", err);
      } finally {
        setLoadingFlight(false);
      }
    };

    fetchFlight();
  }, [flightId]);

  // 🔹 Initialize passengers
  useEffect(() => {
    const newPassengers = Array(numPassengers)
      .fill(null)
      .map((_, i) => ({
        id: i,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        seatPreference: "economy",
      }));
    setPassengers(newPassengers);
  }, [numPassengers]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const isStep1Complete = passengers.every(
    (p) => p.firstName && p.lastName && p.email && p.phone,
  );

  const handleBooking = async () => {
    if (!isStep1Complete) {
      setMessage("Please fill all passenger details");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      // console.log(user);
      await createBooking(user.id, flightId, Number(numPassengers));
      setMessage("Booking successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      setMessage("Booking failed. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Loading UI
  if (loadingFlight) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Loading flight details...
          </p>
        </div>
      </div>
    );
  }

  if (!flightData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-orange-100">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4v2m0 4v2M6.343 3.665c-.866-.433-1.87.698-1.437 1.565L4.5 7m3-.432l5.027-10.054c.866-1.732 3.583-1.732 4.449 0l5.027 10.054m-12-2.12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          </svg>
          <p className="text-xl font-bold text-red-600 mb-2">
            Flight Not Found
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // 🔹 Format Data
  const pricePerPerson = Number(flightData.price) || 450;

  const departureTime = new Date(flightData.departure_time).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" },
  );

  const arrivalTime = new Date(flightData.arrival_time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const flightDate = new Date(flightData.departure_time).toLocaleDateString();
  const duration = "7h 45m"; // Calculate or get from API

  const totalPrice = pricePerPerson * numPassengers;
  const tax = totalPrice * 0.1;
  const serviceFee = 25;
  const finalPrice = totalPrice + tax + serviceFee;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {[
              { step: 1, label: "Passengers", icon: "👥" },
              { step: 2, label: "Details", icon: "📝" },
              { step: 3, label: "Payment", icon: "💳" },
            ].map((item) => (
              <div key={item.step} className="flex items-center flex-1">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all transform cursor-pointer"
                  onClick={() =>
                    item.step < currentStep && setCurrentStep(item.step)
                  }
                  style={{
                    backgroundColor:
                      currentStep >= item.step ? "#0077be" : "#d0d0d0",
                    transform:
                      currentStep >= item.step ? "scale(1.15)" : "scale(1)",
                    boxShadow:
                      currentStep >= item.step
                        ? "0 4px 15px rgba(0, 119, 190, 0.4)"
                        : "none",
                  }}
                >
                  {currentStep > item.step ? "✓" : item.icon}
                </div>
                <div
                  className="flex-1 h-1 mx-3 transition-all"
                  style={{
                    backgroundColor:
                      currentStep > item.step ? "#0077be" : "#d0d0d0",
                  }}
                ></div>
              </div>
            ))}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
              style={{
                backgroundColor: currentStep >= 3 ? "#0077be" : "#d0d0d0",
              }}
            >
              💰
            </div>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span
              style={{
                color: currentStep === 1 ? "#0077be" : "#666",
                fontWeight: currentStep === 1 ? "bold" : "normal",
              }}
            >
              Passengers
            </span>
            <span
              style={{
                color: currentStep === 2 ? "#0077be" : "#666",
                fontWeight: currentStep === 2 ? "bold" : "normal",
              }}
            >
              Details
            </span>
            <span
              style={{
                color: currentStep === 3 ? "#0077be" : "#666",
                fontWeight: currentStep === 3 ? "bold" : "normal",
              }}
            >
              Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Summary Card - Enhanced */}
            <div
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-4 hover:shadow-2xl transition-all"
              style={{ borderLeftColor: "#0077be" }}
            >
              {/* Flight Header */}
              <div
                className="p-6 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #0077be 0%, #00a8e8 100%)",
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm opacity-90">Flight Number</p>
                    <h3 className="text-2xl font-bold">
                      {flightData.flight_number || "SK-1234"}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Airline</p>
                    <p className="text-xl font-bold">
                      {flightData.airline || "SkyAirways"}
                    </p>
                  </div>
                </div>
                <p className="text-xs opacity-75">
                  🗓️ {flightDate} • 🛫 Direct Flight
                </p>
              </div>

              {/* Flight Details */}
              <div className="p-8">
                <div className="grid grid-cols-3 gap-4">
                  {/* Departure */}
                  <div className="text-center">
                    <p className="text-gray-500 text-xs font-semibold mb-1 uppercase">
                      Departure
                    </p>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: "#0077be" }}
                    >
                      {departureTime}
                    </p>
                    <p className="text-gray-600 text-sm mt-2 font-semibold">
                      {flightData.origin || "JFK"}
                    </p>
                    <p className="text-xs text-gray-500">New York</p>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-500 mb-2">{duration}</p>
                    <svg
                      className="w-8 h-8"
                      style={{ color: "#0077be" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    <p className="text-xs text-gray-500 mt-2">Direct</p>
                  </div>

                  {/* Arrival */}
                  <div className="text-center">
                    <p className="text-gray-500 text-xs font-semibold mb-1 uppercase">
                      Arrival
                    </p>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: "#ff8c00" }}
                    >
                      {arrivalTime}
                    </p>
                    <p className="text-gray-600 text-sm mt-2 font-semibold">
                      {flightData.destination || "LHR"}
                    </p>
                    <p className="text-xs text-gray-500">London</p>
                  </div>
                </div>

                {/* Flight Info Badges */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                    <span>✓</span>
                    <span className="text-sm text-green-700 font-semibold">
                      Seat Available: {flightData.seats_available || 120}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <span>🏆</span>
                    <span className="text-sm text-blue-700 font-semibold">
                      On-Time Performance: 98%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Passenger Counter */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="mb-8">
                  <h2
                    className="text-3xl font-bold mb-2"
                    style={{ color: "#0077be" }}
                  >
                    👥 How Many Passengers?
                  </h2>
                  <p className="text-gray-600">
                    Select the number of travelers for this flight
                  </p>
                </div>

                <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
                  <div className="flex items-center justify-center gap-8">
                    <button
                      onClick={() =>
                        numPassengers > 1 && setNumPassengers(numPassengers - 1)
                      }
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-all transform hover:scale-110 active:scale-95"
                      style={{
                        backgroundColor:
                          numPassengers === 1 ? "#d0d0d0" : "#0077be",
                        cursor: numPassengers === 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      −
                    </button>

                    <div className="text-center">
                      <p
                        className="text-7xl font-bold"
                        style={{ color: "#0077be" }}
                      >
                        {numPassengers}
                      </p>
                      <p className="text-gray-600 mt-2 text-lg font-semibold">
                        {numPassengers === 1 ? "Passenger" : "Passengers"}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        numPassengers < 6 && setNumPassengers(numPassengers + 1)
                      }
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-all transform hover:scale-110 active:scale-95"
                      style={{
                        backgroundColor:
                          numPassengers === 6 ? "#d0d0d0" : "#ff8c00",
                        cursor: numPassengers === 6 ? "not-allowed" : "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-6">
                    Maximum 6 passengers per booking
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                  style={{ backgroundColor: "#0077be" }}
                >
                  Continue to Passenger Details →
                </button>
              </div>
            )}

            {/* Step 2: Passenger Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-gray-200 hover:border-blue-400 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: "#0077be" }}
                      >
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Passenger {index + 1}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          value={passenger.firstName}
                          onChange={(e) =>
                            handlePassengerChange(
                              index,
                              "firstName",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all bg-gray-50 hover:bg-white"
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          value={passenger.lastName}
                          onChange={(e) =>
                            handlePassengerChange(
                              index,
                              "lastName",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all bg-gray-50 hover:bg-white"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={passenger.email}
                          onChange={(e) =>
                            handlePassengerChange(
                              index,
                              "email",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all bg-gray-50 hover:bg-white"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={passenger.phone}
                          onChange={(e) =>
                            handlePassengerChange(
                              index,
                              "phone",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all bg-gray-50 hover:bg-white"
                        />
                      </div>

                      {/* Seat Preference */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Seat Preference
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            {
                              value: "economy",
                              label: "Economy",
                              icon: "💺",
                            },
                            {
                              value: "premium-economy",
                              label: "Premium",
                              icon: "🛋️",
                            },
                            {
                              value: "business",
                              label: "Business",
                              icon: "✨",
                            },
                          ].map((seat) => (
                            <button
                              key={seat.value}
                              onClick={() =>
                                handlePassengerChange(
                                  index,
                                  "seatPreference",
                                  seat.value,
                                )
                              }
                              className="p-3 rounded-lg border-2 transition-all font-semibold"
                              style={{
                                borderColor:
                                  passenger.seatPreference === seat.value
                                    ? "#0077be"
                                    : "#e0e0e0",
                                backgroundColor:
                                  passenger.seatPreference === seat.value
                                    ? "rgba(0, 119, 190, 0.1)"
                                    : "white",
                                color:
                                  passenger.seatPreference === seat.value
                                    ? "#0077be"
                                    : "#666",
                              }}
                            >
                              <span className="text-lg">{seat.icon}</span>
                              <p className="text-xs mt-1">{seat.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 py-4 rounded-xl font-bold transition-all border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!isStep1Complete}
                    className="flex-1 py-4 rounded-xl font-bold text-white transition-all transform hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: isStep1Complete ? "#0077be" : "#ccc",
                      cursor: isStep1Complete ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#0077be" }}
                >
                  💳 Select Payment Method
                </h2>
                <p className="text-gray-600 mb-8">
                  Choose your preferred way to complete the payment
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      id: "credit-card",
                      name: "Credit Card",
                      icon: "💳",
                      desc: "Visa, Mastercard, American Express",
                    },
                    {
                      id: "debit-card",
                      name: "Debit Card",
                      icon: "🏦",
                      desc: "Direct bank account access",
                    },
                    {
                      id: "digital-wallet",
                      name: "Digital Wallet",
                      icon: "📱",
                      desc: "Apple Pay, Google Pay",
                    },
                    {
                      id: "upi",
                      name: "UPI/Mobile Banking",
                      icon: "📲",
                      desc: "Instant payment from your bank",
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg"
                      style={{
                        borderColor:
                          paymentMethod === method.id ? "#0077be" : "#e0e0e0",
                        backgroundColor:
                          paymentMethod === method.id
                            ? "rgba(0, 119, 190, 0.05)"
                            : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span className="ml-4 text-2xl">{method.icon}</span>
                      <div className="ml-4 flex-1">
                        <p className="font-bold text-gray-800">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.desc}</p>
                      </div>
                      {paymentMethod === method.id && (
                        <svg
                          className="w-6 h-6"
                          style={{ color: "#0077be" }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </label>
                  ))}
                </div>

                {/* Security Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 11-1.414 1.414l-4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-green-700">
                    🔒 Your payment is 100% secure with SSL encryption
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 py-4 rounded-xl font-bold transition-all border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="flex-1 py-4 rounded-xl font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                    style={{
                      backgroundColor: loading ? "#ccc" : "#0077be",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "🔄 Processing..." : "✓ Complete Booking"}
                  </button>
                </div>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div
                className={`p-4 rounded-xl font-semibold flex items-center gap-3 animate-pulse ${
                  messageType === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {messageType === "success" ? "✓" : "✗"} {message}
              </div>
            )}
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-1 sticky top-24" style={{ top: "100px" }}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Sidebar Header */}
              <div
                className="p-6 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #0077be 0%, #00a8e8 100%)",
                }}
              >
                <h3 className="text-2xl font-bold">💰 Price Breakdown</h3>
              </div>

              {/* Price Details */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-semibold">Base Fare</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      ${pricePerPerson} × {numPassengers}
                    </p>
                    <p className="font-bold" style={{ color: "#0077be" }}>
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-semibold">
                    Taxes (10%)
                  </span>
                  <span className="font-bold text-gray-700">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-semibold">
                    Service Fee
                  </span>
                  <span className="font-bold text-gray-700">
                    ${serviceFee.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "#ff8c00" }}
                  >
                    ${finalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Included Benefits */}
              <div className="p-6 bg-linear-to-br from-blue-50 to-indigo-50 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">
                  ✨ What's Included
                </h4>
                <div className="space-y-3">
                  {[
                    { icon: "✓", text: "Free Cancellation" },
                    { icon: "✓", text: "Meals & Beverages" },
                    { icon: "✓", text: "Baggage Allowance (2)" },
                    { icon: "✓", text: "Instant E-Ticket" },
                    { icon: "✓", text: "24/7 Support" },
                    { icon: "✓", text: "Travel Insurance" },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="font-bold" style={{ color: "#0077be" }}>
                        {benefit.icon}
                      </span>
                      <span className="text-gray-700">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="p-6 border-t border-gray-200">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                />
                <button
                  className="w-full mt-2 py-2 rounded-lg font-semibold text-white transition-all text-sm"
                  style={{ backgroundColor: "#ff8c00" }}
                >
                  Apply Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
