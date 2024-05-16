// Récupérer les valeurs stockées dans le localStorage ou initialiser à 0 si elles n'existent pas
let experience = localStorage.getItem('experience') && !isNaN(localStorage.getItem('experience')) ? parseInt(localStorage.getItem('experience')) : 0;
let points = localStorage.getItem('points') && !isNaN(localStorage.getItem('points')) ? parseInt(localStorage.getItem('points')) : 0;

/**
 * Ajoute les statistiques passées en paramètre aux statistiques actuelles
 * @param expGain
 * @param pointsGain
 */
export function addStats(expGain, pointsGain) {
    experience += expGain;
    points += pointsGain;
}

// Alimentation de l'affichage des données sur le HTML
function updateDisplay({points, experience}) {
    const experiencePercentage = ((experience % 1000) / 1000) * 100;
    const experienceBar = document.querySelector('.experience .progress-bar');
    experienceBar.style.width = `${experiencePercentage}%`;
    const experiencePercentageDisplay = document.querySelector('.experience .experience-percentage');
    experiencePercentageDisplay.textContent = `${experiencePercentage.toFixed(2)}%`;

    const pointsDisplay = document.querySelector('.money span');
    pointsDisplay.textContent = `Argent: $ ${points}`;

    const levelDisplay = document.querySelector('.level span');
    levelDisplay.textContent = `Niveau: ${Math.floor(experience / 1000)}`;
}

//addStats(2349, 2000);

window.onload = () => {
    updateDisplay({points, experience});
};