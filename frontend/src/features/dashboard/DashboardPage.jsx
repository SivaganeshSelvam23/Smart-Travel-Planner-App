import React from "react";
import { useAuth } from "../../hooks/useAuth";
const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">My Trips</h1>
      <p className="mt-2 text-slate-600">
        Plan your next adventure and manage your trips: {user.name}.
      </p>
    </section>
  );
};

export default DashboardPage;
