import express from "express";

const app = express();

// Middleware to parse incoming JSON request bodies.
app.use(express.json());

// First Api endpoint.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Smart Travel Planner API is running",
  });
});

export default app;
