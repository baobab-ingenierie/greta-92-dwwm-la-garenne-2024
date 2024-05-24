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

        /**
         * Requête AJAX : liste des départements
         */

        // Etape 1 : instancie l'objet AJAX
        const xhr = new XMLHttpRequest();

        // Etape 2 : ouvre la requête AJAX
        xhr.open('get', 'https://geo.api.gouv.fr/departements?fields=nom,code');

        // Etape 3 : envoie la requête AJAX
        xhr.send();

        // Etape 4 : écoute le retour du serveur
        xhr.addEventListener(
            'readystatechange',
            function () {
                if (xhr.readyState === 4 && (xhr.status === 0 || xhr.status === 200)) {
                    const data = JSON.parse(xhr.responseText);
                    let opt;
                    data.forEach(function (elt) {
                        opt = document.createElement('option');
                        opt.value = elt.code;
                        opt.textContent = elt.nom;
                        document.querySelector('#dept').appendChild(opt);
                    });
                }
            }
        );

        /**
         * Requête AJAX : liste des villes
         */
        document.querySelector('#dept').addEventListener(
            'change',
            function () {
                const resp = fetch('https://geo.api.gouv.fr/departements/' + this.value + '/communes');
                console.log(resp.json());
            }
        );
    }
);