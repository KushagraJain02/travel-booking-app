// src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";

// Layout & Route Guards
import Layout from "../components/common/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminRoute from "../context/AdminRoute.jsx"; // ⚡ Make sure this path is correct

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchFlights from "../pages/SearchFlights";
import BookingPage from "../pages/BookingPage";
import MyBookings from "../pages/MyBookings";
import AdminDashboard from "../pages/AdminDashboard";

import ManageFlights from "../pages/admin/ManageFlights";
import ManageBookings from "../pages/admin/ManageBookings";
import ManageUsers from "../pages/admin/ManageUsers";
import Analytics from "../pages/admin/Analytics";
import Payments from "../pages/admin/Payments";
import Settings from "../pages/admin/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* -------------------- PUBLIC ROUTES -------------------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* -------------------- PROTECTED ROUTES WITH LAYOUT -------------------- */}
      <Route element={<Layout />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search-flights"
          element={
            <ProtectedRoute>
              <SearchFlights />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/:flightId"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* -------------------- ADMIN ROUTE -------------------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/admin/flights"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <ManageFlights />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <ManageBookings />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Payments />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Settings />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      {/* -------------------- DEFAULT ROUTE -------------------- */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* -------------------- 404 PAGE -------------------- */}
      <Route
        path="*"
        element={
          <h1 className="text-center mt-20 text-2xl">404 - Page Not Found</h1>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
