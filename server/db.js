require("dotenv").config();
const { Pool } = require("pg");
// define these in a personal .env file with your personal credentials that you wont push to github
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

//Test connection
(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connected to DB:", res.rows[0]);
  } catch (err) {
    console.error("Database connection error:", err.message);
  } finally {
    pool.end();
  }
})();

module.exports = pool;
