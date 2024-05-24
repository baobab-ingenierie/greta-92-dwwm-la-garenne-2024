/**
 * Renvoie un âge en années à partir de deux dates
 * @param {string} date1 - une date
 * @param {string} date2 - une autre date
 * @return {number}
 */
function age(date1, date2 = new Date()) {
    let d1 = new Date(date1), d2 = new Date(date2);
    if (isNaN(d1) || isNaN(d2)) {
        throw 'L\'une des deux dates est incorrecte ! Utiliser l\'un des deux formats suivants : "mm/dd/yyyy" ou "yyyy-mm-dd"';
    } else {
        let result = Math.abs((d2 - d1) / 1000 / 60 / 60 / 24 / 365.25);
        return parseInt(result);
    }
}