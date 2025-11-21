const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const pool = require("./db"); // ← Imports the shared Postgres pool from server/db.js
const express = require("express");
const cors = require("cors");
const { parsePlayCsv } = require("./csvPlayParser");
const { insertPlays } = require("./playInsertService");
const { getAnalyticsPlaceholder } = require("./analyticsPlaceholder");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000; //  choose env PORT, fallback to 3000
// healthcheck route to prove API can reach the Postgres container.
app.get("/db-ping", async (req, res) => {
  //  Define GET /db-ping for a quick DB connectivity check
  try {
    const result = await pool.query("SELECT 1 AS ok"); //  if it works, DB connection is good
    res.json({ ok: true, db: result.rows[0] }); //  Send success JSON back to the client
  } catch (err) {
    console.error("DB ping failed:", err); //  Log the real error to the server console for debugging
    res.status(500).json({ ok: false, error: err.message }); // ← Send a safe error payload to the client
  }
});

// CSV upload with multer
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }

    console.log("Received CSV file:", req.file.originalname);
    console.log("Saved at path:", req.file.path);

    //  Parse the CSV into normalized rows (no DB insert yet)
    const { rows, malformedCount } = await parsePlayCsv(req.file.path);

    // LOG A SAMPLE ROW HERE
    if (rows.length > 0) {
      console.log("Sample normalized row:", rows[0]);
    } else {
      console.log("No valid rows parsed from CSV.");
    }

    console.log(
      `Parsed CSV: ${rows.length} valid rows, ${malformedCount} malformed rows`
    );
    //INSERT parsed rows into the DB
    const { insertedCount, dbErrorCount } = await insertPlays(rows);
    console.log(
      `DB insert summary: inserted=${insertedCount}, dbErrors=${dbErrorCount}`
    );

    // return all counts to the UI
    return res.status(200).json({
      success: true,
      rowCount: rows.length,
      malformedCount,
      insertedCount,
      dbErrorCount,
    });
  } catch (err) {
    if (err.code === "MISSING_HEADERS") {
      console.error("CSV header validation failed:", err.message);
      return res.status(400).json({ success: false, message: err.message });
    }

    console.error("CSV parse/insert error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to parse and insert CSV.",
    });
  }
});

//Get all play information according to filters
app.get("/play", async (req, res) => {
  try {
    // Filters: offense_team, defense_team, down
    const { offense_team, defense_team, down } = req.query;
    const conditions = [];
    const values = [];

    if (offense_team) {
      values.push(offense_team);
      conditions.push(`offense_team = $${values.length}`);
    }
    if (defense_team) {
      values.push(defense_team);
      conditions.push(`defense_team = $${values.length}`);
    }
    if (down) {
      values.push(Number(down));
      conditions.push(`down = $${values.length}`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";
    const sql = `SELECT * FROM plays ${whereClause}`;
    const result = await pool.query(sql, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
// Simple analytics placeholder endpoint
app.get("/analytics", (req, res) => {
  const payload = getAnalyticsPlaceholder();
  res.json(payload);
});
