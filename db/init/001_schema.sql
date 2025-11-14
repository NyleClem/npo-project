
/*Schema for table*/
CREATE TABLE plays(
game_id TEXT,
play_id BIGINT,
season  INT,
week    INT,

home_team TEXT,
away_team TEXT,
offense_team TEXT,
defense_team TEXT,

quarter    INT,
down       INT,
ydstogo    INT,
yardline_100 INT,
goal_to_go   BOOLEAN,

play_type  TEXT,
shotgun    BOOLEAN,
no_huddle  BOOLEAN,
pass_length  TEXT,
pass_location  TEXT,
run_location    TEXT,
run_gap         TEXT,

yards_gained    INT,
epa            REAL,
success        BOOLEAN,
description     TEXT,

PRIMARY KEY (game_id, play_id)
)
