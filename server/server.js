const pool = require("./db"); // ← Imports the shared Postgres pool from server/db.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000; // ✅ choose env PORT, fallback to 3000
// Simple healthcheck route to prove API can reach the Postgres container.
app.get("/db-ping", async (req, res) => {
  // ← Define GET /db-ping for a quick DB connectivity check
  try {
    const result = await pool.query("SELECT 1 AS ok"); // ← Runs a trivial query; if it works, DB connection is good
    res.json({ ok: true, db: result.rows[0] }); // ← Send success JSON back to the client
  } catch (err) {
    console.error("DB ping failed:", err); // ← Log the real error to the server console for debugging
    res.status(500).json({ ok: false, error: err.message }); // ← Send a safe error payload to the client
  }
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
