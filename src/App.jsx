import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import ExplorePage from "./features/explore/ExplorePage";
import TripsPage from "./features/trips/TripsPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
function App() {
  return (
    <Routes>
      {/* Public authentication pages */}
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      {/* Existing application pages */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/trips" element={<TripsPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<p className="p-6">Page not found</p>} />
    </Routes>
  );
}

export default App;
