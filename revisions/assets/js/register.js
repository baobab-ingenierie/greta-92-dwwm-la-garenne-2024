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
                // Génère un objet JSON à stocker
                const inputs = document.querySelectorAll("form [name]");
                let toStore = {}, val = [], chk = [];
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
                            toStore[elt.name.slice(0, elt.name.length - 2)] = val;
                            break;
                        case 'checkbox':
                            if (elt.checked) {
                                chk.push(elt.value);
                            }
                            toStore[elt.name.slice(0, elt.name.length - 2)] = chk;
                            break;
                        default:
                            toStore[elt.name] = elt.value;
                    }
                });
                console.log(toStore);

                // Enregistre dans un cookie
                // name=value; expires=xxxxx; secure; httponly
                let end = new Date();
                end.setTime(end.getTime() + (7 * 24 * 60 * 60 * 1000));
                document.cookie = `${document.querySelector('#fname').value.toLowerCase()}=${JSON.stringify(toStore)}; Expires=${end.toLocaleString()}; Secure`;

                // Enregistre dans Web storage
                sessionStorage.setItem(document.querySelector('#fname').value.toLowerCase(), JSON.stringify(toStore));
                localStorage.setItem(document.querySelector('#fname').value.toLowerCase(), JSON.stringify(toStore));

                // Enregistre dans Indexed DB
                // Crée ou ouvre la BDD
                const idb = window.indexedDB;
                const cnn = idb.open('business', 1);
                // Si BDD n'existe pas ou version différente
                // création implicite
                cnn.addEventListener(
                    'upgradeneeded',
                    function () {
                        const dbs = this.result;
                        // Si OS n'existe pas alors création explicite
                        if (!dbs.objectStoreNames.contains('candidates')) {
                            const obs = dbs.createObjectStore(
                                'candidates',
                                { autoIncrement: true }
                            );
                            const idx = obs.createIndex('idxName', ['fname']);
                        }
                    }
                );

                // Affiche message 
                alert('Stockage local terminé avec succès !');
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