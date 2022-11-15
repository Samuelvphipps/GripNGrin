CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "created_date" DATE DEFAULT 'now()',
    "profile_pic" VARCHAR(255),
    "about me" VARCHAR,
    "access_level" INT DEFAULT '1'
);


CREATE TABLE "hunt_area" (
	"id" SERIAL PRIMARY KEY,
	"hunt_area" VARCHAR);



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



INSERT INTO "hunt_area"
	("hunt_area")
VALUES
	(263),(201),(267),(264),(268),(203),(208),(209),(257),(256),(210),(265),(661),(262),(266),
	(297),(298),(251),(258),(239),(269),(270),(240),(241),(259),(246),(248),(214),(213),(273),
	(272),(271),(249),(221),(222),(224),(223),(229),(219),(218),(215),(277),(225),(227),(235),
	(236),(285),(284),(283),(282),(281),(275),(274),(278),(279),(280),(286),(294),(234),(288),
	(295),(238),(237),(250),(289),(296),(252),(105),(290),(291),(292),(299),(230),(253),(254),
	(293),(233),(255),(232),(338),(701),(605),(341),(342),(343),(344),(643),(655),(647),(645),
	(648),(646),(649),(101),(111),(104),(110),(169),(109),(107),(119),(177),(176),(184),(197),
	(172),(171),(679),(173),(199),(181),(182),(178),(132),(133),(130),(131),(117),(126),(155),
	(156),(183),(159),(157),(152),(604),(114),(260),('Red Lake Reservation');


	







