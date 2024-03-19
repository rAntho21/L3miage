// Liste de vos pages de jeu
const pages = [
    { name: 'Sudoku', url: 'src/jeux/sudoku.html' },
    { name: 'Pendu', url: 'src/jeux/pendu.html' },
    { name: 'Morpion', url: 'src/jeux/morpion.html' },
    { name: 'Solitaire', url: 'src/jeux/solitaire.html' },
    { name: 'Profil', url: 'src/navigation/profil.html' },
    { name: 'Paramètre', url: 'src/navigation/parametres.html' },
    { name: 'Jeux', url: 'src/navigation/listeJeux.html' },
    { name: 'Boutique', url: 'src/navigation/boutique.html' }
];

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