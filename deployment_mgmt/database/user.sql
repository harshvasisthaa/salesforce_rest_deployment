CREATE TABLE IF NOT EXISTS Users (
		 user_id 	 INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		 username 	 VARCHAR(255) NOT NULL UNIQUE,
		 password 	 VARCHAR(255) NOT NULL

);
CREATE TABLE IF NOT EXISTS Sessions (
		 session_id 	 VARCHAR(30) NOT NULL,
		 timestamp 	 DATETIME NOT NULL,
		 user_id 	 INTEGER NOT NULL REFERENCES Users (user_id)
);
CREATE VIEW IF NOT EXISTS session_user_view AS 
SELECT users.user_id as user_id,
		users.username as username,
		sessions.session_id as session_id,
		sessions.timestamp as timestamp 
FROM users 
JOIN sessions on(users.user_id = sessions.user_id);

INSERT INTO Users(username, password)
VALUES
		('harsh@rawat.com', '590e5f9a586a20bf6384a207d8d6f34aefa2b10e25f106a7753ca9f453d1d7e6');