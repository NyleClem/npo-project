const fs = require("fs");
const csv = require("csv-parser");

// Internal table names mapped to csv actual names
const CSV_COLUMN_MAP = {
  game_id: "game_id",
  play_id: "play_id",
  season: "season",
  week: "week",
  home_team: "home_team",
  away_team: "away_team",
  offense_team: "posteam",
  defense_team: "defteam",
  quarter: "qtr",
  down: "down",
  distance: "ydstogo",
  yardline_100: "yardline_100",
  goal_to_go: "goal_to_go",
  play_type: "play_type",
  shotgun: "shotgun",
  no_huddle: "no_huddle",
  pass_length: "pass_length",
  pass_location: "pass_location",
  run_location: "run_location",
  run_gap: "run_gap",
  yards_gained: "yards_gained",
  epa: "epa",
  success: "success",
  description: "desc",
};

// The fields required in our db table (for this sprint / placeholder engine)
const REQUIRED_FIELDS = [
  "game_id",
  "play_id",
  "down",
  "distance",
  "play_type",
  "yards_gained",
  "no_huddle",
  "epa",
  "offense_team",
  "defense_team",
];

// The actual CSV headers we want, derived from the map
const REQUIRED_CSV_HEADERS = REQUIRED_FIELDS.map(
  (field) => CSV_COLUMN_MAP[field]
);

// Validate headers using the CSV names (file-level validation)
function validateHeaders(headers) {
  const missing = REQUIRED_CSV_HEADERS.filter(
    (csvHeader) => !headers.includes(csvHeader)
  );

  if (missing.length > 0) {
    const message = `Missing required columns in CSV: ${missing.join(", ")}`;
    const err = new Error(message);
    err.code = "MISSING_HEADERS";
    throw err;
  }
}

// helper functions
function toInt(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? null : n;
}

function toFloat(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = parseFloat(value);
  return Number.isNaN(n) ? null : n;
}

// For columns like goal_to_go, shotgun, no_huddle, success (0/1, true/false, etc.)
function toBool(value) {
  if (value === undefined || value === null || value === "") return null;
  const s = String(value).toLowerCase().trim();
  if (s === "1" || s === "true" || s === "t" || s === "yes") return true;
  if (s === "0" || s === "false" || s === "f" || s === "no") return false;
  return null; // treat weird values as null, caller can decide if that's malformed
}

// Normalizing using map (row-level normalization)
function normalizeRow(raw) {
  return {
    game_id: raw[CSV_COLUMN_MAP.game_id] || null,
    play_id: raw[CSV_COLUMN_MAP.play_id] || null,

    season: toInt(raw[CSV_COLUMN_MAP.season]),
    week: toInt(raw[CSV_COLUMN_MAP.week]),

    home_team: raw[CSV_COLUMN_MAP.home_team] || null,
    away_team: raw[CSV_COLUMN_MAP.away_team] || null,

    offense_team: raw[CSV_COLUMN_MAP.offense_team] || null,
    defense_team: raw[CSV_COLUMN_MAP.defense_team] || null,

    quarter: toInt(raw[CSV_COLUMN_MAP.quarter]),
    down: toInt(raw[CSV_COLUMN_MAP.down]),
    distance: toInt(raw[CSV_COLUMN_MAP.distance]),
    yardline_100: toInt(raw[CSV_COLUMN_MAP.yardline_100]),

    goal_to_go: toBool(raw[CSV_COLUMN_MAP.goal_to_go]),

    play_type: raw[CSV_COLUMN_MAP.play_type] || null,

    shotgun: toBool(raw[CSV_COLUMN_MAP.shotgun]),
    no_huddle: toBool(raw[CSV_COLUMN_MAP.no_huddle]),

    pass_length: raw[CSV_COLUMN_MAP.pass_length] || null,
    pass_location: raw[CSV_COLUMN_MAP.pass_location] || null,

    run_location: raw[CSV_COLUMN_MAP.run_location] || null,
    run_gap: raw[CSV_COLUMN_MAP.run_gap] || null,

    yards_gained: toInt(raw[CSV_COLUMN_MAP.yards_gained]),
    epa: toFloat(raw[CSV_COLUMN_MAP.epa]),

    success: toBool(raw[CSV_COLUMN_MAP.success]),

    description: raw[CSV_COLUMN_MAP.description] || null,
  };
}

/*
  Parse a CSV file at filePath into normalized rows.
  - Validates required headers
 - Normalizes each row using CSV_COLUMN_MAP
  - Skips malformed rows and counts them
 */
function parsePlayCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    let malformedCount = 0;

    const stream = fs.createReadStream(filePath).pipe(csv());

    // Validate headers once at the start
    stream.on("headers", (headers) => {
      try {
        validateHeaders(headers);
      } catch (err) {
        // Stop the stream and reject if headers are bad
        stream.destroy();
        return reject(err);
      }
    });

    stream.on("data", (row) => {
      try {
        const normalized = normalizeRow(row);

        // Row-level required checks for this sprint:
        //  treat rows missing core identity/situation fields as malformed.
        const coreMissing =
          !normalized.game_id ||
          !normalized.play_id ||
          normalized.down === null ||
          normalized.distance === null ||
          normalized.play_type === null ||
          normalized.yards_gained === null ||
          !normalized.offense_team ||
          !normalized.defense_team;

        if (coreMissing) {
          malformedCount += 1;
          return; // skip this row
        }

        rows.push(normalized);
      } catch (err) {
        malformedCount += 1;
      }
    });

    stream.on("end", () => {
      resolve({ rows, malformedCount });
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = {
  CSV_COLUMN_MAP,
  REQUIRED_FIELDS,
  validateHeaders,
  normalizeRow,
  parsePlayCsv,
};
