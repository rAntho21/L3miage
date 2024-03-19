const hardcodedUser = {
    username: 'root',
    password: 'root'
};

function checkLogin() {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    if (enteredUsername === hardcodedUser.username && enteredPassword === hardcodedUser.password) {
        alert('Connexion réussie !');
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect !');
    }
}


document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();
    checkLogin();
});