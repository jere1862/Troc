DROP DATABASE IF EXISTS swap_database;
CREATE DATABASE swap_database;

USE swap_database;

CREATE TABLE user(
	id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    address VARCHAR(1000) NOT NULL,
    password VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (id)
);

CREATE TABLE offered_item(
	id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    visible BOOL DEFAULT TRUE,
    
    PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE wanted_item(
	id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    visible BOOL DEFAULT TRUE,
    
    PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE offer(
	id INT NOT NULL AUTO_INCREMENT,
    from_user_id INT NOT NULL,
    to_user_id INT NOT NULL,
    from_user_offered_item_id INT NOT NULL,
    from_user_wanted_item_id INT NOT NULL,
    to_user_offered_item_id INT NOT NULL,
    to_user_wanted_item_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    
    PRIMARY KEY (id),
	FOREIGN KEY (from_user_id) REFERENCES user(id),
    FOREIGN KEY (to_user_id) REFERENCES user(id),
    FOREIGN KEY (from_user_offered_item_id) REFERENCES offered_item(id),
    FOREIGN KEY (from_user_wanted_item_id) REFERENCES wanted_item(id),
    FOREIGN KEY (to_user_offered_item_id) REFERENCES offered_item(id),
    FOREIGN KEY (to_user_wanted_item_id) REFERENCES wanted_item(id)
);

CREATE TABLE swap(
	id INT NOT NULL AUTO_INCREMENT,
    from_user_id INT NOT NULL,
    to_user_id INT NOT NULL,
    from_user_offered_item_id INT NOT NULL,
    from_user_wanted_item_id INT NOT NULL,
    to_user_offered_item_id INT NOT NULL,
    to_user_wanted_item_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    
    PRIMARY KEY (id),
	FOREIGN KEY (from_user_id) REFERENCES user(id),
    FOREIGN KEY (to_user_id) REFERENCES user(id),
    FOREIGN KEY (from_user_offered_item_id) REFERENCES offered_item(id),
    FOREIGN KEY (from_user_wanted_item_id) REFERENCES wanted_item(id),
    FOREIGN KEY (to_user_offered_item_id) REFERENCES offered_item(id),
    FOREIGN KEY (to_user_wanted_item_id) REFERENCES wanted_item(id)
);