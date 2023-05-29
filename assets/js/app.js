/**
 * Notre module app (objet Javascript)
 */
const app = {

    /**
     * La méthode init contient le code que l'on veut exécuter au lancement
     * de l'applicatoin
     */
    init: function() {

        console.log('le fichier app a bien été appellé');
    }
};

// On ajoute un écouteur d'évènement pour pouvoir lancer l'application
// dès que le DOM est chargé
document.addEventListener('DOMContentLoaded', app.init);