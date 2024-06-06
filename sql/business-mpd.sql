-- Supprime la BDD "BUSINESS" si existe
DROP DATABASE IF EXISTS business
;

-- Crée la BDD "BUSINESS"
CREATE DATABASE business
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci -- case insensitive
;

-- Utilise la BDD
USE business
;

-- CREATE la table "CANDIDATE"
CREATE TABLE business.candidate(
    id_cnd INT AUTO_INCREMENT 
        PRIMARY KEY,
    fname VARCHAR(30) 
        NOT NULL,
    dob DATE,
    mail VARCHAR(100) 
        UNIQUE,
    sex CHAR(1) 
        CHECK (sex IN ('F','M','A')),
    dept CHAR(2),
    city CHAR(5),
    salary DECIMAL(7,2) 
        CHECK (salary BETWEEN 1500 AND 6000),
    job VARCHAR(20),
    comm VARCHAR(100)
) ENGINE = InnoDB;

ALTER TABLE business.candidate
    ALTER salary SET DEFAULT 1500
;

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