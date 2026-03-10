import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { Users, Pencil, X, CheckCircle, Clock, Shield } from "lucide-react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "USER",
  });

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching users", err);
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "USER",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axiosInstance.put(`/users/${editingUser}`, formData);

      setSuccess("User updated successfully!");
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        role: "USER",
      });
      fetchUsers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating user", err);
      setError("Failed to update user");
    }
  };

  // Calculate stats
  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const userCount = users.filter((u) => u.role === "USER").length;

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-linear-to-br from-sky-500 to-blue-600 rounded-lg shadow-lg">
            <Users className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-sky-900">Manage Users</h1>
            <p className="text-sky-600 mt-1">
              Control user accounts and permissions
            </p>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-l-4 border-sky-500 p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-sky-600 text-sm font-semibold uppercase tracking-wide">
              Total Users
            </p>
            <p className="text-3xl font-bold text-sky-900 mt-3">
              {users.length}
            </p>
            <p className="text-xs text-gray-500 mt-2">Active accounts</p>
          </div>

          <div className="bg-white border-l-4 border-orange-500 p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-orange-600 text-sm font-semibold uppercase tracking-wide">
              Admins
            </p>
            <p className="text-3xl font-bold text-orange-600 mt-3">
              {adminCount}
            </p>
            <p className="text-xs text-gray-500 mt-2">Administrator accounts</p>
          </div>

          <div className="bg-white border-l-4 border-emerald-500 p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">
              Regular Users
            </p>
            <p className="text-3xl font-bold text-emerald-600 mt-3">
              {userCount}
            </p>
            <p className="text-xs text-gray-500 mt-2">Standard accounts</p>
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

        {/* Edit Form */}
        {editingUser && (
          <div className="bg-white rounded-xl shadow-lg border border-sky-100 p-8 mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-sky-900 flex items-center gap-2">
                <Pencil className="text-orange-500" size={28} />
                Edit User
              </h2>
              <button
                onClick={cancelEdit}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Close"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form
              onSubmit={updateUser}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {/* Name Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  Name *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter user name"
                  className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Role Select */}
              <div className="relative">
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-sky-100 rounded-lg focus:outline-none focus:border-sky-500 transition bg-sky-50 text-gray-900 font-semibold"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="col-span-1 md:col-span-3 flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <CheckCircle size={20} />
                  Update User
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg border border-sky-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b-2 border-sky-100">
            <h2 className="text-2xl font-bold text-sky-900">All Users</h2>
            <p className="text-gray-500 text-sm mt-1">
              {users.length} user(s) in system
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-sky-50 to-blue-50 border-b-2 border-sky-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-sky-900 uppercase tracking-wide">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-sky-100 transition hover:bg-sky-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-sky-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="inline-block bg-linear-to-r from-sky-100 to-blue-100 text-sky-700 px-3 py-1 rounded-full font-bold text-sm">
                        #{user.id}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-sky-900">{user.name}</p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm ${
                          user.role === "ADMIN"
                            ? "bg-orange-100 text-orange-700 border border-orange-300"
                            : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                        }`}
                      >
                        {user.role === "ADMIN" ? (
                          <Shield size={16} />
                        ) : (
                          <Clock size={16} />
                        )}
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm font-medium">
                        {new Date(user.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => startEdit(user)}
                        className="inline-flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 hover:text-orange-800 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <Users className="mx-auto text-gray-300 mb-4" size={48} />
                      <p className="text-gray-500 text-lg font-semibold">
                        No users found
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Start by creating new user accounts
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

export default ManageUsers;
