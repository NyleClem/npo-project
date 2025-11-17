const pool = require("./db"); //reusing the Pool from db

//Insert an array of normalized play rows into the plays table
// @param {Array<Object>}rows -- takes in normalized rows from parsePlayCsv
//@returns {Promise<{insertedCount: number, dbErrorCount: number}>}

async function insertPlays(rows) {
  let insertedCount = 0;
  let dbErrorCount = 0;
  if (!rows || rows.length === 0) {
    return { insertedCount, dbErrorCount };
  }

  //INSERT query, matching plays table schema
  const text = `
    INSERT INTO plays(
     game_id,
      play_id,
      season,
      week,
      home_team,
      away_team,
      offense_team,
      defense_team,
      quarter,
      down,
      distance,
      yardline_100,
      goal_to_go,
      play_type,
      shotgun,
      no_huddle,
      pass_length,
      pass_location,
      run_location,
      run_gap,
      yards_gained,
      epa,
      success,
      description
    )
    VALUES (
      $1,  $2,  $3,  $4,  $5,  $6,
      $7,  $8,  $9,  $10, $11, $12,
      $13, $14, $15, $16, $17, $18,
      $19, $20, $21, $22, $23, $24
    )`;
  for (const row of rows) {
    const values = [
      row.game_id,
      row.play_id,
      row.season,
      row.week,
      row.home_team,
      row.away_team,
      row.offense_team,
      row.defense_team,
      row.quarter,
      row.down,
      row.distance,
      row.yardline_100,
      row.goal_to_go,
      row.play_type,
      row.shotgun,
      row.no_huddle,
      row.pass_length,
      row.pass_location,
      row.run_location,
      row.run_gap,
      row.yards_gained,
      row.epa,
      row.success,
      row.description,
    ];
    try {
      await pool.query(text, values);
      insertedCount++;
    } catch (err) {
      dbErrorCount++;
      //log error to console
      console.error(
        `DB insert error for play ${row.game_id}/${row.play_id}:`,
        err.message
      );
    }
  }
  return { insertedCount, dbErrorCount };
}
module.exports = { insertPlays };
