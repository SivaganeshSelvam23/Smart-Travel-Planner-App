import pool from "./config/db.js";

async function testDatabaseConnection() {
  try {
    const result = await pool.query(`
    SELECT
        id,
        name,
        email,
        created_at
    FROM users
    `);

    console.log("PostgreSQL connection successful!");

    console.log(result.rows[0]);
  } catch (error) {
    console.error("Database connection failed:", error.message);

    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

testDatabaseConnection();
