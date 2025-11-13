
/*Schema for table*/
CREATE TABLE plays(
  game_id TEXT,
  play_id TEXT,
  distance INT,
  down INT,
  quart INT,
  offense TEXT,
  defense TEXT,
  fieldside  TEXT,
description TEXT,
PRIMARY KEY (game_id, play_id)
)
