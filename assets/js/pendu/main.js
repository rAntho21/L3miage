// Création des listes de mots selon les difficultés
let motFacile = ['chat', 'chien', 'souris', 'oiseau', 'poisson', 'lapin', 'tortue', 'poule', 'cochon', 'vache'];
let motMoyen = ['éléphant', 'girafe', 'hippopotame', 'crocodile', 'tigre', 'lion', 'singe', 'panda', 'koala', 'kangourou'];
let motDifficile = ['ornithorynque', 'hippocampe', 'chimpanzé', 'pangolin', 'okapi', 'narval', 'tapir', 'dromadaire', 'chinchilla', 'marmotte'];

let generationMotFacile = "";
let generationMotMoyen = "";
let generationMotDifficile = "";

let boutonFacile = document.getElementById("facile");
let boutonMoyen = document.getElementById("moyen");
let boutonDifficile = document.getElementById("difficile");

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let motSelectionne = "";

let boutonValiderMot = document.getElementById("validerMot");
let essayer = document.getElementById("essaye");

let vie = 11; // Nombre de vie

/**
 * Permet de réinitialiser les mots générés lorsque l'utilisateur change la difficulté
 */
function reset() {
    document.getElementById("generationMotFacile").innerText = "";
    document.getElementById("generationMotMoyen").innerText = "";
    document.getElementById("generationMotDifficile").innerText = "";
}

/**
 * Si l'utilisateur clique sur le bouton "facile", un mot de la liste "motFacile" est généré
 */
boutonFacile.addEventListener("click", function() {
    reset();
    generationMotFacile = motFacile[Math.floor(Math.random() * motFacile.length)];
    let motATrouverFacile = generationMotFacile[0].toUpperCase() + " _ ".repeat(generationMotFacile.length - 2).toUpperCase() + generationMotFacile.toUpperCase()[generationMotFacile.length - 1];
    document.getElementById("generationMotFacile").innerText = motATrouverFacile;
    motSelectionne = generationMotFacile;
});

/**
 * Si l'utilisateur clique sur le bouton "moyen", un mot de la liste "motMoyen" est généré
 */
boutonMoyen.addEventListener("click", function() {
    reset();
    generationMotMoyen = motMoyen[Math.floor(Math.random() * motMoyen.length)];
    let motATrouverMoyen = generationMotMoyen[0].toUpperCase() + " _ ".repeat(generationMotMoyen.length - 1).toUpperCase();
    document.getElementById("generationMotMoyen").innerText = motATrouverMoyen;
    motSelectionne = generationMotMoyen;
});

/**
 * Si l'utilisateur clique sur le bouton "difficile", un mot de la liste "motDifficile" est généré
 */
boutonDifficile.addEventListener("click", function() {
    reset();
    generationMotDifficile = motDifficile[Math.floor(Math.random() * motDifficile.length)];
    let motATrouverDifficile = " _ ".repeat(generationMotDifficile.length - 1).toUpperCase();
    document.getElementById("generationMotDifficile").innerText = motATrouverDifficile;
    motSelectionne = generationMotDifficile;
});

/**
 * Pour chaque lettre de l'alphabet, on ajoute un événement lorsqu'on clique sur le bouton correspondant
 * Si l'utilisateur gagne, alors une alerte "Vous avez gagné !" s'affiche
 * Sinon si l'utilisateur perd, une alerte "Vous avez perdu !" s'affiche
 */
alphabet.forEach(function (lettre) {
    let bouton = document.getElementById(lettre);
    bouton.addEventListener('click', function () {
        // Vérifie si la lettre est dans le mot actuel
        if (motSelectionne.toLowerCase().includes(lettre.toLowerCase())) {
            // Si la lettre est dans le mot, remplace le caractère de soulignement correspondant par la lettre
            let motAffiche = document.getElementById("mot").innerText;
            for (let i = 0; i < motSelectionne.length; i++) {
                if (motSelectionne[i].toLowerCase() === lettre.toLowerCase()) {
                    motAffiche = motAffiche.substr(0, i * 2) + lettre + " " + motAffiche.substr(i * 2 + 2);
                }
            }
            document.getElementById("mot").innerText = motAffiche;
            if (!motAffiche.includes("_")) {
                alert("Vous avez gagné !");
            }
        } else {
            // Si la lettre n'est pas dans le mot, décrémente le nombre de vies et change l'image
            vie--;
            document.getElementById("vieJoueur").innerText = vie;
            let imgNum = 11 - vie;
            let imgNom = "pendu" + String(imgNum).padStart(2, '0') + ".png";
            document.getElementById("penduu").src = "../../assets/images/" + imgNom;
            if (vie === -1) {
                alert("Vous avez perdu !");
            }
        }
    });
});


boutonValiderMot.addEventListener("click", function() {
    let motEssaye = essayer.value.toLowerCase();
    if (motEssaye === motSelectionne) {
        alert("Vous avez gagné !");
    } else {
        if (boutonDifficile.clicked) {
            alert("Vous avez perdu !");
        } else {
            vie--;
            document.getElementById("vieJoueur").innerText = vie;
            let imgNum = 11 - vie;
            let imgNom = "pendu" + String(imgNum).padStart(2, '0') + ".png";
            document.getElementById("penduu").src = "../../assets/images/" + imgNom;
            if (vie === -1) {
                alert("Vous avez perdu !");
            }
        }
    }
    essayer.value = ""; // Clear the input field
});

document.getElementById("vieJoueur").innerText = vie;