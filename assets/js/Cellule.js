export default class Cellule {

    /**
     * Constructeur de la classe Cellule
     * @param ligne
     * @param colonne
     */
    constructor(ligne, colonne){
        this.ligne = ligne;
        this.colonne = colonne;
        this.valeur = null;

        let html = document.createElement('p');
        html.textContent = "";
        html.classList.add('sudoku-cellule');
        html.dataset.ligne = ligne;
        html.dataset.colonne = colonne;

        this.html = html;
    }

    /**
     * Affiche dans la console les propriétés de la cellule
     */
    to_String(){
        console.log("ligne : " + this.ligne + ", colonne : " + this.colonne);
    }

    /**
     * Modifie la valeur de l'objet et de son contenu dans le DOM
     * @param value
     */
    modifyValue(value){
        this.valeur = value;
        this.html.textContent = value;
    }

    /**
     * Retourne true si la valeur n'a pas encore était implémenté.
     * @returns {boolean}
     */
    isEmpty(){
        return this.valeur === null;
    }

    /**
     * Modifie les valeurs de l'objet pour encadrer le jeu
     */
    modifyPermanentlyValue(value){
        this.valeur = value;
        this.html.textContent = value;
        this.html.classList.add('GameSet');
    }

    /**
     * Efface le contenu de la cellule
     */
    efface(){
        this.valeur = null;
        this.html.textContent = '';
    }
}