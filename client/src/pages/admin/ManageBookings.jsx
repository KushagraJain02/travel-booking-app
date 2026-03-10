import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import {
  Loader,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  TicketIcon,
} from "lucide-react";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const getFlightPrice = async (flightId) => {
    try {
      const res = await axiosInstance.get(`/inventory/flights/${flightId}`);
      return res.data.price;
    } catch (err) {
      console.error("Error fetching flight", err);
      return 0;
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/bookings");

      const bookingsWithPrice = await Promise.all(
        res.data.map(async (booking) => {
          const flight = await axiosInstance.get(
            `/inventory/flights/${booking.flight_id}`,
          );

          const price = flight.data.price;
          const base = price * booking.quantity;
          const tax = base * 0.1;
          const total = base + tax + 25;

          return {
            ...booking,
            total_price: total,
          };
        }),
      );

      setBookings(bookingsWithPrice);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings
  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter(
          (b) =>
            (b.status || "CONFIRMED").toLowerCase() === filter.toLowerCase(),
        );

  // Calculate stats
  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.total_price || 0),
    0,
  );
  const confirmedBookings = bookings.filter(
    (b) => (b.status || "CONFIRMED") === "CONFIRMED",
  ).length;
  const totalSeats = bookings.reduce((sum, b) => sum + (b.quantity || 0), 0);

  // Get status badge styling
  const getStatusStyle = (status) => {
    const normalizedStatus = (status || "CONFIRMED").toLowerCase();
    switch (normalizedStatus) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 border border-emerald-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-sky-100 text-sky-700 border border-sky-300";
    }
  };

  const getStatusIcon = (status) => {
    const normalizedStatus = (status || "CONFIRMED").toLowerCase();
    switch (normalizedStatus) {
      case "confirmed":
        return <CheckCircle size={16} />;
      case "pending":
        return <AlertCircle size={16} />;
      case "cancelled":
        return <AlertCircle size={16} />;
      default:
        return <CheckCircle size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-linear-to-br from-sky-500 to-blue-600 rounded-lg shadow-lg">
            <TicketIcon className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-sky-900">Manage Bookings</h1>
            <p className="text-sky-600 mt-1">
              Track and monitor all flight reservations
            </p>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-l-4 border-sky-500 p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-sky-600 text-sm font-semibold uppercase tracking-wide">
              Total Bookings
            </p>
            <p className="text-3xl font-bold text-sky-900 mt-3">
              {bookings.length}
            </p>
            <p className="text-xs text-gray-500 mt-2">All time</p>
          </div>

          <div className="bg-white border-l-4 border-emerald-500 p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">
              Confirmed
            </p>
            <p className="text-3xl font-bold text-emerald-600 mt-3">
              {confirmedBookings}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {((confirmedBookings / bookings.length) * 100 || 0).toFixed(0)}%
              of total
            </p>
          </div>

          <div className="bg-white border-l-4 border-orange-500 p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-orange-600 text-sm font-semibold uppercase tracking-wide">
              Total Seats
            </p>
            <p className="text-3xl font-bold text-orange-600 mt-3">
              {totalSeats}
            </p>
            <p className="text-xs text-gray-500 mt-2">Across all bookings</p>
          </div>

          <div className="bg-white border-l-4 border-yellow-500 p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-yellow-600 text-sm font-semibold uppercase tracking-wide">
              Total Revenue
            </p>
            <p className="text-3xl font-bold text-yellow-600 mt-3">
              ₹{totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">From bookings</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            {error}
          </div>
        )}

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg border border-sky-100 overflow-hidden">
          {/* Table Header */}
          <div className="p-6 md:p-8 border-b-2 border-sky-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-sky-900">
                  All Bookings
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {filteredBookings.length} booking(s) displayed
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filter === "all"
                      ? "bg-sky-500 text-white shadow-lg"
                      : "bg-sky-100 text-sky-700 hover:bg-sky-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("confirmed")}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filter === "confirmed"
                      ? "bg-emerald-500 text-white shadow-lg"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filter === "pending"
                      ? "bg-yellow-500 text-white shadow-lg"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                >
                  Pending
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="inline-block animate-spin">
                  <Loader className="text-sky-500" size={48} />
                </div>
              </div>
              <p className="text-gray-600 font-semibold">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <TicketIcon className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg font-semibold">
                No bookings found
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {filter !== "all"
                  ? `Try adjusting your filters`
                  : "Start by creating a new booking"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-sky-50 to-blue-50 border-b-2 border-sky-100">
                    <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                      Flight ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                      Seats
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                      Booked On
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      className={`border-b border-sky-100 transition hover:bg-sky-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-sky-50/30"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="inline-block bg-linear-to-r from-sky-100 to-blue-100 text-sky-700 px-3 py-1 rounded-full font-bold text-sm">
                          #{booking.id}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-block bg-linear-to-r from-orange-100 to-yellow-100 text-orange-700 px-3 py-1 rounded-full font-semibold text-sm">
                          U-{booking.user_id}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 text-sm">
                          FL-{booking.flight_id}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users size={16} className="text-sky-500" />
                          <span className="font-semibold">
                            {booking.quantity}{" "}
                            {booking.quantity === 1 ? "Seat" : "Seats"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-bold text-lg text-orange-600">
                          ₹{(booking.total_price || 0).toLocaleString()}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm ${getStatusStyle(booking.status)}`}
                        >
                          {getStatusIcon(booking.status)}
                          {booking.status || "CONFIRMED"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} className="text-sky-500" />
                          <span className="text-sm font-medium">
                            {new Date(booking.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageBookings;
