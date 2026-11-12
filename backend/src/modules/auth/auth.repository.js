import pool from "../../config/db.js";

export async function createUser({ name, email, passwordHash }) {
  const query = `
        INSERT INTO users(name, email, password_hash)
        VALUES ($1,$2,$3)
        RETURNING id, name, email
    `;
  const values = [name, email, passwordHash];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function findUserByEmail(email) {
  const query = `
        SELECT id,name,email,password_hash 
        FROM users
        WHERE LOWER(email) = LOWER($1)
  `;
  const result = await pool.query(query, [email]);
  return result.rows[0] ?? null;
}

export async function findUserById(userId) {
  const query = `
    SELECT id, name, email
    FROM users
    WHERE id = $1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows[0] ?? null;
}
