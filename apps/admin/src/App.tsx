import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./router/ProtectedRoute";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Appointments from "./pages/Appointments";
import Necessities from "./pages/Necessities";
import Pets from "./pages/Pets";
import Order from "./pages/Order";
import Reviews from "./pages/Reviews";
import './index.css'

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <div className="flex min-h-screen">
              <Navbar />

              <main className="flex-1">
                <Outlet />
              </main>
            </div>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/appointments"
            element={<Appointments />}
          />
          <Route
            path="/necessities"
            element={<Necessities />}
          />
          <Route path="/pets" element={<Pets />} />
          <Route path="/order" element={<Order />} />
          <Route path="/reviews" element={<Reviews />} />
        </Route>
      </Route>

      {/* Unauthorized */}
      <Route
        path="/unauthorized"
        element={
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">
                Access Denied
              </h1>

              <p className="mt-2 text-gray-500">
                You do not have permission to access the
                admin dashboard.
              </p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;