import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { Pencil, Trash2, Plus, Plane } from "lucide-react";

function ManageFlights() {
  const [flights, setFlights] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    flight_number: "",
    origin: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    price: "",
    seats_available: "",
  });

  // Fetch flights
  const fetchFlights = async () => {
    try {
      const res = await axiosInstance.get("/inventory/flights");
      setFlights(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch flights");
      console.error("Error fetching flights", err);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update flight
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        await axiosInstance.put(`/inventory/flights/${editingId}`, formData);
        setSuccess("Flight updated successfully!");
      } else {
        await axiosInstance.post("/inventory/flights", formData);
        setSuccess("Flight added successfully!");
      }

      setFormData({
        flight_number: "",
        origin: "",
        destination: "",
        departure_time: "",
        arrival_time: "",
        price: "",
        seats_available: "",
      });

      setEditingId(null);
      fetchFlights();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to save flight");
      console.error("Error saving flight", err);
    }
  };

  // Delete flight
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      try {
        await axiosInstance.delete(`/inventory/flights/${id}`);
        setSuccess("Flight deleted successfully!");
        fetchFlights();
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete flight");
        console.error("Error deleting flight", err);
      }
    }
  };

  // Edit flight
  const handleEdit = (flight) => {
    setFormData({
      flight_number: flight.flight_number,
      origin: flight.origin,
      destination: flight.destination,
      departure_time: flight.departure_time,
      arrival_time: flight.arrival_time,
      price: flight.price,
      seats_available: flight.seats_available,
    });

    setEditingId(flight.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearForm = () => {
    setFormData({
      flight_number: "",
      origin: "",
      destination: "",
      departure_time: "",
      arrival_time: "",
      price: "",
      seats_available: "",
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-50 p-6 md:p-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-linear-to-br from-sky-500 to-blue-600 rounded-lg shadow-lg">
            <Plane className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-sky-900">Manage Flights</h1>
            <p className="text-sky-600 mt-1">
              Streamline your flight inventory with ease
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-l-4 border-sky-500 p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="text-sky-600 text-sm font-semibold uppercase tracking-wide">
              Total Flights
            </p>
            <p className="text-3xl font-bold text-sky-900 mt-2">
              {flights.length}
            </p>
          </div>
          <div className="bg-white border-l-4 border-orange-500 p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="text-orange-600 text-sm font-semibold uppercase tracking-wide">
              Active
            </p>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {flights.length}
            </p>
          </div>
          <div className="bg-white border-l-4 border-yellow-500 p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="text-yellow-600 text-sm font-semibold uppercase tracking-wide">
              Form Status
            </p>
            <p className="text-lg font-bold text-yellow-600 mt-2">
              {editingId ? "Editing" : "Ready to Add"}
            </p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
            <span className="text-xl">✓</span>
            {success}
          </div>
        )}

        {/* Flight Form */}
        <div className="bg-white rounded-xl shadow-lg border border-sky-100 p-8 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-sky-900 flex items-center gap-2">
              <span className="text-orange-500">{editingId ? "✏️" : "➕"}</span>
              {editingId ? "Edit Flight" : "Add New Flight"}
            </h2>
            {editingId && (
              <button
                onClick={clearForm}
                className="text-sm text-gray-500 hover:text-sky-600 transition font-medium"
              >
                Clear Form
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Flight Number */}
            <div className="relative">
              <label className="block text-sm font-semibold text-sky-900 mb-2">
                Flight Number *
              </label>
              <input
                name="flight_number"
                placeholder="e.g., FL-001"
                value={formData.flight_number}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Origin */}
            <div className="relative">
              <label className="block text-sm font-semibold text-sky-900 mb-2">
                Origin *
              </label>
              <input
                name="origin"
                placeholder="e.g., New York (JFK)"
                value={formData.origin}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Destination */}
            <div className="relative">
              <label className="block text-sm font-semibold text-sky-900 mb-2">
                Destination *
              </label>
              <input
                name="destination"
                placeholder="e.g., Los Angeles (LAX)"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Departure Time */}
            <div className="relative">
              <label className="block text-sm font-semibold text-sky-900 mb-2">
                Departure Time *
              </label>
              <input
                type="datetime-local"
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900"
                required
              />
            </div>

            {/* Arrival Time */}
            <div className="relative">
              <label className="block text-sm font-semibold text-sky-900 mb-2">
                Arrival Time *
              </label>
              <input
                type="datetime-local"
                name="arrival_time"
                value={formData.arrival_time}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900"
                required
              />
            </div>

            {/* Price */}
            <div className="relative">
              <label className="block text-sm font-semibold text-sky-900 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                placeholder="e.g., 5000"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Seats Available */}
            <div className="relative">
              <label className="block text-sm font-semibold text-sky-900 mb-2">
                Seats Available *
              </label>
              <input
                type="number"
                name="seats_available"
                placeholder="e.g., 180"
                value={formData.seats_available}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <Plus size={20} />
                {editingId ? "Update Flight" : "Add Flight"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Flights Table */}
        <div className="bg-white rounded-xl shadow-lg border border-sky-100 overflow-hidden">
          <div className="p-8 border-b-2 border-sky-100">
            <h2 className="text-2xl font-bold text-sky-900">All Flights</h2>
            <p className="text-gray-500 text-sm mt-1">
              {flights.length} flight(s) in system
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-sky-50 to-blue-50 border-b-2 border-sky-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Flight
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Route
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Times
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Seats
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {flights.map((flight, index) => (
                  <tr
                    key={flight.id}
                    className={`border-b border-sky-100 transition hover:bg-sky-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-sky-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="inline-block bg-linear-to-r from-orange-100 to-yellow-100 text-orange-700 px-3 py-1 rounded-full font-bold text-sm">
                        {flight.flight_number}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-semibold text-sky-900">
                          {flight.origin} → {flight.destination}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <p>
                          Depart:{" "}
                          {new Date(flight.departure_time).toLocaleDateString()}
                        </p>
                        <p>
                          Arrive:{" "}
                          {new Date(flight.arrival_time).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-lg text-sky-600">
                        ₹{flight.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                          flight.seats_available > 50
                            ? "bg-green-100 text-green-700"
                            : flight.seats_available > 20
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {flight.seats_available}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(flight)}
                          className="inline-flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 hover:text-orange-800 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(flight.id)}
                          className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {flights.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <p className="text-gray-400 text-lg">
                        No flights available yet
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Add your first flight using the form above
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageFlights;
