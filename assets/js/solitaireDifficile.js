var timerInterval;
var totalSeconds = 10; // Durée totale du timer en secondes
var seconds = 0;
var timerRunning = false;
var points = 0;
var gameStarted = true;

function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
        gameStarted = true;
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    updateTimerDisplay();
}

function updateTimer() {
    seconds++;
    updateTimerDisplay();
    
    // Vérifie si le temps imparti est écoulé
    if (seconds >= totalSeconds) {
        stopTimer();
        // Déclarez la défaite du joueur ici
        // alert("Temps écoulé. Vous avez perdu !");
        notification.classList.add('show');
         setTimeout(() => {
             notification.classList.remove('show');
        }, 5000);
    }
}

function updateTimerDisplay() {
    var minutes = Math.floor((totalSeconds - seconds) / 60);
    var remainingSeconds = (totalSeconds - seconds) % 60;
    var timerDisplay = document.getElementById('timer');

    timerDisplay.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

document.getElementById('startButton').addEventListener('click', function () {
    startTimer();
});

const notification = document.getElementById('notification');

document.getElementById('moyen').addEventListener('click', function(){
    level_medium
});

document.getElementById('startButton').addEventListener('click', function () {
    startTimer();
    gameStarted = true;
});

// Fonction pour ajuster les points en fonction des actions de l'utilisateur
function adjustPoints(action) {
    // Vérifie le type d'action et ajuste les points en conséquence
    if (action === 'flipCard') {
        points += 10; // Vous retournez une carte du tableau : + 10 points
    } else if (action === 'moveToTableau') {
        points += 10; // Vous déplacez une carte de la réserve vers le tableau : + 10 points
    } else if (action === 'moveToFoundation') {
        points += 15; // Vous placez une carte sur l’une des fondations : + 15 points
    } else if (action === 'moveFromFoundation') {
        points -= 5; // Vous déplacez une carte des fondations vers le tableau : - 5 points
    }
    updatePointsDisplay(); // Met à jour l'affichage des points
}

// Fonction pour mettre à jour l'affichage des points
function updatePointsDisplay() {
    var pointsDisplay = document.getElementById('pointsDisplay'); // Récupère l'élément d'affichage des points dans le DOM
    pointsDisplay.textContent = 'Points: ' + points; // Met à jour le contenu de l'élément d'affichage des points avec le nombre de points
}

function checkWinCondition() {
    var allFoundationsFull = true;

    // Vérifie si toutes les fondations contiennent 13 cartes
    for (var i = 0; i < ftds.length; i++) {
        if (ftds[i].number !== 13) {
            allFoundationsFull = false;
            break;
        }
    }

    // Si toutes les fondations sont pleines, affiche un message de victoire
    if (allFoundationsFull) {
        alert('Félicitations, vous avez gagné !');
    }
}


// La suite du code est la création et la gestion du jeu de cartes et de l'interface utilisateur, avec des commentaires semblables aux précédents pour chaque ligne de code.

// Initialise un tableau vide pour stocker les cartes
cards = [];

// Définit les valeurs des cartes (de l'As au Roi)
entities = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Définit les enseignes des cartes (Carreau, Coeur, Pique, Trèfle)
suits = ['D', 'H', 'S', 'C'];

// Initialise un compteur pour l'indice des cartes
z = 0;

// Boucle à travers toutes les enseignes
for (i = 0; i < suits.length; i++) {
    // Boucle à travers toutes les valeurs des cartes
    for (j = 0; j < entities.length; j++) {
        // Crée un objet pour chaque carte et l'ajoute au tableau cards
        cards[z] = {};
        // Attribue l'enseigne à la carte
        cards[z].suit = suits[i];
        // Détermine la couleur de la carte (rouge ou noir)
        if (cards[z].suit == 'D' || cards[z].suit == 'H') {
            cards[z].color = 'r';
        }
        if (cards[z].suit == 'C' || cards[z].suit == 'S') {
            cards[z].color = 'b';
        }
        // Attribue la valeur de la carte (As, 2, 3, ..., Roi)
        cards[z].face = entities[j];
        // Attribue le numéro de la carte en fonction de son indice dans le tableau entities
        cards[z].number = j;
        // Indique que la carte est face cachée
        cards[z].up = false;
        // Incrémente le compteur d'indice des cartes
        z++;
    }
}

// Mélange les cartes dans le tableau cards (boucle de brassage)
for (j = 0; j < 10; j++) {
    for (i = 0; i < cards.length; i++) {
        // Sélectionne un indice aléatoire dans le tableau cards
        ri = Math.floor(Math.random() * cards.length);
        // Échange les cartes aux indices i et ri
        tmp = cards[ri];
        cards[ri] = undefined;
        cards[ri] = cards[i];
        cards[i] = undefined;
        cards[i] = tmp;
    }
}

// Récupère l'élément HTML représentant le champ de jeu
field = document.getElementById('field');

// Récupère tous les éléments HTML de type 'td' à l'intérieur du champ de jeu
tds = field.getElementsByTagName('td');

// Initialise un tableau pour stocker les cartes sur le champ de jeu
fieldcards = [];

// Attribution de l'indice i à chaque élément td
for (i = 0; i < tds.length; i++) {
    tds[i].i = i;
}

// Initialise les variables de lignes (row) et de colonnes (col)
row = 0;
col = 0;

// Distribue les cartes sur le champ de jeu
for (i = 0; i < tds.length; i++) {
    for (j = 0; j < 7; j++) {
        // Distribue les cartes de façon croissante de haut en bas et de gauche à droite
        if (row == j) {
            if (col <= j) {
                // Les premières cartes sont placées face cachée
                if (col < j) {
                    if (fieldcards[i] == undefined) {
                        card = cards.pop();
                        fieldcards[i] = card;
                    }
                } else {
                    // La dernière carte est placée face visible et rendue draggable
                    if (fieldcards[i] == undefined) {
                        card = cards.pop();
                        card.up = true;
                        fieldcards[i] = card;
                        tds[i].setAttribute('draggable', 'true');
                        tds[i].addEventListener('dragstart', tds[i].d3 = function (e) {
                            e.dataTransfer.setData('fromi', this.i);
                        });
                    }
                }
            }
            if (col==j+1) {
                // Vérifie si la colonne actuelle correspond à la colonne j+1
            
                // Ajoute un écouteur d'événement pour le survol de la case
                tds[i].addEventListener('dragover',tds[i].d1=function (e) {
                    e.preventDefault();
                    // Empêche l'action par défaut lors du survol de la case
                });
            
                // Ajoute un écouteur d'événement pour le lâcher sur la case
                tds[i].addEventListener('drop', tds[i].d2=function (e) {
                    e.preventDefault();
                    // Empêche l'action par défaut lors du lâcher sur la case
            
                    // Récupère les données de l'élément glissé
                    fromi=parseInt(e.dataTransfer.getData('fromi'));
                    ishand=e.dataTransfer.getData('hand')
            
                    // Calcul de la dernière colonne
                    lastcol=this.i-7;
                    if (lastcol<0) {
                        lastcol=-1;
                    }
            
                    if (ishand==true) {
                        // Vérifie si l'élément glissé est dans la main
                        if (lastcol!=-1 && ((handcard.color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && handcard.color=='b'))) {
                            // Vérifie si la couleur des cartes correspond et si les nombres sont consécutifs
                            if (handcard.number+1==fieldcards[lastcol].number) {
                                // Échange les cartes et met à jour l'affichage
                                tmp=handcard;
                                handcard=undefined;
                                handcard=undefined
                                hand.innerHTML='';
                                fieldcards[this.i]=undefined;
                                fieldcards[this.i]=tmp;
                                update();
                                adjustPoints('moveToFoundation');
                            }
                        }
                    } else {
                        // Si l'élément glissé est sur le plateau
                        if (lastcol!=-1 && ((fieldcards[fromi].color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && fieldcards[fromi].color=='b'))) {
                            // Vérifie si la couleur des cartes correspond et si les nombres sont consécutifs
                            if (fieldcards[fromi].number+1==fieldcards[lastcol].number) {
                                // Déplace la carte et met à jour l'affichage
                                tmp=fieldcards[fromi];
                                fieldcards[fromi]=undefined;
                                fieldcards[this.i]=undefined;
                                fieldcards[this.i]=tmp;
                                update();
                                adjustPoints('moveToFoundation');
                                
                            }
                        }
                    }
                    checkWinCondition();
                });
            }
        }
    }
            
            // Incrémente le numéro de ligne
            row++;
            
            // Si le numéro de ligne dépasse 6, réinitialise la ligne et incrémente le numéro de colonne
            if (row>=7) {
                row=0;
                col++;
            }
        }
         
        for (i=0;i<tds.length;i++) {
            // Parcourt tous les éléments dans le tableau tds
        
            if (fieldcards[i]!=undefined) {
                // Vérifie si une carte existe à cet indice dans le tableau fieldcards
        
                if (fieldcards[i].up==false) {
                    // Vérifie si la carte est face cachée
        
                    // Affiche un symbole pour une carte face cachée et définit la couleur du texte
                    tds[i].innerHTML='&#127136;'
                    tds[i].style.color='lightblue';
                    
                } else {
                    // Si la carte est retournée (face visible)
                     
                    // Définit le symbole correspondant à la couleur de la carte et définit la couleur du texte en fonction de la couleur de la carte
                    suit=''
                    if (fieldcards[i].suit=='S') {
                        suit='&#9824;';
                        tds[i].style.color='black';
                    }
                    if (fieldcards[i].suit=='H') {
                        suit='&#9829;';
                        tds[i].style.color='#a33';
                    }
                    if (fieldcards[i].suit=='C') {
                        suit='&#9827;';
                        tds[i].style.color='black';
                    }
                    if (fieldcards[i].suit=='D') {
                        suit='&#9830;';
                        tds[i].style.color='#a33';
                    }
                    
                    // Affiche le visage de la carte suivi du symbole de la couleur de la carte
                    tds[i].innerHTML=fieldcards[i].face+''+suit
                }
            } else {
                // Si aucune carte n'existe à cet indice dans le tableau fieldcards
        
                // Affiche une chaîne vide dans la case
                tds[i].innerHTML='';
            }
        }
        
         
        function update() {
            // Réinitialise les variables row et col

            if (!gameStarted) return;

            row=0;
            col=0;
             
            // Réinitialise les tableaux rz et pz
            rz=[];
            pz=[];
             
            // Réinitialise la couleur de fond de toutes les cases du tableau tds
            for (i=0;i<tds.length;i++) {
                tds[i].style.backgroundColor='#229933';
            }
            
            // Désactive les écouteurs d'événements pour le drag and drop sur toutes les cases du tableau tds
            for (i=0;i<tds.length;i++) {
                tds[i].removeEventListener('drop',tds[i].d2);
                tds[i].removeEventListener('dragover',tds[i].d1);
                tds[i].removeEventListener('dragstart',tds[i].d3);
                tds[i].setAttribute('draggable','false');
                
                // Calcule l'indice de la colonne suivante
                nextcol=i+7;
                if (nextcol>tds.length-1) {
                    nextcol=-1;
                }
                
                // Si la colonne suivante est vide et la colonne actuelle est non vide, la carte est retournée
                if (nextcol!=-1 && fieldcards[nextcol]==undefined && fieldcards[i]!=undefined) {
                    fieldcards[i].up=true;
                }
                
                // Si la colonne est la première et la case est vide, ajoute les écouteurs d'événements pour le drag and drop
                if (col==0 && fieldcards[i]==undefined) {
                    tds[i].addEventListener('dragover',tds[i].d1=function (e) {
                        e.preventDefault();
                    });
                    if (col==0) {
                        tds[i].addEventListener('drop', tds[i].d2=function (e) {
                            e.preventDefault();
                            fromi=parseInt(e.dataTransfer.getData('fromi'));
                            ishand=e.dataTransfer.getData('hand');
                            isstack=e.dataTransfer.getData('stack');
                            if (isstack==true) {
                                // Si une pile est déplacée et la carte en haut de la pile est un roi, déplace la pile
                                if (fieldcards[fromi].number==12) {
                                    for (z=0;z<13;z++) {
                                        tmp=fieldcards[fromi+(z*7)];
                                        fieldcards[fromi+(z*7)]=undefined;
                                        fieldcards[this.i+(z*7)]=undefined;
                                        fieldcards[this.i+(z*7)]=tmp;
                                    }
                                    update();
                                }
                            } else {
                                // Si une carte de la main est déplacée et c'est un roi, déplace la carte
                                if (ishand==true && handcard.number==12) {
                                    tmp=handcard;
                                    handcard=undefined;
                                    handcard=undefined;
                                    hand.innerHTML='';
                                    fieldcards[this.i]=undefined;
                                    fieldcards[this.i]=tmp;
                                    update();
                                    handshift();
                                } else {
                                    // Si une carte du plateau est déplacée et c'est un roi, déplace la carte
                                    if (fieldcards[fromi].number==12) {
                                        tmp=fieldcards[fromi];
                                        fieldcards[fromi]=undefined;
                                        fieldcards[this.i]=undefined;
                                        fieldcards[this.i]=tmp;
                                        update();
                                    }
                                }
                            }
                        });
                    }
                }
            
        
           //console.log(pz[row]);
            rz[row]=fieldcards[i];
            //console.log(rz[row]);

                // Vérifie si la case actuelle est vide et la case précédente contient une carte
                if (rz[row]==undefined && pz[row]!=undefined) {
                    // Ajoute des écouteurs d'événements pour le survol et le lâcher sur la case
                    tds[i].addEventListener('dragover',tds[i].d1=function (e) {
                        e.preventDefault();
                    });
                    tds[i].addEventListener('drop', tds[i].d2=function (e) {
                        e.preventDefault();
                        fromi=parseInt(e.dataTransfer.getData('fromi'));
                        ishand=e.dataTransfer.getData('hand')
                        isstack=e.dataTransfer.getData('stack')
                        lastcol=this.i-7;
                        if (lastcol<0) {
                            lastcol=-1;
                        }

                        // Si une pile de cartes est déplacée, vérifie si les cartes peuvent être empilées
                        if (isstack==true) {
                            if (lastcol!=-1 && ((fieldcards[fromi].color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && fieldcards[fromi].color=='b'))) {
                                if (fieldcards[fromi].number+1==fieldcards[lastcol].number) {
                                    // Déplace la pile de cartes
                                    for (z=0;z<13;z++) {
                                        tmp=fieldcards[fromi+(z*7)];
                                        fieldcards[fromi+(z*7)]=undefined;
                                        fieldcards[this.i+(z*7)]=undefined;
                                        fieldcards[this.i+(z*7)]=tmp;
                                    }
                                    update();
                                }
                            }
                        } else {
                            // Si une carte de la main est déplacée
                            if (ishand==true) {
                                if (lastcol!=-1 && ((handcard.color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && handcard.color=='b'))) {
                                    if (handcard.number+1==fieldcards[lastcol].number) {
                                        // Déplace la carte de la main sur le plateau
                                        tmp=handcard;
                                        handcard=undefined;
                                        handcard=undefined
                                        hand.innerHTML='';
                                        fieldcards[this.i]=undefined;
                                        fieldcards[this.i]=tmp;
                                        update();
                                        adjustPoints('moveToTbleau');
                                        handshift();
                                    }
                                }
                            } else {
                                // Si une carte du plateau est déplacée
                                if (lastcol!=-1 && ((fieldcards[fromi].color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && fieldcards[fromi].color=='b'))) {
                                    if (fieldcards[fromi].number+1==fieldcards[lastcol].number) {
                                        // Déplace la carte du plateau
                                        tmp=fieldcards[fromi];
                                        fieldcards[fromi]=undefined;
                                        fieldcards[this.i]=undefined;
                                        fieldcards[this.i]=tmp;
                                        update();
                                    }
                                }
                            }
                        }
                    });
                }

            // Copie la carte actuelle du plateau de jeu dans le tableau pz
            pz[row]=fieldcards[i];
            // Si une carte existe à cet indice dans le tableau fieldcards
            if (fieldcards[i]!=undefined) {
                // Vérifie si la carte est face cachée
                if (fieldcards[i].up==false) {
                        // Si oui, affiche un symbole pour une carte face cachée et définit la couleur du texte en bleu clair

                    tds[i].innerHTML='&#127136;'
                    tds[i].style.color='lightblue';
                } else {
                    // Sinon, détermine le symbole correspondant à la couleur de la carte et définit la couleur du texte en fonction de la couleur de la carte
                    suit=''
                    if (fieldcards[i].suit=='S') {
                        suit='&#9824;';
                        tds[i].style.color='black';
                    }
                    if (fieldcards[i].suit=='H') {
                        suit='&#9829;';
                        tds[i].style.color='#a33';
                        
                    }
                    if (fieldcards[i].suit=='C') {
                        suit='&#9827;';
                        tds[i].style.color='black';
                        
                    }
                    if (fieldcards[i].suit=='D') {
                        suit='&#9830;';
                        tds[i].style.color='#a33';
                        
                    }
                // Affiche le visage de la carte suivi du symbole de la couleur de la carte
                tds[i].innerHTML=fieldcards[i].face+''+suit
                adjustPoints('flipCard');
                }
            } else {
                // Si aucune carte n'existe à cet indice dans le tableau fieldcards, affiche une chaîne vide dans la case
                tds[i].innerHTML='';
            }
            // Incrémente le numéro de ligne
            row++;

            // Si le numéro de ligne dépasse 6, réinitialise la ligne et incrémente le numéro de colonne
            if (row>=7) {
                row=0;
                col++;
            }
        }
        // Parcourt toutes les cases du plateau de jeu
        for (i=0;i<tds.length;i++) {
            // Calcule l'indice de la colonne suivante
            nextcol=i+7;
            if (nextcol>tds.length-1) {
                nextcol=-1;
            }
            // Si la colonne suivante est vide et la colonne actuelle contient une carte, active le glisser-déposer pour cette carte
            if (nextcol!=-1 && fieldcards[nextcol]==undefined && fieldcards[i]!=undefined) {
                
                tds[i].setAttribute('draggable','true');
                tds[i].addEventListener('dragstart',tds[i].d3=function (e) {
                    e.dataTransfer.setData('fromi',this.i);
                });
            }
            // Si la colonne suivante contient une carte empilée et la carte actuelle est retournée, active le glisser-déposer pour cette carte
            if (nextcol!=-1 && fieldcards[nextcol]!=undefined && fieldcards[i].up==true) {
            //tds[i].style.backgroundColor='#fff'
            tds[i].setAttribute('draggable','true');
                tds[i].addEventListener('dragstart',tds[i].d3=function (e) {
                    e.dataTransfer.setData('fromi',this.i);
                    e.dataTransfer.setData('stack',1);
                });
                //console.log(row,col);
                
            }
        }
         
        }
        // Sélectionne l'élément HTML correspondant à la main du joueur et au paquet de cartes
        hand=document.getElementById('hand');
        deck=document.getElementById('deck');
        // Retire la dernière carte du tableau de cartes (correspondant à la pioche) et la stocke dans la main du joueur
        handcard=cards.pop();
        // Initialise l'indice de la main du joueur à 0 et indique que la carte est retournée (face visible)
        hand.i=0
        handcard.up=true;
        // Détermine le symbole correspondant à la couleur de la carte et définit la couleur du texte en conséquence
        suit=''
        if (handcard.suit=='S') {
            suit='&#9824;';
            hand.style.color='black';
        }
        if (handcard.suit=='H') {
            suit='&#9829;';
            hand.style.color='#a33';
            
        }
        if (handcard.suit=='C') {
            suit='&#9827;';
            hand.style.color='black';
            
        }
        if (handcard.suit=='D') {
            suit='&#9830;';
            hand.style.color='#a33';
            
        }
         // Affiche le visage de la carte suivi du symbole de la couleur de la carte dans la main du joueur
        hand.innerHTML=handcard.face+''+suit
        // Active le glisser-déposer pour la main du joueur
        hand.setAttribute('draggable','true');
        hand.addEventListener('dragstart',hand.d3=function (e) {
            e.dataTransfer.setData('fromi',this.i);
            e.dataTransfer.setData('hand',1);
        });
        function handshift() {
            // Retire la première carte du tableau de cartes (correspondant à la pioche) et la stocke dans la main du joueur
        handcard = cards.shift();

        // Initialise l'indice de la main du joueur à 0 et indique que la carte est retournée (face visible)
        hand.i = 0;
        handcard.up = true;

        // Détermine le symbole correspondant à la couleur de la carte et définit la couleur du texte en conséquence
        let suit = '';
        if (handcard.suit == 'S') {
            suit = '&#9824;';
            hand.style.color = 'black';
        }
        if (handcard.suit == 'H') {
            suit = '&#9829;';
            hand.style.color = '#a33';
        }
        if (handcard.suit == 'C') {
            suit = '&#9827;';
            hand.style.color = 'black';
        }
        if (handcard.suit == 'D') {
            suit = '&#9830;';
            hand.style.color = '#a33';
        }

        // Affiche le visage de la carte suivi du symbole de la couleur de la carte dans la main du joueur
        hand.innerHTML = handcard.face + '' + suit;

        // Active le glisser-déposer pour la main du joueur
        hand.setAttribute('draggable', 'true');
        hand.addEventListener('dragstart', hand.d3 = function (e) {
            e.dataTransfer.setData('fromi', this.i);
            e.dataTransfer.setData('hand', 1);
        });

        }
        // Ajoute un écouteur d'événements pour le clic sur la pioche
        deck.addEventListener('click', function () {
            // Vérifie si une carte est déjà présente dans la main du joueur
            if (handcard != undefined) {
                // Si oui, remet cette carte au-dessus du paquet de cartes
                cards.unshift(handcard);
            }
            // Retire la première carte du paquet de cartes (correspondant à la pioche) et la stocke dans la main du joueur
            handcard = cards.pop();

            // Initialise l'indice de la main du joueur à 0 et indique que la carte est retournée (face visible)
            hand.i = 0;
            handcard.up = true;

            // Détermine le symbole correspondant à la couleur de la carte et définit la couleur du texte en conséquence
            let suit = '';
            if (handcard.suit == 'S') {
                suit = '&#9824;';
                hand.style.color = 'black';
            }
            if (handcard.suit == 'H') {
                suit = '&#9829;';
                hand.style.color = '#a33';
            }
            if (handcard.suit == 'C') {
                suit = '&#9827;';
                hand.style.color = 'black';
            }
            if (handcard.suit == 'D') {
                suit = '&#9830;';
                hand.style.color = '#a33';
            }

            // Affiche le visage de la carte suivi du symbole de la couleur de la carte dans la main du joueur
            hand.innerHTML = handcard.face + '' + suit;

            // Active le glisser-déposer pour la main du joueur
            hand.setAttribute('draggable', 'true');
            hand.addEventListener('dragstart', hand.d3 = function (e) {
                e.dataTransfer.setData('fromi', this.i);
                e.dataTransfer.setData('hand', 1);
            });
        });

         
        // Sélectionne l'élément HTML correspondant aux quatre emplacements sur la table de jeu
fourtable = document.getElementById('four');
ftds = fourtable.getElementsByTagName('td'); // Récupère tous les éléments <td> dans l'élément fourtable
fsuits = ['H', 'D', 'C', 'S']; // Définit les quatre couleurs de cartes : Hearts (Coeurs), Diamonds (Carreaux), Clubs (Trèfles), Spades (Piques)

// Boucle à travers chaque emplacement sur la table de jeu
for (i = 0; i < ftds.length; i++) {
    // Initialise le numéro de carte de l'emplacement à 0 et définit sa couleur de carte correspondante
    ftds[i].number = 0;
    ftds[i].suit = fsuits[i];

    // Ajoute des écouteurs d'événements pour gérer le glisser-déposer des cartes sur chaque emplacement de la table
    ftds[i].addEventListener('dragover', tds[i].d1 = function (e) {
        e.preventDefault(); // Empêche le comportement par défaut du navigateur
    });
    ftds[i].addEventListener('drop', tds[i].d2 = function (e) {
        e.preventDefault(); // Empêche le comportement par défaut du navigateur

        // Vérifie si la carte est dans la main du joueur ou sur le plateau de jeu
        ishand = e.dataTransfer.getData('hand');
        fromi = parseInt(e.dataTransfer.getData('fromi'));

        // Si la carte est dans la main du joueur
        if (ishand == true) {
            // Vérifie si la carte peut être placée sur cet emplacement
            if (handcard.suit == this.suit) {
                if (handcard.number == this.number) {
                    // Détermine le symbole correspondant à la couleur de la carte
                    suit = '';
                    if (handcard.suit == 'S') {
                        suit = '&#9824;';
                        hand.style.color = 'black';
                    }
                    if (handcard.suit == 'H') {
                        suit = '&#9829;';
                        hand.style.color = '#a33';
                    }
                    if (handcard.suit == 'C') {
                        suit = '&#9827;';
                        hand.style.color = 'black';
                    }
                    if (handcard.suit == 'D') {
                        suit = '&#9830;';
                        hand.style.color = '#a33';
                    }
                    // Affiche la carte sur cet emplacement et met à jour le numéro de carte
                    this.innerHTML = handcard.face + '' + suit;
                    this.number++;
                    handcard = undefined;
                    hand.innerHTML = '';
                    handshift(); // Décale une nouvelle carte de la pioche à la main du joueur
                }
            }
        } else { // Si la carte est sur le plateau de jeu
            // Vérifie si la carte peut être placée sur cet emplacement
            if (fieldcards[fromi].suit == this.suit) {
                if (fieldcards[fromi].number == this.number) {
                    // Détermine le symbole correspondant à la couleur de la carte
                    suit = '';
                    if (fieldcards[fromi].suit == 'S') {
                        suit = '&#9824;';
                        hand.style.color = 'black';
                    }
                    if (fieldcards[fromi].suit == 'H') {
                        suit = '&#9829;';
                        hand.style.color = '#a33';
                    }
                    if (fieldcards[fromi].suit == 'C') {
                        suit = '&#9827;';
                        hand.style.color = 'black';
                    }
                    if (fieldcards[fromi].suit == 'D') {
                        suit = '&#9830;';
                        hand.style.color = '#a33';
                    }
                    // Affiche la carte sur cet emplacement et met à jour le numéro de carte
                    this.innerHTML = fieldcards[fromi].face + '' + suit;
                    this.number++;
                    // Déplace la carte du plateau de jeu vers cet emplacement et met à jour le plateau de jeu
                    tmp = fieldcards[fromi];
                    fieldcards[fromi] = undefined;
                    fieldcards[this.i] = undefined;
                    fieldcards[this.i] = tmp;
                    update();
                }
            }
        }
    });
}
