import { Outlet, Link } from "react-router";
import travelImage from "../images/Alpine Lake Sunrise Panorama.png";
import { MdFlight } from "react-icons/md";

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Branding Section */}
      <aside className="hidden bg-teal-950 p-12 text-white lg:flex lg:flex-col lg:justify-center items-center">
        <div>
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <MdFlight className="shrink-0 text-3xl" />
            <span>Smart Travel Planner</span>
          </Link>

          <div className="max-w-lg">
            <h1 className="text-5xl font-bold leading-tight">
              Every Journey begins with a plan
            </h1>

            <p className="mt-6 text-lg text-teal-100">
              Discover extraordinary places, create memorable trips, and explore
              together.
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl">
              <img
                src={travelImage}
                alt="Beautiful alpine lake surrounded by mountains"
                className="h-64 w-full object-cover"
              />
            </div>
          </div>

          <p className="mt-5 text-sm text-teal-200">
            Explore. Plan. Experience.
          </p>
        </div>
      </aside>

      {/* Right Authentication Section */}
      <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="flex items-center gap-2 mb-10  text-2xl font-bold text-teal-800 lg:hidden"
          >
            <MdFlight className="shrink-0 text-3xl" />
            <span>Smart Travel Planner</span>
          </Link>

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
