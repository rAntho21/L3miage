// Variables globales pour l'expérience, les points et le niveau
let experience = 0;
let points = 0;
let level = 0;

export function updateStats(expGain, pointsGain) {
    // Accumuler l'expérience et les points
    experience += expGain;
    points += pointsGain;

    // Calculer le niveau et le pourcentage d'expérience restant pour le prochain niveau
    level = Math.floor(experience / 1000);
    let experiencePercentage = ((experience % 1000) / 1000) * 100;

    const experienceBar = document.querySelector('.experience .progress-bar');
    experienceBar.style.width = `${experiencePercentage}%`; // Utiliser le pourcentage d'expérience pour la largeur

    // Mettre à jour le texte du pourcentage d'expérience
    const experiencePercentageDisplay = document.querySelector('.experience .experience-percentage');
    experiencePercentageDisplay.textContent = `${experiencePercentage.toFixed(2)}%`; // Utiliser toFixed(2) pour limiter à 2 décimales

    const pointsDisplay = document.querySelector('.money span');
    pointsDisplay.textContent = `Argent: $ ${points}`;

    const levelDisplay = document.querySelector('.level span');
    levelDisplay.textContent = `Niveau: ${level}`;
}

updateStats(100, 1000)
