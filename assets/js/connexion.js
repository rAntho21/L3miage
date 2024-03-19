let isConnected = localStorage.getItem('isConnected') === 'true';

const hardcodedUser = {
    username: 'root',
    password: 'root'
};

function checkLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isConnected) {
        isConnected = false;
        localStorage.setItem('isConnected', isConnected);
        alert('Vous êtes maintenant déconnecté !');
        document.getElementById('con').textContent = 'Se connecter';
        window.location.href = '../../src/navigation/connexion.html';
        return;
    }

    if (username === hardcodedUser.username && password === hardcodedUser.password) {
        isConnected = true;
        localStorage.setItem('isConnected', isConnected);
        alert('Connexion réussie !');
        window.location.href = '../../src/navigation/deconnexion.html';
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect !');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const deconButton = document.getElementById('decon');
    if (deconButton) {
        deconButton.addEventListener('click', function(event) {
            event.preventDefault();
            isConnected = false;
            localStorage.setItem('isConnected', isConnected);
            alert('Vous êtes maintenant déconnecté !');
            window.location.href = '../../src/navigation/connexion.html';
        });
    } else {
        console.error("le bouton déconnexion n'existe pas");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.form').addEventListener('submit', function(event) {
        event.preventDefault();
        checkLogin();
    });
});

window.onload = function() {
    const isConnected = localStorage.getItem('isConnected') === 'true';
    const currentUrl = window.location.href;

    if (isConnected && !currentUrl.includes('deconnexion.html')) {
        window.location.href = '../../src/navigation/deconnexion.html';
    } else if (!isConnected && !currentUrl.includes('connexion.html')) {
        window.location.href = '../../src/navigation/connexion.html';
    }
};