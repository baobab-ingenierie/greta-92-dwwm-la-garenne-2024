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
         * Evénement : coche la case "tous"
         */
        document.querySelector("#job_all").addEventListener(
            'change',
            function (evt) {
                document.querySelectorAll("fieldset input[type=checkbox][name^=job]").forEach(function (elt) {
                    elt.checked = evt.target.checked;
                });
            }
        );

        /**
         * Evénement : enregistrement local
         */
        document.querySelector("#local").addEventListener(
            'click',
            function () {
                const inputs = document.querySelectorAll("form [name]");
                let toStore = {}, val = [];
                inputs.forEach(function (elt) {
                    console.log(elt.type);
                    switch (elt.type) {
                        case 'radio':
                            if (elt.checked) {
                                toStore[elt.name] = elt.value;
                            }
                            break;
                        case 'select-multiple':
                            elt.childNodes.forEach(function (opt) {
                                if (opt.selected) {
                                    val.push(opt.value);
                                }
                            });
                            toStore[elt.name] = val;
                            break;
                        default:
                            toStore[elt.name] = elt.value;
                    }
                });
                console.log(toStore);
            }
        );

        /**
         * Requête AJAX : liste des départements (XMLHttpRequest)
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
         * Requête AJAX : liste des villes (Fetch)
         */
        document.querySelector('#dept').addEventListener(
            'change',
            function () {
                fetch('https://geo.api.gouv.fr/departements/' + this.value + '/communes?fields=nom,code')
                    .then(function (response) {
                        // console.log(response);
                        if (response.status >= 200 && response.status < 300) {
                            return response
                        } else {
                            const error = new Error(response.statusText)
                            error.response = response
                            throw error
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data)
                        const city = document.querySelector("select[id^=city]");
                        let opt;
                        city.innerHTML = "";
                        data.forEach(function (elt) {
                            opt = document.createElement("option");
                            opt.value = elt.code;
                            opt.textContent = elt.nom;
                            city.appendChild(opt);
                        });
                    })
                    .catch(error => console.log(error))
            }
        );
    }
);