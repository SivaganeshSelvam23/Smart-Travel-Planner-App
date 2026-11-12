import argon2 from "argon2";
import { createUser, findUserByEmail } from "./auth.repository.js";

export async function registerUser(data) {
  // Step 1: Prepare the user information
  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();

  // Step 2: Hash the password securely
  const passwordHash = await argon2.hash(data.password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  // Step 3: Save the user in PostgreSQL
  const user = await createUser({ name, email, passwordHash });

  // Step 4: Return the newly created user
  return user;
}

export async function loginUser(data) {
  // 1. Normalize email
  const email = data.email.trim().toLowerCase();

  // 2. Find user in postgreSQL
  const user = await findUserByEmail(email);

  // 3. Handel unknown email
  if (!email) {
    return null;
  }

  // 4. Verify entered password against stored hash
  const isPasswordValid = await argon2.verify(
    user.password_hash,
    data.password,
  );

  // 5. Handel incorrect password
  if (!isPasswordValid) {
    return null;
  }

  // 6. Return safe user information
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
