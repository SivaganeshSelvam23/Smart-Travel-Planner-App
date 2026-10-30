import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../schemas/registerSchema";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(data) {
    // The backend is not connected yet.
    // Do not send or log passwords.

    setError("root", {
      type: "manual",
      message: "Form validation passed. Account creation is not connected yet.",
    });
  }
  const fields = [
    {
      name: "name",
      label: "Full name",
      type: "text",
      placeholder: "Enter your full name",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "At least 12 characters",
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Re-enter your password",
      autoComplete: "new-password",
    },
  ];
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-slate-500">
          Start planning your next adventure.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              {field.label}
            </label>

            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
              {...register(field.name)}
              className={`w-full rounded-lg border px-4 py-3
                outline-none transition-colors
                focus:ring-2 focus:ring-teal-100
                ${
                  errors[field.name]
                    ? "border-red-500"
                    : "border-slate-300 focus:border-teal-600"
                }`}
            />
            {errors[field.name] && (
              <p
                id={`${field.name}-error`}
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}
        {errors.root && (
          <p
            role="status"
            className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700"
          >
            {errors.root.message}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-teal-700
            px-4 py-3 font-semibold text-white
            transition-colors hover:bg-teal-800
            disabled:cursor-not-allowed
            disabled:opacity-60"
        >
          {isSubmitting ? "Processing..." : "Create account"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-teal-700 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
