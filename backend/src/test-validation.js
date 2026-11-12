import { registerSchema } from "./modules/auth/auth.schema.js";

const userInput = {
  name: "Arun Kumar",
  email: "arun@example.com",
  password: "SecurePassword123!",
  confirmPassword: "SecurePassword123!",
};

const result = registerSchema.safeParse(userInput);

if (!result.success) {
  console.log(result.error.issues);
} else {
  console.log("Validation successful!");
}
