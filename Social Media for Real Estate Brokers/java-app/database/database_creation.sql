START TRANSACTION;

-------------------- DROP TABLES --------------------
DROP TABLE IF EXISTS reply;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS member_company;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS company;


-------------------- MAKE TABLES --------------------
CREATE TABLE member (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    salt VARCHAR (255) NOT NULL,
    stored_hash VARCHAR (100) NOT NULL
);

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
	name VARCHAR (255) NOT NULL,
	description VARCHAR (255)
);


CREATE TABLE member_company (
    member_id INT,
	company_id INT,
	CONSTRAINT fk_member_id FOREIGN KEY (member_id) REFERENCES member (id),
	CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    member_id INT,
	num_of_likes INT,
    CONSTRAINT fk_member_id FOREIGN KEY (member_id) REFERENCES member (id)
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    post_id INT,
	commenter_id INT,
	num_of_likes INT,
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES post (id),
	CONSTRAINT fk_commenter_id FOREIGN KEY (commenter_id) REFERENCES member (id)
);

CREATE TABLE reply (
    id SERIAL PRIMARY KEY,
    comment_id INT,
	replier_id INT,
	num_of_likes INT,
    CONSTRAINT fk_comment_id FOREIGN KEY (comment_id) REFERENCES comment (id),
	CONSTRAINT fk_replier_id FOREIGN KEY (replier_id) REFERENCES member (id)
);


COMMIT;

SELECT username, stored_hash FROM member;

