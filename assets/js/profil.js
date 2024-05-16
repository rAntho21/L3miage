// Récupérer les valeurs stockées dans le localStorage ou initialiser à 0 si elles n'existent pas
let experience = localStorage.getItem('experience') ? parseInt(localStorage.getItem('experience')) : 0;
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
let level = localStorage.getItem('level') ? parseInt(localStorage.getItem('level')) : 0;

// Gestion des points d'expérience et de l'argent
export function addStats(expGain, pointsGain) {
    // Accumuler l'expérience et les points
    experience += expGain;
    points += pointsGain;
    level = Math.floor(experience / 1000);
}

export function updateStats(){
    let experiencePercentage = ((experience % 1000) / 1000) * 100;

    // Stocker les nouvelles valeurs dans le localStorage
    localStorage.setItem('experience', experience);
    localStorage.setItem('points', points);
    localStorage.setItem('level', level);

    return {
        level,
        points,
        experiencePercentage
    };
}

// Alimentation de l'affichage des données sur le HTML
function updateDisplay({ level, points, experiencePercentage }) {
    const experienceBar = document.querySelector('.experience .progress-bar');
    experienceBar.style.width = `${experiencePercentage}%`;
    const experiencePercentageDisplay = document.querySelector('.experience .experience-percentage');
    experiencePercentageDisplay.textContent = `${experiencePercentage.toFixed(2)}%`;

    const pointsDisplay = document.querySelector('.money span');
    pointsDisplay.textContent = `Argent: $ ${points}`;

    const levelDisplay = document.querySelector('.level span');
    levelDisplay.textContent = `Niveau: ${level}`;
}

// Ajout de l'écouteur d'événements DOMContentLoaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Mettre à jour les statistiques initiales
    const stats = addStats(0, 0);
    updateDisplay(stats);
});

addStats(1500, 1000);