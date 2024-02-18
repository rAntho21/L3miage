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

let vie = 11; // Nombre de vie

/**
 * Permet de réinitialiser les mots générés lorsque l'utilisateur change la difficulté
 */
function resetMot() {
    document.getElementById("generationMotFacile").innerText = "";
    document.getElementById("generationMotMoyen").innerText = "";
    document.getElementById("generationMotDifficile").innerText = "";
}

/**
 * Si l'utilisateur clique sur le bouton "facile", un mot de la liste "motFacile" est généré
 */
boutonFacile.addEventListener("click", function() {
    resetMot();
    generationMotFacile = motFacile[Math.floor(Math.random() * motFacile.length)];
    let motATrouverFacile = generationMotFacile[0].toUpperCase() + " _ ".repeat(generationMotFacile.length - 2).toUpperCase() + generationMotFacile.toUpperCase()[generationMotFacile.length - 1];
    document.getElementById("generationMotFacile").innerText = motATrouverFacile;
});

/**
 * Si l'utilisateur clique sur le bouton "moyen", un mot de la liste "motMoyen" est généré
 */
boutonMoyen.addEventListener("click", function() {
    resetMot();
    generationMotMoyen = motMoyen[Math.floor(Math.random() * motMoyen.length)];
    let motATrouverMoyen = generationMotMoyen[0].toUpperCase() + " _ ".repeat(generationMotMoyen.length - 1).toUpperCase();
    document.getElementById("generationMotMoyen").innerText = motATrouverMoyen;
});

/**
 * Si l'utilisateur clique sur le bouton "difficile", un mot de la liste "motDifficile" est généré
 */
boutonDifficile.addEventListener("click", function() {
    resetMot();
    generationMotDifficile = motDifficile[Math.floor(Math.random() * motDifficile.length)];
    let motATrouverDifficile = " _ ".repeat(generationMotDifficile.length - 1).toUpperCase();
    document.getElementById("generationMotDifficile").innerText = motATrouverDifficile;
});

/*alphabet.forEach(function(lettre) {
    let bouton = document.getElementById(lettre);
    bouton.addEventListener('click', function() {
        // Vérification si la lettre est présente dans le mot généré
        if (motATrouverFacile.includes(lettre.toLowerCase())) {
            // Si la lettre est présente, on l'affiche
            document.getElementById("generationMotFacile").innerText = motATrouverFacile.replace(new RegExp(" _ ", 'g'), lettre + " ");
        } else {
            // Si la lettre n'est pas présente, on change l'image du pendu et on décrémente le nombre de vies
            document.getElementById("pendu").src = "pendu01.png";
            vie--;
            document.getElementById("vieJoueur").innerText = vie;
        }
    });
});*/
alphabet.forEach(function(lettre) {
    let bouton = document.getElementById(lettre);
    bouton.addEventListener('click', function() {
        // Vérifie si la lettre est dans le mot actuel
        if (generationMotFacile.toLowerCase().includes(lettre.toLowerCase())) {
            // Si la lettre est dans le mot, remplace le caractère de soulignement correspondant par la lettre
            let motAffiche = document.getElementById("mot").innerText;
            for (let i = 0; i < generationMotFacile.length; i++) {
                if (generationMotFacile[i].toLowerCase() === lettre.toLowerCase()) {
                    motAffiche = motAffiche.substr(0, i*2) + lettre + " " + motAffiche.substr(i*2+2);
                }
            }
            document.getElementById("mot").innerText = motAffiche;
        } else {
            // Si la lettre n'est pas dans le mot, décrémente le nombre de vies et change l'image
            vie--;
            document.getElementById("vieJoueur").innerText = vie;
            document.getElementById("pendu").src = "pendu01.png";
        }
    });
});

document.getElementById("vieJoueur").innerText = vie;