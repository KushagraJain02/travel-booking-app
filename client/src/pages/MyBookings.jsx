import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { getMyBookings } from "../api/booking.api.js";
import BookingCard from "../components/booking/BookingCard.jsx";

function MyBookings() {
  const { user } = useContext(AuthContext);

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: () => getMyBookings(user.id),
    enabled: !!user,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#F9FAFB] to-[#E5E7EB]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-linear-to-r from-[#0077BE] to-[#00A8E8] rounded-full animate-spin"></div>
              <div className="absolute inset-1 bg-[#F9FAFB] rounded-full"></div>
            </div>
          </div>
          <p className="mt-6 text-[#1F2937] font-semibold text-lg">
            Loading your bookings...
          </p>
          <p className="text-[#6B7280] text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#F9FAFB] to-[#E5E7EB]">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg border border-[#E5E7EB] max-w-md">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-[#1F2937] font-bold text-lg">
            Unable to Load Bookings
          </p>
          <p className="text-[#6B7280] mt-3 text-sm">
            We encountered an issue retrieving your bookings. Please try
            refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-linear-to-r from-[#0077BE] to-[#00A8E8] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (!bookings.length)
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#F9FAFB] to-[#E5E7EB]">
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg border border-[#E5E7EB] max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <span className="text-4xl">✈️</span>
          </div>
          <p className="text-[#1F2937] font-bold text-xl">No Bookings Yet</p>
          <p className="text-[#6B7280] mt-3 text-sm">
            Start your adventure! Explore flights and create your first booking.
          </p>
          <button
            onClick={() => (window.location.href = "/flights")}
            className="mt-6 px-8 py-3 bg-linear-to-r from-[#0077BE] to-[#00A8E8] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <span>Explore Flights</span>
            <span>→</span>
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F9FAFB] via-white to-[#E5E7EB]">
      {/* Hero Header */}
      <div className="bg-linear-to-r from-[#0077BE] to-[#00A8E8] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">✈️</span>
            <h1 className="text-5xl font-bold">My Bookings</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Manage, track, and view all your flight reservations in one place
          </p>
        </div>
      </div>

      {/* Bookings Container */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <div
                key={booking.id}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: `fadeIn 0.6s ease-out forwards`,
                  opacity: 0,
                }}
              >
                <BookingCard booking={booking} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default MyBookings;
