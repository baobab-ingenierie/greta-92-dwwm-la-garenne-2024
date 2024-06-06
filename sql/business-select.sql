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