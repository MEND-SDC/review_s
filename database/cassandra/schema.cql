DROP KEYSPACE IF EXISTS reviews;

CREATE KEYSPACE reviews WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : '2'};

DROP TABLE IF EXISTS reviews.users;

CREATE TABLE reviews.users (
 user_id bigint,
 first_name text,
 last_name text,
 email text,
 join_date text,
 image_url text,
 city text,
 state text,
 PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS reviews.rating;

CREATE TABLE reviews.rating (
 rating_id bigint,
 rating_avg decimal,
 checking_avg decimal,
 accuracy_avg decimal,
 value_avg decimal,
 communication_avg decimal,
 location_avg decimal,
 cleanliness_avg decimal,
 PRIMARY KEY (rating_id)
);

DROP TABLE IF EXISTS reviews.locations;

CREATE TABLE reviews.locations (
 locations_id bigint,
 title text,
 loc_address text,
 user_id int,
 rating_id int,
 PRIMARY KEY (locations_id, user_id, rating_id)
);

DROP TABLE IF EXISTS reviews.rev;

CREATE TABLE reviews.rev (
 reviews_id bigint,
 review_date text,
 review_text text,
 user_id int,
 locations_id int,
 PRIMARY KEY (reviews_id, user_id, locations_id)
);
