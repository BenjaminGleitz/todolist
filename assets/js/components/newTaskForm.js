/**
 * Notre module newTaskForm (objet Javascript)
 */
const newTaskForm = {

    /**
     * Initialisation du composant
     */
    init: function() {
        newTaskForm.bindNewTaskFormEvents();
    },

    // #############################################################
    //                            EVENTS
    // #############################################################

    /**
     * Ajoute tous les écouteurs d'évènements liés au formulaire 
     * d'ajout d'une tâche
     */
    bindNewTaskFormEvents: function() {

        const newTaskFormElement = document.querySelector('.task--add form');
        newTaskFormElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);


    },

    handleNewTaskFormSubmit: function (evt) {

        // On bloque la soumission du formulaire, car on veut traiter
        // les données fournies directement sans recharger la page
        evt.preventDefault();

        // Récupération de l'élément formulaire
        const newTaskFormElement = evt.currentTarget;

        // Récupération du titre de la tâche
        const newTaskTitle = newTaskFormElement.querySelector('.task__title-field').value;
        console.log(newTaskTitle);

        // Récupération du titre de la tâche
        const newTaskCategoryName = newTaskFormElement.querySelector('.task__category select').value;
        console.log(newTaskCategoryName);

        // Création de la nouvelle tâche
        const newTaskElement = task.createTaskElement(newTaskTitle, newTaskCategoryName);

        // Affichage de la nouvelle tâche
        tasksList.insertTaskIntoTasksList(newTaskElement);
    }
};