// Variables globales pour l'expérience, les points et le niveau
let experience = (experience === undefined) ? 0 : experience;
let points = (points === undefined) ? 0 : points;
let level = (level === undefined) ? 0 : level;

export function addStats(expGain, pointsGain){
    experience += expGain;
    points += pointsGain;
    level = Math.floor(experience / 1000);
}

export function updateStats(){
    let experiencePercentage = ((experience % 1000) / 1000) * 100;
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
    updateStats(0, 0);
});