import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const dashboardStats = [
    {
      id: 1,
      label: "Total Flights",
      value: "248",
      icon: "✈️",
      color: "from-[#0077BE] to-[#00A8E8]",
      trend: "+12% this month",
    },
    {
      id: 2,
      label: "Active Bookings",
      value: "1,856",
      icon: "🎫",
      color: "from-[#FF8C00] to-orange-500",
      trend: "+8% this week",
    },
    {
      id: 3,
      label: "Total Users",
      value: "3,245",
      icon: "👥",
      color: "from-purple-500 to-pink-500",
      trend: "+24 new users",
    },
    {
      id: 4,
      label: "Revenue",
      value: "$45.2K",
      icon: "💰",
      color: "from-green-500 to-emerald-600",
      trend: "+18% vs last month",
    },
  ];

  const adminModules = [
    {
      id: 1,
      title: "Manage Flights",
      description:
        "Add, edit, and delete flights. Control schedules and pricing.",
      icon: "✈️",
      route: "/admin/flights",
      color: "from-[#0077BE] to-[#00A8E8]",
      actions: [
        { label: "Add New Flight", icon: "➕" },
        { label: "View All Flights", icon: "📋" },
        { label: "Flight Analytics", icon: "📊" },
      ],
    },
    {
      id: 2,
      title: "View Bookings",
      description:
        "Monitor all bookings, manage cancellations, and process refunds.",
      icon: "🎫",
      route: "/admin/bookings",
      color: "from-[#FF8C00] to-orange-500",
      actions: [
        { label: "Active Bookings", icon: "📅" },
        { label: "Cancellations", icon: "❌" },
        { label: "Booking History", icon: "📜" },
      ],
    },
    {
      id: 3,
      title: "Manage Users",
      description: "Control user accounts, permissions, and account settings.",
      icon: "👥",
      route: "/admin/users",
      color: "from-purple-500 to-pink-500",
      actions: [
        { label: "All Users", icon: "👤" },
        { label: "User Roles", icon: "🔐" },
        { label: "Deactivate Accounts", icon: "🚫" },
      ],
    },
    {
      id: 4,
      title: "Reports & Analytics",
      description:
        "Generate reports and view detailed analytics on system performance.",
      icon: "📊",
      route: "/admin/analytics",
      color: "from-green-500 to-emerald-600",
      actions: [
        { label: "Sales Report", icon: "📈" },
        { label: "User Analytics", icon: "📉" },
        { label: "System Health", icon: "⚕️" },
      ],
    },
    {
      id: 5,
      title: "Payment Management",
      description: "Track payments, invoices, and financial transactions.",
      icon: "💳",
      route: "/admin/payments",
      color: "from-yellow-500 to-yellow-600",
      actions: [
        { label: "Transactions", icon: "💰" },
        { label: "Invoices", icon: "📄" },
        { label: "Refunds", icon: "↩️" },
      ],
    },
    {
      id: 6,
      title: "Settings & Configuration",
      description:
        "Adjust system settings, email templates, and general configuration.",
      icon: "⚙️",
      route: "/admin/settings",
      color: "from-slate-500 to-slate-600",
      actions: [
        { label: "System Settings", icon: "🔧" },
        { label: "Email Templates", icon: "✉️" },
        { label: "Security", icon: "🔒" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F9FAFB] via-white to-[#E5E7EB]">
      {/* Admin Header */}
      <div className="bg-linear-to-r from-[#111827] to-[#1F2937] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-linear-to-br from-[#0077BE] to-[#00A8E8] rounded-xl flex items-center justify-center text-2xl shadow-lg">
                ⚙️
              </div>
              <div>
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-300 mt-1">Flight Management System</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Last updated</p>
              <p className="text-lg font-semibold">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "overview"
                  ? "bg-[#0077BE] text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab("modules")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "modules"
                  ? "bg-[#0077BE] text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              🎛️ Modules
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="animate-fadeIn">
              {/* Statistics Grid */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#1F2937] mb-6">
                  Key Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, index) => (
                    <div
                      key={stat.id}
                      className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
                      style={{
                        animation: `slideUp 0.6s ease-out ${index * 0.1}s forwards`,
                        opacity: 0,
                      }}
                    >
                      <div
                        className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg`}
                      >
                        {stat.icon}
                      </div>
                      <p className="text-[#6B7280] text-sm font-medium mb-1">
                        {stat.label}
                      </p>
                      <p className="text-[#1F2937] text-3xl font-bold mb-2">
                        {stat.value}
                      </p>
                      <p className="text-xs text-green-600 font-semibold">
                        {stat.trend}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
                <h3 className="text-xl font-bold text-[#1F2937] mb-6">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Add New Flight",
                      icon: "✈️",
                      color: "from-[#0077BE] to-[#00A8E8]",
                    },
                    {
                      label: "View All Bookings",
                      icon: "🎫",
                      color: "from-[#FF8C00] to-orange-500",
                    },
                    {
                      label: "Manage Users",
                      icon: "👥",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      label: "Generate Report",
                      icon: "📊",
                      color: "from-green-500 to-emerald-600",
                    },
                    {
                      label: "View Payments",
                      icon: "💳",
                      color: "from-yellow-500 to-yellow-600",
                    },
                    {
                      label: "System Settings",
                      icon: "⚙️",
                      color: "from-slate-500 to-slate-600",
                    },
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      className={`bg-linear-to-r ${action.color} text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}
                    >
                      <span className="text-xl">{action.icon}</span>
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modules Tab */}
          {activeTab === "modules" && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-[#1F2937] mb-8">
                Admin Modules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminModules.map((module, index) => (
                  <div
                    key={module.id}
                    className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 transform cursor-pointer group"
                    onClick={() => navigate(module.route)}
                    style={{
                      animation: `slideUp 0.6s ease-out ${index * 0.1}s forwards`,
                      opacity: 0,
                    }}
                  >
                    {/* Header with gradient */}
                    <div
                      className={`bg-linear-to-r ${module.color} p-6 text-white`}
                    >
                      <div className="text-4xl mb-3">{module.icon}</div>
                      <h3 className="text-xl font-bold">{module.title}</h3>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">
                        {module.description}
                      </p>

                      {/* Actions */}
                      <div className="space-y-2 mb-6">
                        {module.actions.map((action, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F9FAFB] transition-colors"
                          >
                            <span className="text-lg">{action.icon}</span>
                            <span className="text-sm text-[#1F2937] font-medium">
                              {action.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button
                        className={`w-full bg-linear-to-r ${module.color} text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all group-hover:translate-y-0`}
                      >
                        Access Module →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#111827] text-gray-400 py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-sm">
            © 2024 Flight Booking Admin. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-sm hover:text-white transition">
              Privacy Policy
            </button>
            <button className="text-sm hover:text-white transition">
              Terms of Service
            </button>
            <button className="text-sm hover:text-white transition">
              Support
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default AdminDashboard;
