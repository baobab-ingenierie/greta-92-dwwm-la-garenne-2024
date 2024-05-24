/**
 * Evénement : fin de chargement du document
 */
document.addEventListener(
    'DOMContentLoaded',
    function () {
        /**
         * Evénement : changement du salaire
         */
        const elt = document.querySelector('#salary');
        elt.addEventListener(
            'input',
            function () {
                document.querySelector('#valSal').textContent = this.value + " €";
            }
        );
        /**
         * Evénement : changement date de naissance
         */
        document.querySelector('#dob').addEventListener(
            'change',
            function (evt) {
                document.querySelector('#age').textContent = age(evt.target.value) + (age(this.value) > 1 ? ' ans' : ' an');
            }
        );
    }
);