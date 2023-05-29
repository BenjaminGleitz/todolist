/**
 * Notre module app (objet Javascript)
 */
const task = {

    // ####################################################################
    //                               EVENTS
    // ####################################################################

    bindSingleTaskEvents: function(taskElement) {

        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant l'édition du titre de la tâche
        // ----------------------------------------------------------------
        // On récupère l'élément du DOM correspondant au titre de la tâche
        const taskTitleLabelElement = taskElement.querySelector('.task__title-label');
        // Dès qu'on clique sur le titre de la tâche, on passe en mode édition
        taskTitleLabelElement.addEventListener('click', task.handleEnableTaskTitleEditMode);


        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant de valider le nouveau nom de
        // la tâche
        // ----------------------------------------------------------------
        // On récupère le champ input permettant de modifier le titre de la tâche
        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
        // On ajoute l'écoute de la perte de focus du champ (par exemple, si on clique
        // en dehors du champ input)
        taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTaskTitle);

        // On ajoute l'écoute de la saisie d'une touche du clavier
        taskTitleFieldElement.addEventListener('keydown', task.handleValideNewTaskTitleOnEnterKey);

        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant de compléter une tâche
        // ----------------------------------------------------------------
        // On récupère le bouton permettant de terminer une tâche
        const taskCompleteButtonElement = taskElement.querySelector('.task__button--validate');
        // On ajoute l'écoute du clic sur ce bouton
        taskCompleteButtonElement.addEventListener('click', task.handleCompleteTask);

    },

    handleEnableTaskTitleEditMode: function(evt) {

        console.log('titre cliqué');

        // - Pour passer visuellement en mode édition du titre de la tâche, on va devoir ajouter la classe 'task--edit' sur l'élément tâche
        // - Pour cela, on a donc besoin d'accéder à l'élément tâche contenant l'élément titre
        
        // On commence par récupérer l'élément titre sur lequel l'évènement click s'est produit
        const taskTitleLabelElement = evt.currentTarget;

        // On chercher ensuite dans les ancêtres de l'élément titre, le premier élément du DOM qui possède la classe 'task'
        const taskElement = taskTitleLabelElement.closest('.task');

        // Enfin, on ajoute la classe 'task--edit' sur l'élément de tâche
        taskElement.classList.add('task--edit');

        // Bonus UX : on met le focus sur le champ input pour pouvoir directement modifier le titre de la tâche sans avoir à cliquer une deuxième fois dans le champ
        taskElement.querySelector('.task__title-field').focus();
    },

    /**
     * Méthode gérant la validation du nouveau titre de la tâche sur l'évènement 'blur'
     * 
     * @param {Event} evt 
     */
    handleValidateNewTaskTitle: function(evt) {

        // On récupère l'élément input
        const taskTitleFieldElement = evt.currentTarget;

        // On récupère la valeur de l'élément input
        const newTaskTitle = taskTitleFieldElement.value;

        // On récupère l'élément titre de la tâche (celui affiché à l'utilisateur)
        const taskTitleLabelElement = taskTitleFieldElement.previousElementSibling;

        taskTitleLabelElement.textContent = newTaskTitle;

        // Pour quitter le mode édition, il faut enlever la classe 'task--edit'
        // sur l'élément 'task'
        const taskElement = taskTitleFieldElement.closest('.task');
        taskElement.classList.remove('task--edit');
    },

    /**
     * Méthode gérant la validation du nouveau titre de la tâche sur l'évènement 'keydown'
     * (seule la touche Entrée qui permettra de valider la modification)
     * 
     * @param {Event} evt 
     */
    handleValideNewTaskTitleOnEnterKey: function(evt) {
        // - Si l'utilisateur a tapé sur la touche Entrée (du clavier ou du pavé nuémrique)
        // - alors on renvoit directement l'évènement sur la méthode handleValidateNewTaskTitle
        // => cela nous évite de dupliquer du code
        // - Sinon, on ne fait rien :)
        if (evt.key === 'Enter') {
            task.handleValidateNewTaskTitle(evt);
        }
    },

    /**
     * Méthode gérant le passage d'une tâche non terminée à une tâche terminée/complétée
     * lors du clic sur le bouton 'complete' de la tâche
     */
    handleCompleteTask: function(evt) {
        console.log('Au clic, je passe dans handleCompleteTask');

        // Récupération du bouton à l'origine de l'évènement
        const taskCompleteButtonElement = evt.currentTarget;
        // Recherce de la tâche à laquelle appartient ce bouton
        const taskElement = taskCompleteButtonElement.closest('.task');
        // Modification de la complétion de la tâche dans le DOM
        task.markTaskAsComplete(taskElement);
    },

    // #############################################################
    //                            DOM
    // #############################################################

    /**
     * Méthode permettant de terminer/compléter une tâche visuellement dans la page
     * 
     * @param {HTMLElement} taskElement 
     */
    markTaskAsComplete: function(taskElement) {
        
        taskElement.classList.replace('task--todo','task--complete');
    },
};
