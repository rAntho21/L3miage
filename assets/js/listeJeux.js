/*
let boutonPopup = document.getElementById("reglePendu");
*/

let boutonRegleSudoku = document.getElementById("regleSudoku");
let boutonReglePendu = document.getElementById("reglePendu");
let boutonRegleMorpion = document.getElementById("regleMorpion");
let boutonRegleSolitaire = document.getElementById("regleSolitaire");

let boutonSuccesSudoku = document.getElementById("sucsSudoku");
let boutonSuccesPendu = document.getElementById("sucsPendu");
let boutonSuccesMorpion = document.getElementById("sucsMorpion");
let boutonSuccesSolitaire = document.getElementById("sucsSolitaire");

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

function activeSuccesSudoku() {
    const succesSudoku = document.getElementById("succesSudoku");
    if (succesSudoku) {
        console.log(succesSudoku);
        succesSudoku.classList.toggle("active");
        console.log(succesSudoku.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

function activeSuccesPendu() {
    const succesPendu = document.getElementById("succesPendu");
    if (succesPendu) {
        console.log(succesPendu);
        succesPendu.classList.toggle("active");
        console.log(succesPendu.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

function activeSuccesMorpion() {
    const succesMorpion = document.getElementById("succesMorpion");
    if (succesMorpion) {
        console.log(succesMorpion);
        succesMorpion.classList.toggle("active");
        console.log(succesMorpion.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

function activeSuccesSolitaire() {
    const succesSolitaire = document.getElementById("succesSolitaire");
    if (succesSolitaire) {
        console.log(succesSolitaire);
        succesSolitaire.classList.toggle("active");
        console.log(succesSolitaire.classList);
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
if (popup) {
    boutonSuccesSudoku.addEventListener("click", activeSuccesSudoku);
} else {
    console.log("bouton non trouvé dans le html");
}
if (popup) {
    boutonSuccesPendu.addEventListener("click", activeSuccesPendu);
} else {
    console.log("bouton non trouvé dans le html");
}
if (popup) {
    boutonSuccesMorpion.addEventListener("click", activeSuccesMorpion);
} else {
    console.log("bouton non trouvé dans le html");
}
if (popup) {
    boutonSuccesSolitaire.addEventListener("click", activeSuccesSolitaire);
} else {
    console.log("bouton non trouvé dans le html");
}