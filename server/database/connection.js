const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "HOST",
    user: "USER",
    password: "PASSWORD",
    database: "DATABASE"
  }
});

module.exports = knex;

/*
USERS
MariaDB [db_blog]> CREATE TABLE tbl_users(
    -> id INT AUTO_INCREMENT PRIMARY KEY,
    -> firstName VARCHAR(50) NOT NULL,
    -> lastName VARCHAR(50),
    -> username VARCHAR(30) NOT NULL UNIQUE,
    -> email VARCHAR(100) NOT NULL UNIQUE,
    -> password VARCHAR(20) NOT NULL,
    -> createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -> );
Query OK, 0 rows affected (0.013 sec)

POSTS
MariaDB [db_blog]> CREATE TABLE tbl_posts(
    -> id INT AUTO_INCREMENT PRIMARY KEY,
    -> title VARCHAR(30) NOT NULL,
    -> slug VARCHAR(10) NOT NULL,
    -> body TEXT NOT NULL,
    -> user_id INT NOT NULL,
    -> FOREIGN KEY (user_id)
    -> REFERENCES tbl_users(id),
    -> createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -> );
Query OK, 0 rows affected (0.016 sec)

COMMENTS
MariaDB [db_blog]> CREATE TABLE tbl_comments(
    -> id INT AUTO_INCREMENT PRIMARY KEY,
    -> body TEXT NOT NULL,
    -> post_id INT NOT NULL,
    -> FOREIGN KEY (post_id)
    -> REFERENCES tbl_posts(id),
    -> user_id INT NOT NULL,
    -> FOREIGN KEY (user_id)
    -> REFERENCES tbl_users(id)
    -> );
Query OK, 0 rows affected (0.021 sec)
*/