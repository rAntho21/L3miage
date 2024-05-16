let boutonTous = document.getElementById("boutonTous");
let boutonSudoku = document.getElementById("boutonSudoku");
let boutonPendu = document.getElementById("boutonPendu");
let boutonBataille = document.getElementById("boutonBataille");
let boutonSolitaire = document.getElementById("boutonSolitaire");

let divTous = document.getElementById("tous");
let divSudoku = document.getElementById("sudoku");
let divPendu = document.getElementById("pendu");
let divBataille = document.getElementById("bataille-navale");
let divSolitaire = document.getElementById("solitaire");

let boutons = document.querySelectorAll(".bouton");

boutonTous.addEventListener("click", () => {
    toggleVisibility(divTous);
});

boutonSudoku.addEventListener("click", () => {
    hideAllExcept(divSudoku);
});

boutonPendu.addEventListener("click", () => {
    hideAllExcept(divPendu);
});

boutonBataille.addEventListener("click", () => {
    hideAllExcept(divBataille);
});

boutonSolitaire.addEventListener("click", () => {
    hideAllExcept(divSolitaire);
});

function toggleVisibility(element) {
    if (getComputedStyle(element).display !== "none") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

function hideAllExcept(elementToShow) {
    let allDivs = [divTous, divSudoku, divPendu, divBataille, divSolitaire];
    allDivs.forEach(div => {
        if (div !== elementToShow) {
            div.style.display = "none";
        }
    });
    elementToShow.style.display = ""; // Affiche la div associée au bouton cliqué
}

boutons.forEach(bouton => {
    bouton.addEventListener("click", () => {
        // D'abord, on retire la classe "active" de tous les boutons
        boutons.forEach(b => {
            b.classList.remove("active");
        });
        // Ensuite, on ajoute la classe "active" au bouton cliqué
        bouton.classList.add("active");
    });
});