import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouters from "./modules/auth/auth.routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Middleware to parse incoming JSON request bodies.
app.use(express.json({ limit: "16kb" }));

// First Api endpoint.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Smart Travel Planner API is running👍",
  });
});

app.use(cookieParser());

// Authentication routes
app.use("/api/auth", authRouters);

// Handle malformed or oversized JSON requests
app.use((error, req, res, next) => {
  if (error.status === 400 || error.status === 413) {
    return res.status(error.status).json({
      message: "Invalid or oversized request body",
    });
  }

  console.error("Unhandled error:", error.code || error.name);

  return res.status(500).json({
    message: "Internal server error",
  });
});

export default app;
