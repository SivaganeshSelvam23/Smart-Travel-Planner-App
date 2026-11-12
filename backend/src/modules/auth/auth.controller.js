import { registerSchema, loginSchema } from "./auth.schema.js";
import { registerUser, loginUser } from "./auth.service.js";
import { generateAccessToken } from "../../utils/token.js";
import { findUserById } from "./auth.repository.js";

export async function register(req, res) {
  // 1. Validate the incoming JSON
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
  try {
    // 2. Call the service using validated data
    const user = await registerUser(validation.data);

    // 3. Send success response
    return res.status(201).json({
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    // 4. Handel duplicate email
    if (error.code === "23505") {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }
    // 5. Handle unexpected errors
    console.log("Registration error: ", error.code || error.name);

    return res.status(500).json({
      message: "Unable to create account",
    });
  }
}

export async function login(req, res) {
  // Step 1: Validate login data
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      error: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  try {
    // Step 2: Verify user credentials
    const user = await loginUser(validation.data);

    // Step 3: Handel invalid credentials
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Step 4: Return successful verification
    // Generate a signed JWT for the verified user
    const token = generateAccessToken(user.id);
    // Send the JWT through an HttpOnly cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });
    // Return safe user information
    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    // Step 5: Handel unexpected errors
    console.error("Login error:", error.code || error.name);
  }

  return res.status(500).json({
    message: "Unable to process login",
  });
}

export async function getMe(req, res) {
  try {
    const userId = req.auth.userId;
    const user = await findUserById(userId);

    if (!user) {
      return res.status(401).json({
        message: "Autentication required",
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error.code || error.name);
    return res.status(500).json({
      message: "Unable to retrive user profile.",
    });
  }
}

export function logout(req, res) {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
}
