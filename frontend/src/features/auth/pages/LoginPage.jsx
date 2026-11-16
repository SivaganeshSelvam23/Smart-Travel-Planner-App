import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data) {
    setServerError("");

    try {
      await login(data);
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      if (error.status === 400 && error.errors?.length) {
        error.errors.forEach((issue) => {
          if (["email", "password"].includes(issue.field)) {
            setError(issue.field, {
              type: "server",
              message: issue.message,
            });
          }
        });
      } else {
        setServerError(error.message || "Unable to login. Please try again.");
      }
    }
  }
  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>

        <p className="mt-2 text-slate-500">
          Sign in to continue planning your adventures.
        </p>
      </div>

      {/* Login form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="off"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className={`w-full rounded-lg border px-4 py-3
              outline-none transition-colors
              focus:ring-2 focus:ring-teal-100
              ${
                errors.email
                  ? "border-red-500"
                  : "border-slate-300 focus:border-teal-600"
              }`}
          />

          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="mt-1 text-sm text-red-600"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="off"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
            className={`w-full rounded-lg border px-4 py-3
              outline-none transition-colors
              focus:ring-2 focus:ring-teal-100
              ${
                errors.password
                  ? "border-red-500"
                  : "border-slate-300 focus:border-teal-600"
              }`}
          />

          {errors.password && (
            <p
              id="password-error"
              role="alert"
              className="mt-1 text-sm text-red-600"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Password recovery placeholder */}
        <p className="text-right text-sm text-slate-500">
          Password recovery coming later
        </p>

        {/* Form-level status */}
        {errors.root && (
          <p
            role="status"
            className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700"
          >
            {errors.root.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-teal-700
            px-4 py-3 font-semibold text-white
            transition-colors hover:bg-teal-800
            disabled:cursor-not-allowed
            disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
        {serverError && (
          <p role="alert" className="text-sm text-red-600">
            {serverError}
          </p>
        )}
      </form>

      {/* Register link */}
      <p className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-teal-700 hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
