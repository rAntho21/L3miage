/*
let boutonPopup = document.getElementById("reglePendu");
*/

let boutonRegleSudoku = document.getElementById("regleSudoku");
let boutonReglePendu = document.getElementById("reglePendu");
let boutonRegleMorpion = document.getElementById("regleMorpion");
let boutonRegleSolitaire = document.getElementById("regleSolitaire");

/*boutonRegleSudoku.addEventListener("click", function () {
    activePopup();
});
boutonReglePendu.addEventListener("click", function () {
    activePopup();
});
boutonRegleMorpion.addEventListener("click", function () {
    activePopup();
});
boutonRegleSolitaire.addEventListener("click", function () {
    activePopup();
});*/


function activePopupSudoku() {
    const popupSudoku = document.getElementById("popupSudoku");
    if (popupSudoku) {
        console.log(popupSudoku);
        popupSudoku.classList.toggle("active");
        console.log(popupSudoku.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

function activePopupPendu() {
    const popupPendu = document.getElementById("popupPendu");
    if (popupPendu) {
        console.log(popupPendu);
        popupPendu.classList.toggle("active");
        console.log(popupPendu.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

function activePopupMorpion() {
    const popupMorpion = document.getElementById("popupMorpion");
    if (popupMorpion) {
        console.log(popupMorpion);
        popupMorpion.classList.toggle("active");
        console.log(popupMorpion.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

function activePopupSolitaire() {
    const popupSolitaire = document.getElementById("popupSolitaire");
    if (popupSolitaire) {
        console.log(popupSolitaire);
        popupSolitaire.classList.toggle("active");
        console.log(popupSolitaire.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

if (popup) {
    boutonRegleSudoku.addEventListener("click", activePopupSudoku);
} else {
    console.log("bouton non trouvé dans le html");
}
if (popup) {
    boutonReglePendu.addEventListener("click", activePopupPendu);
} else {
    console.log("bouton non trouvé dans le html");
}
if (popup) {
    boutonRegleMorpion.addEventListener("click", activePopupMorpion);
} else {
    console.log("bouton non trouvé dans le html");
}
if (popup) {
    boutonRegleSolitaire.addEventListener("click", activePopupSolitaire);
} else {
    console.log("bouton non trouvé dans le html");
}