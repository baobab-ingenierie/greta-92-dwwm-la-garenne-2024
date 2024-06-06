-- Utilise la BDD
USE business
;

-- Vide la table et remet le compteur à zéro
DELETE FROM candidate;
-- TRUNCATE TABLE candidate;
ALTER TABLE candidate AUTO_INCREMENT = 1;

-- Insère quelques lignes dans la table "CANDIDATE"
INSERT INTO candidate(fname,dob,mail,sex,comm) VALUES
    ('Najwa','1996-06-23','najwa@gmail.com','F',null),
    ('Hadjer','2001-05-28','hadjer@yahoo.fr','F','Pas dispo avant juillet'),
    ('Feras','1998-07-12','feras@sauvage.fr','M',null)
;