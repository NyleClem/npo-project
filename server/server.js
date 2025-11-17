const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const pool = require("./db"); // ← Imports the shared Postgres pool from server/db.js
const express = require("express");
const cors = require("cors");
const { parsePlayCsv } = require("./csvPlayParser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000; //  choose env PORT, fallback to 3000
// healthcheck route to prove API can reach the Postgres container.
app.get("/db-ping", async (req, res) => {
  // ← Define GET /db-ping for a quick DB connectivity check
  try {
    const result = await pool.query("SELECT 1 AS ok"); // ← if it works, DB connection is good
    res.json({ ok: true, db: result.rows[0] }); // ← Send success JSON back to the client
  } catch (err) {
    console.error("DB ping failed:", err); // ← Log the real error to the server console for debugging
    res.status(500).json({ ok: false, error: err.message }); // ← Send a safe error payload to the client
  }
});
//DB ROUTES TESTING
//Create a new Play
app.post("/play", async (req, res) => {
  try {
    const { game_id, play_id, down, epa, success } = req.body;
    const newPlay = await pool.query(
      "INSERT INTO plays (game_id,play_id,down,epa,success)VALUES($1,$2,$3,$4,$5) RETURNING *",
      [game_id, play_id, down, epa, success]
    );
    res.json(newPlay.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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

    // 🔹 Parse the CSV into normalized rows (no DB insert yet)
    const { rows, malformedCount } = await parsePlayCsv(req.file.path);

    // 🔹 LOG A SAMPLE ROW HERE
    if (rows.length > 0) {
      console.log("Sample normalized row:", rows[0]);
    } else {
      console.log("No valid rows parsed from CSV.");
    }

    console.log(
      `Parsed CSV: ${rows.length} valid rows, ${malformedCount} malformed rows`
    );

    // For this sprint, just return counts + a sample
    return res.status(200).json({
      success: true,
      rowCount: rows.length,
      malformedCount,
      // sampleRow: rows[0] || null, // uncomment if you want to debug via API
    });
  } catch (err) {
    if (err.code === "MISSING_HEADERS") {
      console.error("CSV header validation failed:", err.message);
      return res.status(400).json({ success: false, message: err.message });
    }

    console.error("CSV parse error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to parse CSV.",
    });
  }
});

//Get all Plays
app.get("/play", async (req, res) => {
  try {
    const allPlays = await pool.query("SELECT * FROM plays");
    res.json(allPlays.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
