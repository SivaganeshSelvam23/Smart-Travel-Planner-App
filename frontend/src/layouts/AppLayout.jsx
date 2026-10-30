import React from "react";
import { NavLink, Outlet } from "react-router";

const navigation = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Explore", path: "/explore" },
  { label: "My Trips", path: "/trips" },
];

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
          <h2 className="text-xl font-bold text-blue-600">Travel Planner</h2>
          <nav aria-label="Main navigation" className="mt-10 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white px-6 py-4">
            <p className="font-semibold text-slate-800">Smart Travel Planner</p>
          </header>
          <nav
            aria-label="Mobile navigation"
            className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 md:hidden"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-blue-50 text-blue-700" : "text-slate-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <main className="p-6 md:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
