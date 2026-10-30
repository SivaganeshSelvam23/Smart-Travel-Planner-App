import React from "react";
import { Link } from "react-router";
const LoginPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>

      <p className="mt-2 text-slate-500">Your login form is coming next.</p>

      <Link
        to="/register"
        className="mt-6 inline-block font-medium text-teal-700"
      >
        Don't have an account? Register
      </Link>
    </div>
  );
};

export default LoginPage;
