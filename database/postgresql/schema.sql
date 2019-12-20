SCHEMA: accounts

DROP SCHEMA accounts ;

CREATE SCHEMA accounts
    AUTHORIZATION postgres;

    CREATE TABLE accounts.user_info
(
    user_id bigint NOT NULL DEFAULT nextval('accounts.personal_info_info_id_seq'::regclass),
    legal_name character varying COLLATE pg_catalog."default" NOT NULL,
    gender character varying COLLATE pg_catalog."default",
    "DOB" date NOT NULL,
    email_address date NOT NULL,
    phone_number integer NOT NULL,
    emergency_contact integer,
    join_date date NOT NULL,
    image_url character varying COLLATE pg_catalog."default",
    host boolean NOT NULL,
    address character varying COLLATE pg_catalog."default",
    CONSTRAINT personal_info_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE accounts.user_info
    OWNER to postgres;

-- Table: accounts.reviews

-- DROP TABLE accounts.reviews;

CREATE TABLE accounts.reviews
(
    reviews_id integer NOT NULL DEFAULT nextval('accounts.reviews_reviews_id_seq'::regclass),
    post_date date NOT NULL,
    host_response_date date,
    host_response character varying COLLATE pg_catalog."default",
    check_in_rating real,
    accuracy_rating real,
    value_rating real,
    "communication_rating " real,
    location_rating real,
    clean_rating real,
    CONSTRAINT reviews_pkey PRIMARY KEY (reviews_id),
    CONSTRAINT user_id FOREIGN KEY (reviews_id)
        REFERENCES accounts.user_info (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE accounts.reviews
    OWNER to postgres;

-- Table: accounts.location

-- DROP TABLE accounts.location;

CREATE TABLE accounts.location
(
    location_id integer NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT location_pkey PRIMARY KEY (location_id),
    CONSTRAINT rating_id FOREIGN KEY (location_id)
        REFERENCES accounts.rating (rating_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT user_id FOREIGN KEY (location_id)
        REFERENCES accounts.user_info (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE accounts.location
    OWNER to postgres;

-- Table: accounts.rating

-- DROP TABLE accounts.rating;

CREATE TABLE accounts.rating
(
    rating_id integer NOT NULL,
    rating_avg real NOT NULL,
    checking_avg real NOT NULL,
    accuracy_avg real NOT NULL,
    value_avg real NOT NULL,
    "communication_avg " real NOT NULL,
    location_avg real NOT NULL,
    cleanliness_avg real NOT NULL,
    CONSTRAINT rating_pkey PRIMARY KEY (rating_id),
    CONSTRAINT location_id FOREIGN KEY (rating_id)
        REFERENCES accounts.location (location_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE accounts.rating
    OWNER to postgres;