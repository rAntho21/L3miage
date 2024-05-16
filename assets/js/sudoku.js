import Grille from "./GrilleSudoku.js";

let grille;

window.onload = init;

function init() {
    grille = new Grille();

    // onclick des boutons
    document.getElementById("btn-Facile").onclick = () => {
        document.getElementById("loading").style.display = "block";
        grille.choixDifficulte(1);};
    document.getElementById("btn-Moyen").onclick = () => {
        document.getElementById("loading").style.display = "block";
        grille.choixDifficulte(2);};
    document.getElementById("btn-Difficile").onclick = () => {
        document.getElementById("loading").style.display = "block";
        grille.choixDifficulte(3);};
}