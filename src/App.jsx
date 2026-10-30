import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import ExplorePage from "./features/explore/ExplorePage";
import TripsPage from "./features/trips/TripsPage";
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/trips" element={<TripsPage />} />
      </Route>
      <Route path="*" element={<p className="p-6">Page not found</p>} />
    </Routes>
  );
}

export default App;
