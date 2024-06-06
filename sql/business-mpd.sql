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
    id_cnd SMALLINT AUTO_INCREMENT 
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