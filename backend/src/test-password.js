import argon2 from "argon2";

async function testPassword() {
  const password = "TravelPassword123!";

  // Step 1: Hash the password
  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  // Step 2: Verify the correct password
  const correct = await argon2.verify(passwordHash, "TravelPassword123!");

  // Step 3: Verify an incorrect password
  const incorrect = await argon2.verify(passwordHash, "WrongPassword123!");

  console.log("Hash algorithm:", passwordHash.split("$")[1]);
  console.log("Correct password:", correct);
  console.log("Incorrect password:", incorrect);
}

testPassword().catch((error) => {
  console.error("Password test failed:", error.message);
  process.exitCode = 1;
});
