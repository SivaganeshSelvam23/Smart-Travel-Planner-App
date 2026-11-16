import { NavLink, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const navigation = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Explore", path: "/explore" },
  { label: "My Trips", path: "/trips" },
];

const AppLayout = () => {
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      window.alert("Unable to log out. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-6 md:flex">
          {/* Branding and Navigation */}
          <div>
            <h2 className="text-xl font-bold text-blue-600">Travel Planner</h2>

            <nav aria-label="Main navigation" className="mt-10 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Desktop Logout at Bottom */}
          <div className="mt-auto border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="border-b border-slate-200 bg-white px-6 py-4">
            <p className="font-semibold text-slate-800">Smart Travel Planner</p>
          </header>

          {/* Mobile Navigation */}
          <nav
            aria-label="Mobile navigation"
            className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 md:hidden"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="ml-auto shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Logout
            </button>
          </nav>

          {/* Current Page */}
          <main className="flex-1 p-6 md:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
