import { registerSchema } from "./modules/auth/auth.schema.js";
import { registerUser } from "./modules/auth/auth.service.js";
import pool from "./config/db.js";

async function testRegistration() {
  const input = {
    name: "Test Traveller",
    email: "testtraveller@example.com",
    password: "TravelPassword123!",
    confirmPassword: "TravelPassword123!",
  };

  const validation = registerSchema.safeParse(input);

  if (!validation.success) {
    console.log(validation.error.issues);
    return;
  }

  const user = await registerUser(validation.data);

  console.log("User registered successfully:");
  console.log(user);
}

try {
  await testRegistration();
} catch (error) {
  if (error.code === "23505") {
    console.log("This email is already registered.");
  } else {
    console.error("Registration test failed:", error.code || error.message);
    process.exitCode = 1;
  }
} finally {
  await pool.end();
}
