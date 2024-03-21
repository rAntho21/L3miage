import Cellule from './cellule.js';
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
                let uneCellule = new Cellule(i,j);
                this.grille[i][j] = uneCellule;
                uneCellule.html.addEventListener('click', () => {
                    if (this.btnSelected !== null){
                        if(this.btnSelected.value === '0'){
                            uneCellule.efface();
                            uneCellule.html.classList.remove('errorChiffre');
                        }
                        else{
                            uneCellule.modifyValue(this.btnSelected.value);
                            if(parseInt(uneCellule.valeur)  === parseInt(this.grilleValide[i][j].valeur)) {
                                this.nbChiffresInGrille -= 1;
                                uneCellule.html.classList.remove('errorChiffre');
                                if(this.nbChiffresInGrille === 0){
                                    alert("Bravo, vous avez gagné !");
                                    //GrilleSudoku.afficheChoix();
                                }
                            }
                            else{
                                uneCellule.html.classList.add('errorChiffre');
                            }
                        }
                    }
                })
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
     * Méthode qui affiche la grille de jeu dans le DOM avec la difficultée sélectionnée
     * @param nb
     */
    choixDifficulte(nb){
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
        document.getElementById('Select-Difficulty').style.display = "block";
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
                // this.grille[alealigne][aleacolonne].removeEventListener('click');
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
                const valeur = bouton.value; // Récupérer la valeur du bouton
                console.log("La valeur du bouton est : ", valeur);

                // On vérifie si on a un bouton déjà selected et on l'enlève
                if(this.btnSelected !== null){
                    this.btnSelected.classList.remove("selected");
                }
                // On change de bouton selected
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

}