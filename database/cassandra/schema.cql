CREATE KEYSPACE airreviews WITH replication = 
  {'class' = 'SimpleStrategy', 'replication_factor': '2'};

USE airreviews;

DROP TABLE IF EXISTS user_info;

CREATE TABLE user_info(
    id bigint,
    legal_name text,
    gender text,
    date_of_birth date,
    email_address text,
    phone_number int,
    emergency_contact int,
    join_date date,
    image_url text,
    host boolean,
    user_address text,
    PRIMARY KEY (id),
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews(
    reviews_id bigint,
    user_id bigint,
    post_date date,
    host_response_date date,
    host_response text,
    check_in_rating decimal,
    accuracy_rating decimal,
    value_rating decimal,
    communication_rating decimal,
    location_rating decimal,
    clean_rating decimal,
    PRIMARY KEY (reviews_id, user_id),
);

DROP TABLE IF EXISTS locations;

CREATE TABLE locations(
    loc_id bigint,
    user_id bigint,
    rating_id bigint,
    title text,
    address text,
    PRIMARY KEY (loc_id, user_id, rating_id),
);

CREATE TABLE rating(
    rating_id bigint,
    rating_avg decimal,
    checking_avg decimal,
    accuracy_avg decimal,
    value_avg decimal,
    communication_avg decimal,
    location_avg decimal,
    cleanliness_avg decimal,
)