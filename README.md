<h1>Projet Web Javascript</h1>

<h2>Objectif</h2>
<p>
Avoir un site internet fonctionnel qui devra contenir des éléments de base.
C'est-à-dire pouvoir se connecter, et avoir plusieurs jeux auxquels on peut y jouer.
Les jeux disponibles seront le Sudoku, la Bataille Navale et le Pendu.
</p>
<h2>Les Jeux</h2>
<h3>Le Pendu</h3>
<h4>Règles du jeu</h4>
<p>
Le jeu du pendu consiste à trouver un mot généré aléatoirement selon la difficulté.
Le joueur aura un certain nombre de vies pour trouver celui-ci en citant des lettres.
Lorsque l’utilisateur pense avoir le mot, il peut tenter sa chance, si il échoue alors il perdra une vie.
</p>
<h4>Difficultés</h4>
<p>
La difficulté sera changée selon le niveau de l’utilisateur. 
La difficulté sera modifier par la longueur des mots, la difficulté de trouver certaines lettres,
une réduction de temps pour trouver le mot, des mots composés, 
le joueur ne sera pas combien il y a de lettre dans le mot et l’utilisateur aura moins de vies pour trouver le mot.
</p>
<h4>Scores</h4>
<p>
Il y aura un système de niveau. Selon la difficulté, 
le joueur gagnera de l'expérience selon une victoire ou une défaite. 
De plus, plus l’utilisateur joue, plus il aura de difficulté.
</p>
<h4>Succès</h4>
<ul>
    <li>Gagner une partie pour la première fois.</li>
    <li>Gagner une partie en moins 30 secondes.</li>
    <li>Gagner une partie en trouvant toutes les lettres et le mot du premier coup.</li>
    <li>Gagner tous les succès en une partie.</li>
</ul>

<h3>La Bataille Navale</h3>
<h4>Règles du jeu</h4>
<p>
Le jeu se joue à 2 joueurs, c’est un 1 versus 1,tour par tour.
Il se joue sur 2 grilles différentes, chaque grille appartient à 1 joueur.
Les joueurs pourront placer 5 bateaux de différentes tailles sur leur grille respective. 
Les bateaux seront placés <strong>OBLIGATOIREMENT</strong> horizontalement ou verticalement. 
Ils devront tour par tour sélectionner une case sur la grille adverse (touché-coulé) et ainsi faire tomber tous les bateaux de l’ennemi.
</p>
<h4>Difficultés</h4>
<ul>
    <li><strong>Facile</strong></li>
    <ul>
        <li>Les bateaux sont de la même taille.</li>
        <li>Les cases déjà ciblée restent affichée.</li>
        <li>Les bateaux sont placée que verticalement.</li>
        <li>Si la case d’un bateau est touché le joueur peut continuer à jouer.</li>
    </ul>
    <li><strong>Moyen</strong></li>
    <ul>
        <li>Mettre un timer de 15 minutes.</li>
        <li>Les bateaux sont de tailles différentes.</li>
        <li>Les bateaux peuvent se placer de manière horizontal et vertical.</li>
        <li>Le joueur peut effectuer qu’un seul tir par tour même si un bateau est touché.</li>
    </ul>
    <li><strong>Difficile</strong></li>
    <ul>
        <li>Mettre un timer de 10 minutes.</li>
        <li>Les joueurs qui ont ciblé l’eau (coulé) ne s’affiche pas sur le plateau, 
        elle s’affiche que lorsqu’il touche un bateau.</li>
        <li>Ajout de Leurre pour donner de fausse indication.</li>
        <li>Certains bateaux peuvent se déplacer d’une case, tous les 3 tours(pas sur).</li>
    </ul>
</ul>
<h4>Scores</h4>
<p>
Les joueurs gagneront des points s' ils gagnent ou perdent selon la difficulté de la partie.
</p>
<h4>Succès</h4>
<ul>
    <li>Ils gagnent une partie en un temps définie.</li>
    <li>Ils font couler un bateau sans toucher une case “EAU”.</li>
    <li>Ils gagnent une partie avec la difficulté difficile.</li>
    <li>Ils ne se font pas couler un bateau.</li>
    <li>Ils essayent de tricher.</li>
</ul>

<h3>Sudoku</h3>
<h4>Règles du jeu</h4>
<p>
Chaque ligne, colonne et région de 9 cases ne doit contenir qu'une
seule fois tous les chiffres de un à neuf.
</p>
<h4>Difficultés</h4> 
<ul>
    <li><strong>Facile</strong></li>
    <p>
    Beaucoup de chiffres sont remplis, le jeu est simple à remplir.
    </p>
    <li><strong>Moyen</strong></li>
    <p>
    Il faudra réfléchir pour réussir ce niveau, moins de chiffres apparaissent.
    </p>
    <li><strong>Difficile</strong></li>
    <p>
    Il faudra utiliser des techniques avancées afin de réussir ces niveaux.
    <br>Les chiffres se font rares.
    </p>
</ul>
<h4>Scores</h4>
<p>
A la victoire d’une partie, le joueur remporte 10 points d’expérience et gagne aussi une petite somme d’argent.
<br>Lors de la défaite, le joueur remporte 2 points d’expérience.
<br>Si la difficulté “difficile” est sélectionnée, les points de victoire sont doublés mais lors de la défaite les points sont divisés par deux.
</p>
<h4>Succès</h4>
<ul>
    <li>Réussir 1 niveau de difficulté facile.</li>
    <li>Réussir 1 niveau de difficulté difficile</li>
    <li>Réussir 5 niveau de difficulté facile.</li>
    <li>Réussir 5 niveau de difficulté difficile.</li>
</ul>