
CREATE TABLE "Periods" (
    "period_id" SERIAL   NOT NULL,
    "week" datetime64   NOT NULL,
    CONSTRAINT "pk_Periods" PRIMARY KEY (
        "period_id"
     )
);

CREATE TABLE "Genres" (
    "genre_id" SERIAL   NOT NULL,
    "genre_name" VARCHAR(30)   NOT NULL,
    CONSTRAINT "pk_Genres" PRIMARY KEY (
        "genre_id"
     )
);

CREATE TABLE "Tracks" (
    "track_id" INT   NOT NULL,
    "period_id" INT   NOT NULL,
    "genre_id" INT   NOT NULL,
    "track_title" VARCHAR(30)   NOT NULL,
    "track_artist" VARCHAR(30)   NOT NULL,
    "danceability" DECIMAL(5,4)   NOT NULL,
    "energy" DECIMAL(5,4)   NOT NULL,
    "loudness" DECIMAL(5,4)   NOT NULL,
    "speechiness" DECIMAL(5,4)   NOT NULL,
    "acousticness" DECIMAL(5,4)   NOT NULL,
    "instrumentalness" DECIMAL(5,4)   NOT NULL,
    "liveness" DECIMAL(5,4)   NOT NULL,
    "valence" DECIMAL(5,4)   NOT NULL,
    "tempo" INT   NOT NULL,
    "duration" INT   NOT NULL,
    CONSTRAINT "pk_Tracks" PRIMARY KEY (
        "track_id"
     )
);

ALTER TABLE "Tracks" ADD CONSTRAINT "fk_Tracks_period_id" FOREIGN KEY("period_id")
REFERENCES "Periods" ("period_id");

ALTER TABLE "Tracks" ADD CONSTRAINT "fk_Tracks_genre_id" FOREIGN KEY("genre_id")
REFERENCES "Genres" ("genre_id");

