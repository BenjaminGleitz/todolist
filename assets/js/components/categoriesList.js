/**
 * Composant gérant la liste des catégories
 */
const categoriesList = {

    init: function() {
        categoriesList.loadCategoriesFromAPI();
    },

    // ###############################################################
    //                            AJAX/API
    // ###############################################################

    /**
     * Méthode effectuant le chargement de la liste des catégories depuis l'API
     */
    loadCategoriesFromAPI: function() {
        
        // On prépare la configuration de la requête HTTP
        const config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
  
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch(app.apiBaseURL + '/categories.json', config)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
            // On convertit cette réponse en un objet JS et on le retourne
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(categoriesListFromAPI) {
            // On dispose désormais d'un tableau JS exploitable dans la variable categoriesListFromAPI
            // console.log(categoriesListFromAPI);

            // Création du select pour les filtres des tâches
            const selectElementForTaskFilters = 
                categoriesList.createSelectElement(
                    categoriesListFromAPI,
                    'Toutes les catégories',
                    'filters__choice'
                );
            // suivi de son ajout dans le DOM
            document.querySelector('.filters__task--category').append(selectElementForTaskFilters);

            // Création du select pour le formulaire d'ajout d'une tâche
            const selectElementForNewTaskForm =
                categoriesList.createSelectElement(
                    categoriesListFromAPI,
                    'Choisir une catégorie'
                );
            // suivi de son ajout dans le DOM
            document.querySelector('.task--add .task__category .select').append(selectElementForNewTaskForm);

        });
    },

    // ###############################################################
    //                              DOM
    // ###############################################################

    /**
     * Méthode permettant de générer une liste déroulante des catégories
     * 
     * @param {Array} categoriesList Tableau contenant la liste des catégories
     * @param {String} defaultLabel Le libellé de la première valeur de la liste
     * @param {String} clasName Le nom de la classe à rajouter sur le <select>
     * 
     * @returns {HTMLElement} Un élément <select> avec les <option> remplies
     */
    createSelectElement: function(categoriesList, defaultLabel, className = '') {
        // Création de l'élément <select>
        const selectElement = document.createElement('select');

        // Ajout éventuel d'un attribut class si className est fourni
        if (className !== '') { // Si className est différent de chaîne vide
            selectElement.classList.add(className);
        }

        // Création de la première <option> en guise de valeur par défaut
        const defaultOptionElement = document.createElement('option');
        defaultOptionElement.textContent = defaultLabel;
        // Ajout de l'<option> dans la liste
        // selectElement.appendChild(defaultOptionElement);
        selectElement.append(defaultOptionElement);

        // On parcourt la liste des catégories pour créer
        // une <option> par nom de catégorie
        for (const category of categoriesList) {
            console.log(category);
            // Création de l'élément <option>
            const optionElement = document.createElement('option');
            // On lui ajoute son contenu
            optionElement.textContent = category.name;
            // On insère l'<option> dans le <select>
            selectElement.append(optionElement);
        }

        // On retourne le <select> qui vient d'être créé
        return selectElement;

    },
};