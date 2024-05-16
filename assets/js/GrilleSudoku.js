import Cellule from './cellule.js';
import { addStats } from './profil.js';

export default class GrilleSudoku{
    static numberToShowByDiffiulty = [45,36,25];
    static chiffres = [1,2,3,4,5,6,7,8,9];

    constructor() {
        // La difficulté 1 = facile, 2 = moyen, 3 = difficile
        this.difficulty = -1;
        this.grille = [];
        this.grilleValide = [];
        this.btnSelected = null;
        this.nbChiffresInGrille = 81;

        this.initBaseGrille();
        this.initTouches();
    }

    /**
     * Méthode qui va initialiser une grille de cellule vide.
     */
    initBaseGrille() {
        for (let i = 0; i < 9; i++) {
            this.grille[i] = [];
            for (let j = 0; j < 9; j++) {
                this.grille[i][j] = new Cellule(i,j);
            }
        }
        this.showCelluleSudoku();
    }

    /**
     * Méthode qui crée le DOM de chaque cellule dans la grille de jeu
     */
    showCelluleSudoku(){
        let htmlParent = document.querySelector("#Grille");
        this.grille.forEach(uneListeCellule => {
            uneListeCellule.forEach(uneCellule => {
                htmlParent.appendChild(uneCellule.html);
            });
        });
    }

    /**
     * Méthode qui initialise le listener d'une cellule.
     * @param uneCellule
     */
    initListener(uneCellule) {
        uneCellule.html.addEventListener('click', () => {
            if (this.btnSelected !== null){
                if(this.btnSelected.value === '0'){
                    uneCellule.efface();
                    if(uneCellule.html.classList.contains('errorChiffre')){
                        uneCellule.html.classList.remove('errorChiffre');
                    }else{
                        this.nbChiffresInGrille += 1;
                    }
                }
                else{
                    uneCellule.modifyValue(this.btnSelected.value);
                    if(parseInt(uneCellule.valeur)  === parseInt(this.grilleValide[uneCellule.ligne][uneCellule.colonne].valeur)) {
                        this.nbChiffresInGrille -= 1;
                        uneCellule.html.classList.remove('errorChiffre');
                    }
                    else{
                        uneCellule.html.classList.add('errorChiffre');
                    }
                }
            }
            if(this.nbChiffresInGrille <= 0){
                addStats(10 * (this.difficulty), 20 * (this.difficulty));
                this.afficherPopup("Victoire !", 10 * (this.difficulty), 20 * (this.difficulty));
            }
        })
    }

    /**
     * Méthode qui initialise les listeners de chaque cellule de la grille
     */
    initListeners(){
        this.grille.forEach(uneListeCellule => {
            uneListeCellule.forEach(uneCellule => {
                this.initListener(uneCellule);
            });
        });
    }

    /**
     * Méthode qui affiche la grille de jeu dans le DOM avec la difficultée sélectionnée
     * @param nb
     */
    choixDifficulte(nb){
        this.nbChiffresInGrille = 81;
        this.initListeners();

        this.difficulty = nb;
        console.log("Difficulty : " + this.difficulty);

        console.log("Chargement de la grille");
        this.createValideSudokuGrid();

        console.log("Nombre à afficher : " + GrilleSudoku.numberToShowByDiffiulty[nb-1]);
        this.initGameNumber();

        GrilleSudoku.afficheJeu();
    }

    /**
     * Cache la partie choix difficultés et affiche la partie sudoku
     */
    static afficheJeu(){
        document.getElementById('Sudoku').style.display = "block";
        document.getElementById('Select-Difficulty').style.display = "none";
        document.getElementById("loading").style.display = "none";
    }

    /**
     * Cache la partie sudoku et affiche la partie choix difficultés
     */
    static afficheChoix(){
        document.getElementById('Select-Difficulty').style.display = "flex";
        document.getElementById('Sudoku').style.display = "none";
    }

    /**
     * Méthode qui choisi des cases aléatoires de la grille de jeu, pour y mettre le nombre de numéros valide.
     */
    initGameNumber(){
        let numberToImplement = GrilleSudoku.numberToShowByDiffiulty[this.difficulty-1];
        this.nbChiffresInGrille -= numberToImplement;
        while (numberToImplement > 0){
            let alealigne = Math.floor(Math.random() * 9);
            let aleacolonne = Math.floor(Math.random() * 9);

            if (this.grille[alealigne][aleacolonne].isEmpty()){
                this.grille[alealigne][aleacolonne].modifyPermanentlyValue(this.grilleValide[alealigne][aleacolonne].valeur);
                numberToImplement -= 1;
            }
        }
    }

    /**
     * Initialise l'EventListener de chaque bouton.
     */
    initTouches(){
        const boutons = document.querySelectorAll('.touche');
        boutons.forEach(bouton => {
            bouton.addEventListener('click', () => {
                const valeur = bouton.value;

                if(this.btnSelected !== null){
                    this.btnSelected.classList.remove("selected");
                }
                this.btnSelected = bouton;
                bouton.classList.add("selected");
            });
        });
    }

    /**
     * Création d'une grille sudoku valide et retourne un boolean selon le résultat.
     * Relance la méthode si false.
     * @returns {boolean}
     */
    createValideSudokuGrid(){
        // Init de la grille à vide
        for (let i = 0; i < 9; i++) {
            this.grilleValide[i] = [];
            for (let j = 0; j < 9; j++) {
                this.grilleValide[i][j] = new Cellule(i,j);
            }
        }
        let caseARemplir = 81;
        let parcoursX = 0; let parcoursY = 0;
        while (caseARemplir > 0){
            let listChiffresDispo = GrilleSudoku.getNbRestantForCellule(parcoursX, parcoursY, this.grilleValide);

            if (listChiffresDispo.length === 0) {
                this.createValideSudokuGrid();
                return false; // Sortir de la méthode actuelle
            }

            let nbAleaOfList = listChiffresDispo[Math.floor(Math.random() * listChiffresDispo.length)];
            this.grilleValide[parcoursX][parcoursY].modifyValue(nbAleaOfList);
            caseARemplir -= 1;
            parcoursX += 1;
            if(parcoursX >= 9){
                parcoursX = 0;
                parcoursY += 1;
            }
        }
        return true;
    }

    /**
     * Renvoi une liste des chiffres restant dans la ligne
     * @param ligne
     * @param grille
     */
    static getNbRestantLigne(ligne, grille){
        let listNbRestant = this.chiffres.slice();
        for (let i = 0; i<9; i++){
            if(grille[ligne][i].valeur !== null){
                listNbRestant.splice(listNbRestant.indexOf(grille[ligne][i].valeur), 1);
            }
        }
        return listNbRestant;
    }

    /**
     * Renvoi une liste de chiffres restant dans la colonne
     * @param colonne
     * @param grille
     * @returns {number[]}
     */
    static getNbRestantColonne(colonne, grille){
        let listNbRestant = this.chiffres.slice();
        for (let i = 0; i<9; i++){
            if(grille[i][colonne].valeur !== null){
                listNbRestant.splice(listNbRestant.indexOf(grille[i][colonne].valeur), 1);
            }
        }
        return listNbRestant;
    }

    /**
     * Renvoi une liste de chiffre restant dans un sous carre
     * @param ligne
     * @param colonne
     * @param grille
     * @returns {number[]}
     */
    static getNbRestantCarre(ligne, colonne, grille) {
        let ligneDebut = ligne - ligne % 3;
        let colonneDebut = colonne - colonne % 3;
        let listNbRestant = this.chiffres.slice();

        for (let i = ligneDebut; i < ligneDebut + 3; i++) {
            for (let j = colonneDebut; j < colonneDebut + 3; j++) {
                if (grille[i][j].valeur !== null) {
                    listNbRestant.splice(listNbRestant.indexOf(grille[i][j].valeur), 1);
                }
            }
        }
        return listNbRestant;
    }

    /**
     * Renvoi la liste de chiffre valide pour la cellule pointée.
     * @param ligne
     * @param colonne
     * @param grille
     * @returns {number[]}
     */
    static getNbRestantForCellule(ligne, colonne, grille) {
        const chiffresLigne = GrilleSudoku.getNbRestantLigne(ligne, grille);
        const chiffresColonne = GrilleSudoku.getNbRestantColonne(colonne, grille);
        const chiffresCarre = GrilleSudoku.getNbRestantCarre(ligne, colonne, grille);

        // Intersection des listes pour obtenir les chiffres restants pour la cellule
        const chiffresRestants = chiffresLigne.filter(x => chiffresColonne.includes(x) && chiffresCarre.includes(x));

        return chiffresRestants;
    }

    /**
     * Méthode qui affiche un popup de fin de partie avec les gains d'argent et d'expérience et qui nous permet de rejouer ou de retourner au menu de difficulté.
     * @param message
     * @param gainArgent
     * @param gainXP
     */
    afficherPopup(message, gainArgent, gainXP){
        const popup = document.createElement("div");
        popup.className = "popup";

        const titre = document.createElement("h4");
        titre.textContent = message;
        titre.style.textAlign = "center";
        titre.style.color = "green";
        popup.appendChild(titre);

        const argentSpan = document.createElement("span");
        argentSpan.textContent = "Gain d'argent: " + gainArgent + " pièces.";
        argentSpan.style.display = "block";
        popup.appendChild(argentSpan);

        const xpSpan = document.createElement("span");
        xpSpan.textContent = "Gain d'expérience: " + gainXP + " points.";
        xpSpan.style.display = "block";
        popup.appendChild(xpSpan);

        const boutonContainer = document.createElement("div");
        boutonContainer.style.display = "flex";
        boutonContainer.style.justifyContent = "center";
        boutonContainer.style.marginTop = "20px";

        const boutonRejouer = document.createElement("button");
        boutonRejouer.textContent = "Rejouer";
        boutonRejouer.style.flex = "1";
        boutonRejouer.style.marginRight = "10px";
        boutonRejouer.addEventListener("click", function() {
            this.choixDifficulte(this.difficulty);
            console.log("Rejouer");
        });
        boutonContainer.appendChild(boutonRejouer);

        const boutonAccueil = document.createElement("button");
        boutonAccueil.textContent = "Accueil";
        boutonAccueil.style.flex = "1"; // Prendre toute la largeur disponible
        boutonAccueil.addEventListener("click", function() {
            GrilleSudoku.afficheChoix();
        });
        boutonContainer.appendChild(boutonAccueil);

        popup.appendChild(boutonContainer);

        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "#fff";
        popup.style.padding = "20px";
        popup.style.border = "2px solid #333";
        popup.style.borderRadius = "5px";
        popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        popup.style.zIndex = "9999";

        document.body.appendChild(popup);
    }
}