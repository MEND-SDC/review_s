DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c "reviews";

DROP TABLE IF EXISTS users, reviews, locations, rating;

CREATE TABLE users
(
 id SERIAL PRIMARY KEY,
 first_name VARCHAR(20) NOT NULL,
 last_name VARCHAR(30),
 email VARCHAR(40) NOT NULL,
 join_date TEXT NOT NULL,
 image_url  VARCHAR(100),
 city VARCHAR(30) NOT NULL,
 "state" VARCHAR(30)
);

CREATE TABLE rating
(
 id SERIAL PRIMARY KEY,
 rating_avg REAL DEFAULT 0.0,
 checking_avg REAL DEFAULT 0.0,
 accuracy_avg REAL DEFAULT 0.0,
 value_avg REAL DEFAULT 0.0,
 communication_avg REAL DEFAULT 0.0,
 location_avg REAL DEFAULT 0.0,
 cleanliness_avg REAL DEFAULT 0.0
);

CREATE TABLE locations 
(
 id SERIAL PRIMARY KEY,
 title VARCHAR(40) NOT NULL,
 loc_address VARCHAR(80) NOT NULL,
 users_id INTEGER REFERENCES users(id),
 rating_id INTEGER REFERENCES rating(id)
);

CREATE TABLE reviews
(
 id SERIAL PRIMARY KEY,
 review_date TEXT NOT NULL,
 review_text TEXT NOT NULL,
 users_id INTEGER REFERENCES users(id),
 locations_id INTEGER REFERENCES locations(id)
);


