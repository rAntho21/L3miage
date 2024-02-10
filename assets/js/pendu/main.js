// Création des listes de mots selon les difficultés
let motFacile = ['chat', 'chien', 'souris', 'oiseau', 'poisson', 'lapin', 'tortue', 'poule', 'cochon', 'vache'];
let motMoyen = ['éléphant', 'girafe', 'hippopotame', 'crocodile', 'tigre', 'lion', 'singe', 'panda', 'koala', 'kangourou'];
let motDifficile = ['ornithorynque', 'hippocampe', 'chimpanzé', 'pangolin', 'okapi', 'narval', 'tapir', 'dromadaire', 'chinchilla', 'marmotte'];

// Génération aléatoire des mots
let generationMotFacile = motFacile[Math.floor(Math.random() * motFacile.length)];
let generationMotMoyen = motMoyen[Math.floor(Math.random() * motMoyen.length)];
let generationMotDifficile = motDifficile[Math.floor(Math.random() * motDifficile.length)];

// Le mot à trouver en affichant la première lettre et la dernière lettre puis des tirets pour les autres lettres
let motATrouverFacile = generationMotFacile[0].toUpperCase() + " _ ".repeat(generationMotFacile.length - 2).toUpperCase() + generationMotFacile.toUpperCase()[generationMotFacile.length - 1];
// Le mot à trouver en affichant la première lettre puis des tirets pour les autres lettres
let motATrouverMoyen = generationMotMoyen[0].toUpperCase() + " _ ".repeat(generationMotMoyen.length - 1).toUpperCase();
// Le mot à trouver en affichant des tirets pour toutes les lettres
let motATrouverDifficile = " _ ".repeat(generationMotDifficile.length - 1).toUpperCase();

let vie = 11; // Nombre de vie

// Affichage des mots
document.getElementById("generationMotFacile").innerText = motATrouverFacile;
//document.getElementById("generationMotMoyen").innerText = motATrouverMoyen;
//document.getElementById("generationMotDifficile").innerText = motATrouverDifficile;
document.getElementById("vieJoueur").innerText = vie;