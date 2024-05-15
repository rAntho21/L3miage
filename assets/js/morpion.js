//import {updateStats} from './profil.js';

let board = Array(9).fill(null);
let currentPlayer = 'X';
let timeoutId;
let timeoutDuration = 5000; // 5 secondes par défaut
let intervalId; // Variable globale pour stocker l'ID de l'intervalle


function handleCellClick(cell, i) {
    if (!cell.textContent && !checkWin(board)) {
        cell.textContent = currentPlayer;
        board[i] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        onMove();
        if (!checkWin(board)) {
            if (botType === 'random') {
                botMove();
            } else if (botType === 'intelligent') {
                intelligentBotMove();
            }
            onMove();
        }
        if (checkWin(board)) {
            setTimeout(() => {
                alert(`Player ${checkWin(board)} wins!`);
                location.reload();
            }, 100);
        }
    }
    startTimer();

}

document.querySelectorAll('.cell').forEach((cell, i) => {
    cell.addEventListener('click', () => handleCellClick(cell, i));
});


// Obtenez tous les boutons de difficulté
const difficultyButtons = document.querySelectorAll('#difficulty-buttons button');

// Ajoutez un gestionnaire d'événements à chaque bouton
difficultyButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Supprimez la classe 'selected' de tous les boutons
        difficultyButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.classList.remove('disabled');
        });

        // Ajoutez la classe 'selected' au bouton cliqué
        this.classList.add('selected');

        // Ajoutez la classe 'disabled' à tous les autres boutons
        difficultyButtons.forEach(btn => {
            if (btn !== this) {
                btn.classList.add('disabled');
            }
        });
    });
});

function onMove() {
    if (areAllCellsSelected()) {
        if (checkWin(board)) {
            alert(`Player ${checkWin(board)} wins!`);
        } else {
            alert('Personne ne gagne');
        }
    }
}

function areAllCellsSelected() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function setGridSize(rows, columns) {
    // Créez une nouvelle grille avec le nombre de lignes et de colonnes spécifié
    board = Array(rows * columns).fill(null);

    // Obtenez l'élément HTML de la grille
    const boardElement = document.getElementById('board');

    // Supprimez tous les enfants de l'élément de la grille
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }

    // Ajoutez la classe de taille appropriée à l'élément de la grille
    boardElement.classList.remove('size-3x3', 'size-4x4');
    boardElement.classList.add(`size-${rows}x${columns}`);

    // Créez les nouvelles cellules de la grille
    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', `size-${rows}x${columns}`);
        boardElement.appendChild(cell);

        // Ajoutez un gestionnaire d'événements à la cellule
        cell.addEventListener('click', () => handleCellClick(cell, i));
    }
}


function generateWinningLines(size) {
    let lines = [];

    // Lignes horizontales
    for (let i = 0; i < size; i++) {
        let line = [];
        for (let j = 0; j < size; j++) {
            line.push(i * size + j);
        }
        lines.push(line);
    }

    // Lignes verticales
    for (let i = 0; i < size; i++) {
        let line = [];
        for (let j = 0; j < size; j++) {
            line.push(j * size + i);
        }
        lines.push(line);
    }

    // Diagonales
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < size; i++) {
        diagonal1.push(i * size + i);
        diagonal2.push(i * size + (size - 1 - i));
    }
    lines.push(diagonal1, diagonal2);

    return lines;
}

function checkWin(board) {
    const size = Math.sqrt(board.length);
    const lines = generateWinningLines(size);
    for (let line of lines) {
        if (board[line[0]] && line.every(index => board[index] === board[line[0]])) {
            return board[line[0]];
        }
    }
    //updateStats(100, 1000);
    return null;
}

document.getElementById('restart-button').addEventListener('click', () => {
    location.reload();
});

let botType = 'random'; // Par défaut, le bot est aléatoire

//Difficulté des Bots
document.getElementById('difficulty-1').addEventListener('click', function() {
    botType = 'random';
    setGridSize(3, 3);
    timeoutDuration = 10000; // 10 secondes pour la difficulté 1
});

document.getElementById('difficulty-2').addEventListener('click', function() {
    botType = 'random';
    setGridSize(4, 4);
    timeoutDuration = 8000; // 8 secondes pour la difficulté 2
});

document.getElementById('difficulty-3').addEventListener('click', function() {
    botType = 'intelligent';
    setGridSize(3, 3);
    timeoutDuration = 6000; // 6 secondes pour la difficulté 3
});

document.getElementById('difficulty-4').addEventListener('click', function() {
    botType = 'intelligent';
    setGridSize(4, 4);
    timeoutDuration = 4000; // 4 secondes pour la difficulté 4
});

function botMove() {
    let availableCells = [];
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            availableCells.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * availableCells.length);
    let move = availableCells[randomIndex];
    makeMove(move);
}

function intelligentBotMove() {
    let winningMove = findWinningMove();
    if (winningMove !== null) {
        makeMove(winningMove);
    } else {
        let blockingMove = findBlockingMove();
        if (blockingMove !== null) {
            makeMove(blockingMove);
        } else {
            botMove();
        }
    }
}

function findWinningMove() {
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            board[i] = currentPlayer;
            if (checkWin(board)) {
                board[i] = null;
                return i;
            }
            board[i] = null;
        }
    }
    return null;
}

function findBlockingMove() {
    let opponent = currentPlayer === 'X' ? 'O' : 'X';
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            board[i] = opponent;
            if (checkWin(board)) {
                board[i] = null;
                return i;
            }
            board[i] = null;
        }
    }
    return null;
}

function makeMove(i) {
    const cell = document.querySelectorAll('.cell')[i];
    cell.textContent = currentPlayer;
    board[i] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

//Ajout d'une difficulté de temps pour le joueur

function startTimer() {
    // Si un intervalle est déjà en cours, l'annuler
    if (intervalId) {
        clearInterval(intervalId);
    }

    // Si un délai d'attente est déjà en cours, l'annuler
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    // Récupérez l'élément timer
    const timerElement = document.getElementById('timer');

    // Mettez à jour l'élément timer chaque seconde
    let timeLeft = timeoutDuration / 1000; // Convertir en secondes
    timerElement.textContent = `Temps restant : ${timeLeft} secondes`;
    intervalId = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Temps restant : ${timeLeft} secondes`;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
        }
    }, 1000);

    // Démarrer un nouveau délai d'attente
    timeoutId = setTimeout(() => {
        timeUp();
        clearInterval(intervalId);
    }, timeoutDuration);
}

function timeUp() {
    // Changer le joueur actuel
    let opponent = currentPlayer === 'X' ? 'O' : 'X';

    // Déclarer l'adversaire comme gagnant
    alert(`Le joueur ${opponent} gagne car le joueur ${currentPlayer} a pris trop de temps!`);
    location.reload();
}