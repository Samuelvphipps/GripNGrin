
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "created_date" DATE NOT NULL DEFAULT 'now()',
    "profile_pic" VARCHAR(255) NOT NULL,
    "about me" VARCHAR NOT NULL,
    "access_level" INT DEFAULT '1'
);


CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255),
	"species" VARCHAR(255),
	"hunt_area_id" INT REFERENCES "hunt_area",
	"date_of_hunt" DATE,
	"success" VARCHAR,
	"picture" VARCHAR,
	"content" VARCHAR,
	"created" DATE DEFAULT 'now()',
	"user_id" INT REFERENCES "user",
	"land_type" varchar(255),
	"Flagged" BOOLEAN DEFAULT 'false');



CREATE TABLE "liked_post" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"post_id" INT REFERENCES "posts");


CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"content" VARCHAR,
	"created" DATE DEFAULT 'now()',
	"user_id" INT REFERENCES "user",
	"post_id" INT REFERENCES "posts",
	"parent_comment_id" INT);




CREATE TABLE "hunt_area" (
	"id" SERIAL PRIMARY KEY,
	"county" INT NOT NULL);










