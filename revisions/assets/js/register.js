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
            'change',
            function () {
                document.querySelector('#valSal').textContent = this.value + " €";
            }
        );
    }
);