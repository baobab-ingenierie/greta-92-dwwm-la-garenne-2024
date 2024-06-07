-- Prénom, sexe, mail et age des candidats : PROJECTION
SELECT fname, 
        sex, 
        mail, 
        FLOOR(DATEDIFF(NOW(), dob)/365.25) AS age
FROM candidate
;

-- Prénom, ddn et salaire des candidats habitant dans les
-- départements 38, 13, 45 ou 88 et prétendant à un salaire
-- compris entre 2000 et 2500
SELECT fname,
        dob,
        salary
FROM candidate
WHERE dept IN ('38','13','45','88')
AND salary BETWEEN 2000 AND 2500
;

-- Active: 1717678293004@@127.0.0.1@3306@business
-- Nom des sociétés et le nom du pays dans
-- lequel elle est installée
SELECT company.name, country.name
FROM company, country
WHERE company.a2 = country.a2 -- jointure
;
SELECT cm.name AS société,
        ct.name AS pays
FROM company cm JOIN country ct
    ON cm.a2 = ct.a2 -- jointure interne
;

-- Liste des pays qui n'ont pas de société
SELECT ct.name AS pays, cp.name AS société
FROM company cp RIGHT OUTER JOIN country ct ON cp.a2 = ct.a2
WHERE cp.name IS NULL
ORDER BY pays
;

-- Nombre de sociétés par pays triés dans
-- l'ordre décroissant
SELECT ct.name AS pays,
        COUNT(cp.name) AS nb_société
FROM company cp JOIN country ct
    ON cp.a2 = ct.a2
-- WHERE nb_société > 9
WHERE ct.a2 != 'MG'
GROUP BY ct.name
-- HAVING nb_société > 9 -- MySQL
HAVING COUNT(cp.name) > 9 -- Universel
ORDER BY nb_société DESC
LIMIT 3
;

-- Dans quels départements vivent les
-- candidats ayant postulés pour des
-- société basées en Chine
SELECT DISTINCT ca.dept, ct.name
FROM candidate ca 
    JOIN register re ON ca.id_cnd = re.id_cnd
    JOIN company cp ON re.id_cmp = cp.id_cmp
    JOIN country ct ON ct.a2 = cp.a2
WHERE ct.name IN ('maroc','algérie','tunisie')
AND ca.dept IS NOT NULL
;