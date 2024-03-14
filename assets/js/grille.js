export class Grille{
    constructor() {
        this.grille = [];
        this.initGrille();
    }

    initGrille() {
        for (let i = 0; i < 9; i++) {
            this.grille[i] = [];
            for (let j = 0; j < 9; j++) {
                this.grille[i][j] = 0;
            }
        }
    }
}