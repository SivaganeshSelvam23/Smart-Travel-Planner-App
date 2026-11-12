import { loginSchema } from "./modules/auth/auth.schema.js";
import { loginUser } from "./modules/auth/auth.service.js";
import pool from "./config/db.js";

async function testLogin() {
  const input = {
    email: "traveltest@example.com",
    password: "SecureTravel123!",
  };
  const validation = loginSchema.safeParse(input);
  if (!validation.success) {
    console.log(validation.error.issues);
    return;
  }

  const user = await loginUser(validation.data);
  if (!user) {
    console.log("Invalid email or password.");
    return;
  }
  console.log("Login credentials verified!");
  console.log(user);
}

try {
  await testLogin();
} catch (error) {
  console.error("Login test failed:", error.code || error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
