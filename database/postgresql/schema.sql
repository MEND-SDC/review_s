DROP DATABASE IF EXISTS airreviews;

CREATE DATABASE airreviews

\c "airreviews";

CREATE TABLE user_info(
    id SERIAL PRIMARY KEY,
    legal_name character NOT NULL,
    gender character,
    date_of_birth date,
    email_address date NOT NULL,
    phone_number integer NOT NULL,
    emergency_contact integer,
    join_date date NOT NULL,
    image_url character,
    host boolean NOT NULL,
    user_address character,
);

CREATE TABLE reviews(
    reviews_id INTEGER NOT NULL,
    user_id INTEGER REFERENCES user_info(id),
    post_date date NOT NULL,
    host_response_date date,
    host_response character,
    check_in_rating real,
    accuracy_rating real,
    value_rating real,
    communication_rating real,
    location_rating real,
    clean_rating real,
    PRIMARY KEY (reviews_id, user_id)
);

CREATE TABLE locations(
    loc_id INTEGER NOT NULL,
    user_id INTEGER REFERENCES user_info(id),
    rating_id INTEGER REFERENCES rating(rating_id),
    title character,
    loc_address character,
    PRIMARY KEY (loc_id, user_id, rating_id),
);

CREATE TABLE rating(
    rating_id SERIAL PRIMARY KEY,
    rating_avg real NOT NULL,
    checking_avg real NOT NULL,
    accuracy_avg real NOT NULL,
    value_avg real NOT NULL,
    communication_avg real NOT NULL,
    location_avg real NOT NULL,
    cleanliness_avg real NOT NULL,
)