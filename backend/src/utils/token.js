import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || Buffer.byteLength(JWT_SECRET, "utf8") < 32) {
  throw new Error("JWT_SECRET must be configured with at least 32 bytes");
}

export function generateAccessToken(userId) {
  return jwt.sign({}, JWT_SECRET, {
    algorithm: "HS256",
    subject: String(userId),
    expiresIn: "15m",
    issuer: "smart-travel-planner",
    audience: "smart-travel-api",
  });
}
