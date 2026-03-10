import { Link, Outlet } from "react-router-dom";
import { Ticket, Users, Info } from "lucide-react";

function AdminDashboard() {
  const managementSections = [
    {
      title: "Flight Management",
      path: "/admin/flights",
      description:
        "Add, edit, update, and manage flight information. Control flight schedules, routes, seat availability, and pricing for your flight booking system.",
      color: "from-sky-500 to-blue-600",
      image: "✈️",
    },
    {
      title: "Booking Management",
      path: "/admin/bookings",
      description:
        "Monitor and manage all customer flight bookings. View booking details, track reservation statuses, manage confirmations, and analyze booking trends.",
      color: "from-emerald-500 to-green-600",
      image: "🎫",
    },
    {
      title: "User Management",
      path: "/admin/users",
      description:
        "Control user accounts and permissions. Manage user profiles, assign roles, handle access levels, and maintain system security.",
      color: "from-purple-500 to-pink-600",
      image: "👥",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-sky-900 mb-2">
            Welcome to Your Admin Panel
          </h1>
          <p className="text-gray-600 text-lg">
            Manage flights, bookings, and users all in one place
          </p>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {managementSections.map((section) => {
            return (
              <div
                key={section.path}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition group overflow-hidden border border-gray-100"
              >
                {/* Image Section */}
                <div
                  className={`bg-linear-to-br ${section.color} h-48 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                  </div>
                  <span className="text-8xl drop-shadow-lg relative z-10">
                    {section.image}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {section.description}
                  </p>
                  <Link
                    to={section.path}
                    className={`inline-flex items-center justify-center w-full bg-linear-to-r ${section.color} text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition transform hover:scale-105`}
                  >
                    Manage
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Banner */}
        <div className="bg-linear-to-r from-sky-100 to-blue-100 border-2 border-sky-300 rounded-xl p-6 flex items-start gap-4">
          <Info className="text-sky-600 mt-1 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-sky-900 mb-2">System Overview</h4>
            <p className="text-sky-800 text-sm leading-relaxed">
              This admin panel provides comprehensive tools to manage your
              entire flight booking system. Click the "Manage" buttons below to
              access different management sections and control your platform.
            </p>
          </div>
        </div>

        {/* Child Routes Render Here */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
