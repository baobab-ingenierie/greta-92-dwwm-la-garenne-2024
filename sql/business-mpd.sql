CREATE TABLE candidate(
   id_cnd INT AUTO_INCREMENT,
   fname VARCHAR(30)  NOT NULL,
   dob DATE,
   mail VARCHAR(100) ,
   sex CHAR(1) ,
   dept CHAR(2) ,
   city VARCHAR(255) ,
   salary DECIMAL(7,2)  ,
   job VARCHAR(50) ,
   comm VARCHAR(100) ,
   PRIMARY KEY(id_cnd),
   UNIQUE(mail)
);

CREATE TABLE country(
   a2 CHAR(2) ,
   a3 CHAR(3)  NOT NULL,
   num SMALLINT NOT NULL,
   name VARCHAR(100)  NOT NULL,
   continent VARCHAR(100) ,
   PRIMARY KEY(a2),
   UNIQUE(a3),
   UNIQUE(num)
);

CREATE TABLE company(
   id_cmp INT AUTO_INCREMENT,
   name VARCHAR(100)  NOT NULL,
   address VARCHAR(255) ,
   zip VARCHAR(20) ,
   city VARCHAR(100) ,
   a2 CHAR(2)  NOT NULL,
   PRIMARY KEY(id_cmp),
   FOREIGN KEY(a2) REFERENCES country(a2)
);

CREATE TABLE register(
   id_cnd INT,
   id_cmp INT,
   PRIMARY KEY(id_cnd, id_cmp),
   FOREIGN KEY(id_cnd) REFERENCES candidate(id_cnd),
   FOREIGN KEY(id_cmp) REFERENCES company(id_cmp)
);
