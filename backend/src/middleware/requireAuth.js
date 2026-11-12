import "dotenv/config.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || Buffer.byteLength(JWT_SECRET, "utf8") < 32) {
  throw new Error("JWT_SECRET is missing or too short");
}

export function requireAuth(req, res, next) {
  // 1. Read the cookie
  const token = req.cookies?.access_token;

  // 2. No token  = unauthorized
  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }
  try {
    // 3. Verify token signature and claims
    const payload = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: "smart-travel-planner",
      audience: "smart-travel-api",
    });
    // 4. Validate subject
    if (typeof payload === "string" || !payload.sub) {
      return res.status(401).json({
        message: "Invalid authentication token",
      });
    }
    // 5. Attach authenticated identity
    req.auth = {
      userId: payload.sub,
    };

    // 6. Continue to protected route
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
}
