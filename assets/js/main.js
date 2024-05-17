const isDaltonisme = localStorage.getItem('daltonisme') ? localStorage.getItem('daltonisme') : 'false';

// Vérifiez si l'utilisateur est sur la page d'accueil
const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

// Liste de vos pages de jeu
const pages = [
    { name: 'Sudoku', url: (isHomePage ? 'src/jeux/sudoku.html' : '../../src/jeux/sudoku.html') },
    { name: 'Pendu', url: (isHomePage ? 'src/jeux/pendu.html' : '../../src/jeux/pendu.html') },
    { name: 'Morpion', url: (isHomePage ? 'src/jeux/morpion.html' : '../../src/jeux/morpion.html') },
    { name: 'Solitaire', url: (isHomePage ? 'src/jeux/niveauSolitaire/solitaireMoyen.html' : '../../src/jeux/niveauSolitaire/solitaireMoyen.html') },
    { name: 'Profil', url: (isHomePage ? 'src/navigation/profil.html' : '../../src/navigation/profil.html') },
    { name: 'Paramètre', url: (isHomePage ? 'src/navigation/parameters.html' : '../../src/navigation/parameters.html') },
    { name: 'Jeux', url: (isHomePage ? 'src/navigation/listeJeux.html' : '../../src/navigation/listeJeux.html') },
    { name: 'Boutique', url: (isHomePage ? 'src/navigation/boutique.html' : '../../src/navigation/boutique.html') }
];

function activePopupErreurSearch() {
    const popup = document.getElementById("popupErreurSearch");
    if (popup) {
        console.log(popup);
        popup.classList.toggle("active");
        console.log(popup.classList);
    } else {
        console.log("popup non trouvé dans le html");
    }
}

window.onload = () => {
    if (isDaltonisme === 'true') {
        document.body.classList.add('daltonisme');
    } else {
        if (document.body.classList.contains('daltonisme')) document.body.classList.remove('daltonisme');
    }

    document.getElementById('search-button').addEventListener('click', function() {
        const searchMot = document.getElementById('search').value.toLowerCase();
        let found = false;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].name.toLowerCase().includes(searchMot)) {
                window.location.href = pages[i].url;
                found = true;
                break;
            }
        }
        if (!found) {
            activePopupErreurSearch();
        }
    });
}
