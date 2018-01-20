USE swap_database;

INSERT INTO user(name, email, phone, address, password) VALUES('Mary', 'mary@gmail.com', '514-456-8800', '410 Avenue Édouard-Charles, Outremont, QC H2V 2N4, Canada', 'mary');
INSERT INTO user(name, email, phone, address, password) VALUES('Guy', 'guy@hotmail.com', '514-774-8919', '4351 Rue St-Hubert, Montréal, QC H2J 2X1, Canada', 'guy');
INSERT INTO user(name, email, phone, address, password) VALUES('Gerard', 'gerard@gmail.com', '514-888-8563', '3971 Boul St-Laurent, Montréal, QC H2W 1Y4, Canada', 'gerard');
INSERT INTO user(name, email, phone, address, password) VALUES('Paul', 'paul@yahoo.com', '514-910-8763', '4519 QC-335, Montréal, QC H2J 2L4, Canada', 'paul');


INSERT INTO wanted_item(user_id, name) VALUES(1, 'Perceuse');
INSERT INTO wanted_item(user_id, name) VALUES(1, 'Marteau');

INSERT INTO wanted_item(user_id, name) VALUES(2, 'Livre - Elon Musk');

INSERT INTO wanted_item(user_id, name) VALUES(4, 'Ordinateur');

INSERT INTO wanted_item(user_id, name, deleted) VALUES(2, 'Ipad', TRUE);
INSERT INTO wanted_item(user_id, name, deleted) VALUES(3, 'Pinceau', TRUE);


INSERT INTO offered_item(user_id, name) VALUES(1, 'Livre - Elon Musk');
INSERT INTO offered_item(user_id, name) VALUES(1, 'Ordinateur');

INSERT INTO offered_item(user_id, name) VALUES(2, 'Perceuse');
INSERT INTO offered_item(user_id, name) VALUES(2, 'Marteau');

INSERT INTO offered_item(user_id, name) VALUES(4, 'Perceuse');
INSERT INTO offered_item(user_id, name) VALUES(4, 'Marteau');

INSERT INTO offered_item(user_id, name, deleted) VALUES(2, 'Pinceau', TRUE);
INSERT INTO offered_item(user_id, name, deleted) VALUES(3, 'Ipad', TRUE);

INSERT INTO offer(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date) VALUES(1, 2, 1, 1, 3, 3, '2018-02-01', '2008-02-08');

INSERT INTO swap(from_user_id, to_user_id, from_user_offered_item_id, from_user_wanted_item_id, to_user_offered_item_id, to_user_wanted_item_id, start_date, end_date) VALUES(2, 3, 5, 5, 6, 6, '2018-01-15', '2008-01-22');
