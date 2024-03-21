
// Création des listes de mots selon les difficultés
let motFacile = ["chat", "chien", "maison", "arbre", "soleil", "livre", "pomme", "rire", "fleur", "bonjour", "école", "oiseau", "bateau", "manger", "orange", "crayon", "table", "avion", "coeur", "danse", "ballon", "neige", "chapeau", "patin", "porte", "gâteau", "piano", "nuage", "plage", "montagne", "étoile", "téléphone", "vélo", "doigt", "vent", "poisson", "poulet", "sourire", "poire", "verre", "docteur", "jardin", "hiver", "été", "chemin", "chemise", "maman", "papa", "mer", "sel", "miel", "rêve", "musique", "ordinateur", "football", "basket", "crème", "ciseaux", "lune", "bonbon", "dinosaure", "guitare", "magasin", "chaussette", "chocolat", "camion", "avocat", "hôpital", "bougie", "tigre", "singe", "cirque", "lion", "éléphant", "tortue", "écureuil", "renard", "hibou", "abeille", "papillon", "grenouille", "rhinocéros", "dauphin", "baleine", "requin", "pingouin", "crocodile", "alligator", "poireau", "carotte", "banane", "poêle", "nez", "tableau", "radio", "voiture", "train", "parapluie", "lunettes", "canard"];
let motMoyen = ["enigme", "mystere", "chaos", "fantome", "puzzle", "miroir", "cascade", "symbole", "inconnu", "merveille", "espoir", "spectacle", "melodie", "harmonie", "mirage", "tresor", "eclipse", "aventure", "catastrophe", "savoir", "magie", "exploration", "univers", "equilibre", "limite", "labyrinthe", "fascination", "evasion", "decouverte", "defi", "festival", "genie", "heritage", "imagination", "intrigue", "legende", "meditation", "nirvana", "oasis", "paradis", "perseverance", "reverie", "serenite", "symbiose", "tempete", "tourbillon", "tranquillite", "voyage", "abondance", "complicite", "connaissance", "festin", "bibliotheque", "galaxie", "crepuscule", "fleur", "delicatesse", "diamant", "majeste", "renaissance"];
let motDifficile = ["equinoxe", "xenophobe", "soporifique", "enigmatique", "phenomene", "metaphysique", "hypothese", "astronaute", "epoustouflant", "inextricable", "indomptable", "ubiquite", "catastrophique", "ephemere", "enervement", "ebouriffant", "sarcastique", "exacerbe", "meticuleux", "indechiffrable", "abstraction", "effervescence", "ebullition", "peripetie", "incomprehensible", "equivoque", "electroencephalogramme", "phenomenal", "peremptoire", "imprevisible", "reticent", "emancipation", "geopolitique", "imbroglio", "decadence", "evolutionniste", "anthropomorphique", "evangile", "elucubration", "ostentatoire", "deracine", "vagabondage", "exorbitant", "demasure", "fantomatique", "galactique", "indefectible", "mysterieux", "ecliptique", "prolifique", "epidemie", "anachronique", "edifice", "exacerbation", "indubitable", "scepticisme", "intrinseque", "evanescent", "mystique", "epigenetique", "aphorisme", "sibyllin", "epigone", "heteroclite", "equivalence", "electronique", "epigramme", "epithete", "eclectique", "heterogene", "etymologie", "electrolyse", "eclectisme", "eclosion", "ether", "etendard"];

let boutonFacile = document.getElementById("facile");
let boutonMoyen = document.getElementById("moyen");
let boutonDifficile = document.getElementById("difficile");

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let motSelectionne = "";

let boutonValiderMot = document.getElementById("validerMot");
let essayer = document.getElementById("essaye");

let difficulte = "";

let score = 0;
let vie = 11;

let boutonRejouer = document.getElementById("rejouer");

let buttons = document.querySelectorAll('#difficultes button');

let audio = new Audio('../../assets/son/cliquePendu.mp3');
let audioVictoire = new Audio('../../assets/son/victoire.mp3');
let audioDefaite = new Audio('../../assets/son/defaite.mp3');
let boutonPopup = document.getElementById("regle");
/**
 * Permet de réinitialiser les mots générés lorsque l'utilisateur change la difficulté
 */
function reset() {
    vie = 11;
    document.getElementById("vieJoueur").innerText = vie;
    document.getElementById("scoreJoueur").innerText = score;

    difficulte = "";
    console.log("reset now")
    console.log(document.getElementById("mot"));
    document.getElementById("mot").innerText = "";
    /*document.getElementById("essaye").value = "";*/

    alphabet.forEach(function (lettre) {
        let bouton = document.getElementById(lettre);
        bouton.classList.remove('bouton-gris');
    });

    buttons.forEach(button => {
        button.style.backgroundColor = "";
    });

    motSelectionne = "";
    document.getElementById("penduu").src = "../../assets/images/pendu00.png";
}

/**
 * Si l'utilisateur clique sur le bouton "facile", un mot de la liste "motFacile" est généré
 */
    boutonFacile.addEventListener("click", function () {
        reset();
        let generationMotFacile = motFacile[Math.floor(Math.random() * motFacile.length)];
        let motATrouverFacile = generationMotFacile[0].toUpperCase() + " _ ".repeat(generationMotFacile.length - 2).toUpperCase() + generationMotFacile.toUpperCase()[generationMotFacile.length - 1];
        console.log(document.getElementById("mot").innerText = motATrouverFacile);
        motSelectionne = generationMotFacile;
        difficulte = "facile";
    });

/**
 * Si l'utilisateur clique sur le bouton "moyen", un mot de la liste "motMoyen" est généré
 */
    boutonMoyen.addEventListener("click", function () {
        reset();
        let generationMotMoyen = motMoyen[Math.floor(Math.random() * motMoyen.length)];
        let motATrouverMoyen = generationMotMoyen[0].toUpperCase() + " _ ".repeat(generationMotMoyen.length - 1).toUpperCase();
        document.getElementById("mot").innerText = motATrouverMoyen;
        motSelectionne = generationMotMoyen;
        difficulte = "moyen";
    });

/**
 * Si l'utilisateur clique sur le bouton "difficile", un mot de la liste "motDifficile" est généré
 */
    boutonDifficile.addEventListener("click", function () {
        reset();
        let generationMotDifficile = motDifficile[Math.floor(Math.random() * motDifficile.length)];
        let motATrouverDifficile = " _ ".repeat(generationMotDifficile.length - 1).toUpperCase();
        document.getElementById("mot").innerText = motATrouverDifficile;
        motSelectionne = generationMotDifficile;
        difficulte = "difficile";
    });

/**
 * Pour chaque lettre de l'alphabet, on ajoute un événement lorsqu'on clique sur le bouton correspondant
 * Si l'utilisateur gagne, alors une alerte "Vous avez gagné !" s'affiche
 * Sinon si l'utilisateur perd, une alerte "Vous avez perdu !" s'affiche
 */
alphabet.forEach(function (lettre) {
    let bouton = document.getElementById(lettre);
    bouton.addEventListener('click', function () {
        if (difficulte !== "") {
            audio.play();
            bouton.classList.add('bouton-gris');
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
                    activePopupGagne();
                    audioVictoire.play();
                    if (difficulte === "facile") {
                        score += 10;
                    } else if (difficulte === "moyen") {
                        score += 20;
                    } else if (difficulte === "difficile") {
                        score += 30;
                    }
                    document.getElementById("scoreJoueur").innerText = score;
                    reset();
                }
            } else {
                vie--;
                document.getElementById("vieJoueur").innerText = vie;
                let imgNum = 11 - vie;
                let imgNom = "pendu" + String(imgNum).padStart(2, '0') + ".png";
                document.getElementById("penduu").src = "../../assets/images/" + imgNom;
                if (vie === 0) {
                    activePopupPerdu();
                    audioDefaite.play();
                    reset();
                }
            }
        }
    });
});

boutonValiderMot.addEventListener("click", function() {
    let motEssaye = essayer.value.toLowerCase();
    if (difficulte !== "") {
        if (motEssaye === motSelectionne) {
            activePopupGagne();
            audioVictoire.play();
            if (difficulte === "facile") {
                score += 10;
            } else if (difficulte === "moyen") {
                score += 20;
            } else if (difficulte === "difficile") {
                score += 30;
            }
            document.getElementById("scoreJoueur").innerText = score;
            reset();
        } else {
            if (boutonDifficile.clicked) {
                activePopupPerdu();
                audioDefaite.play();
                reset();
            } else {
                vie--;
                document.getElementById("vieJoueur").innerText = vie;
                let imgNum = 11 - vie;
                let imgNom = "pendu" + String(imgNum).padStart(2, '0') + ".png";
                document.getElementById("penduu").src = "../../assets/images/" + imgNom;
                if (vie === 0) {
                    activePopupPerdu();
                    audioDefaite.play();
                    reset();
                }
            }
        }
        essayer.value = "";
    }
});

boutonRejouer.addEventListener("click", function() {
    reset();
});

document.getElementById("vieJoueur").innerText = vie;
document.getElementById("scoreJoueur").innerText = score;

buttons.forEach(button => {
    button.addEventListener('click', function () {
        buttons.forEach(btn => {
            btn.style.backgroundColor = "";
        });
        this.style.backgroundColor = "forestgreen";
    });
});

function activePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        console.log(popup);
        popup.classList.toggle("active");
        console.log(popup.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

function activePopupGagne() {
    const popup = document.getElementById("popupGagne");
    if (popup) {
        console.log(popup);
        popup.classList.toggle("active");
        document.getElementById("scoreRecapG").innerText = score;
        document.getElementById("motRecapG").innerText = motSelectionne.toUpperCase();
        console.log(popup.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

function activePopupPerdu() {
    const popup = document.getElementById("popupPerdu");
    if (popup) {
        console.log(popup);
        popup.classList.toggle("active");
        document.getElementById("scoreRecapD").innerText = score;
        document.getElementById("motRecapD").innerText = motSelectionne.toUpperCase();
        console.log(popup.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

if (popup) {
    boutonPopup.addEventListener("click", activePopup);
} else {
    console.log("bouton non trouvé dans le html");
}



