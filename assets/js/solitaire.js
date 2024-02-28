var timerInterval;
var seconds = 0;
var timerRunning = false;
var points = 0; // Variable pour stocker les points

function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
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
}

function updateTimerDisplay() {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    var timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

document.getElementById('startButton').addEventListener('click', function () {
    startTimer();
});

// Ajoutez ici votre code existant pour la création et le déplacement des cartes...

// Variable pour stocker les points
var points = 0;

// Fonction pour ajuster les points en fonction des actions de l'utilisateur
function adjustPoints(action) {
    if (action === 'flipCard') {
        // Vous retournez une carte du tableau : + 10 points
        points += 10;
    } else if (action === 'moveToTableau') {
        // Vous déplacez une carte de la réserve vers le tableau : + 10 points
        points += 10;
    } else if (action === 'moveToFoundation') {
        // Vous placez une carte sur l’une des fondations : + 15 points
        points += 15;
    } else if (action === 'moveFromFoundation') {
        // Vous déplacez une carte des fondations vers le tableau : - 5 points
        points -= 5;
    }
}

// Fonction pour mettre à jour l'affichage des points
function updatePointsDisplay() {
    var pointsDisplay = document.getElementById('points');
    pointsDisplay.textContent = 'Points: ' + points;
}









cards=[];
        entities=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
        suits=['D','H','S','C'];
        z=0;
        for (i=0;i<suits.length;i++) {
            for (j=0;j<entities.length;j++) {
                    cards[z]={};
                    cards[z].suit=suits[i];
                    if (cards[z].suit=='D' || cards[z].suit=='H') {
                        cards[z].color='r';
                    }
                    if (cards[z].suit=='C' || cards[z].suit=='S') {
                        cards[z].color='b';
                    }
                    cards[z].face=entities[j];
                    cards[z].number=j;
                    cards[z].up=false;
                    z++
            }
        }
        for (j=0;j<10;j++) {
            for (i=0;i<cards.length;i++) {
                ri=Math.floor(Math.random()*cards.length);
                tmp=cards[ri];
                cards[ri]=undefined;
                cards[ri]=cards[i];
                cards[i]=undefined;
                cards[i]=tmp
                
                
            }
        }
         
        field=document.getElementById('field');
        tds=field.getElementsByTagName('td');
        fieldcards=[];
         
        for (i=0;i<tds.length;i++) {
            tds[i].i=i;
           
        }
         
        row=0;
        col=0;
         
        for (i=0;i<tds.length;i++) {
            for (j=0;j<7;j++) {
            if (row==j) {
                if (col<=j) {
                    if (col<j) {
                        if (fieldcards[i]==undefined) {
                            card=cards.pop()
                            fieldcards[i]=card;
                        }
                    } else {
                        if (fieldcards[i]==undefined) {
                            card=cards.pop()
                            card.up=true;
                            fieldcards[i]=card;
                            tds[i].setAttribute('draggable','true');
                            tds[i].addEventListener('dragstart',tds[i].d3=function (e) {
                                e.dataTransfer.setData('fromi',this.i);
                            });
                        }
                    }
                }
                if (col==j+1) {
                    //tds[i].style.backgroundColor='#fff';
                    tds[i].addEventListener('dragover',tds[i].d1=function (e) {
                        e.preventDefault();
                        //console.log(1);
                    });
                    tds[i].addEventListener('drop', tds[i].d2=function (e) {
                        e.preventDefault();
                        fromi=parseInt(e.dataTransfer.getData('fromi'));
                        ishand=e.dataTransfer.getData('hand')
                        //console.log(fromi,ishand);
                        lastcol=this.i-7;
                        if (lastcol<0) {
                            lastcol=-1;
                        }
                        if (ishand==true) {
                            //console.log(1);
                            if (lastcol!=-1 && ((handcard.color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && handcard.color=='b'))) {
                                if (handcard.number+1==fieldcards[lastcol].number) {
                                    console.log(handcard.number,fieldcards[lastcol].number);
                                    //console.log(this.i,e.dataTransfer.getData('fromi'));
                                    tmp=handcard;
                                    handcard=undefined;
                                    handcard=undefined
                                    hand.innerHTML='';
                                    fieldcards[this.i]=undefined;
                                    fieldcards[this.i]=tmp;
                                    update();
                                }
                            }
                            
                        } else {
                            
                            //console.log(fromi,lastcol);
                            if (lastcol!=-1 && ((fieldcards[fromi].color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && fieldcards[fromi].color=='b'))) {
                                
                                if (fieldcards[fromi].number+1==fieldcards[lastcol].number) {
                                    //console.log(this.i,e.dataTransfer.getData('fromi'));
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
            }
            
            row++;
            if (row>=7) {
                row=0;
                col++;
            }
        }
         
        for (i=0;i<tds.length;i++) {
            if (fieldcards[i]!=undefined) {
                if (fieldcards[i].up==false) {
                    tds[i].innerHTML='&#127136;'
                    tds[i].style.color='lightblue';
                } else {
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
                    
                tds[i].innerHTML=fieldcards[i].face+''+suit
                }
            } else {
                tds[i].innerHTML='';
            }
        }
         
        function update() {
        row=0;
        col=0;
         
        rz=[];
        pz=[];
         
        for (i=0;i<tds.length;i++) {
        tds[i].style.backgroundColor='#229933';
        }
        for (i=0;i<tds.length;i++) {
            tds[i].removeEventListener('drop',tds[i].d2);
            tds[i].removeEventListener('dragover',tds[i].d1);
            tds[i].removeEventListener('dragstart',tds[i].d3);
            tds[i].setAttribute('draggable','false');
            
            nextcol=i+7;
            if (nextcol>tds.length-1) {
                nextcol=-1;
            }
            
            if (nextcol!=-1 && fieldcards[nextcol]==undefined && fieldcards[i]!=undefined) {
                fieldcards[i].up=true;
            }
            
            if (col==0 && fieldcards[i]==undefined) {
                //console.log(row,col);
                //tds[i].style.backgroundColor='#fff';
                    tds[i].addEventListener('dragover',tds[i].d1=function (e) {
                        e.preventDefault();
                        //console.log(1);
                    });
                    if (col==0) {
                        tds[i].addEventListener('drop', tds[i].d2=function (e) {
                            e.preventDefault();
                            fromi=parseInt(e.dataTransfer.getData('fromi'));
                            ishand=e.dataTransfer.getData('hand')
                            isstack=e.dataTransfer.getData('stack');
                            if (isstack==true) {
                                
                                    if (fieldcards[fromi].number==12) {
                                        
                                            console.log(fromi);
                                            for (z=0;z<13;z++) {
                                            tmp=fieldcards[fromi+(z*7)];
                                            fieldcards[fromi+(z*7)]=undefined;
                                            fieldcards[this.i+(z*7)]=undefined;
                                            fieldcards[this.i+(z*7)]=tmp;
                                            }
                                            update();
                                        }
                                    
                            } else {
                                
                                if (ishand==true) {
                                    if (handcard.number==12) {
                                    
                                    //console.log(1);
                                
                                            tmp=handcard;
                                            handcard=undefined;
                                            handcard=undefined
                                            hand.innerHTML='';
                                            fieldcards[this.i]=undefined;
                                            fieldcards[this.i]=tmp;
                                            update();
                                            
                                            handshift();
                                        }
                                    } else {
                                        if (fieldcards[fromi].number==12) {
                                            //console.log(this.i,e.dataTransfer.getData('fromi'));
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
            if (rz[row]==undefined && pz[row]!=undefined) {
                //console.log(row,col);
                
                //tds[i].style.backgroundColor='#fff';
                    tds[i].addEventListener('dragover',tds[i].d1=function (e) {
                        e.preventDefault();
                        //console.log(1);
                    });
                    tds[i].addEventListener('drop', tds[i].d2=function (e) {
                        e.preventDefault();
                        fromi=parseInt(e.dataTransfer.getData('fromi'));
                        ishand=e.dataTransfer.getData('hand')
                        isstack=e.dataTransfer.getData('stack')
                       // console.log(fromi,ishand);
                        lastcol=this.i-7;
                        if (lastcol<0) {
                            lastcol=-1;
                        }
                        if (isstack==true) {
                             if (lastcol!=-1 && ((fieldcards[fromi].color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && fieldcards[fromi].color=='b'))) {
                                    
                                    if (fieldcards[fromi].number+1==fieldcards[lastcol].number) {
                                        console.log(fromi);
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
                            if (ishand==true) {
                            //  console.log(1);
                                if (lastcol!=-1 && ((handcard.color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && handcard.color=='b'))) {
                                    if (handcard.number+1==fieldcards[lastcol].number) {
                                        //console.log(this.i,e.dataTransfer.getData('fromi'));
                                        tmp=handcard;
                                        handcard=undefined;
                                        handcard=undefined
                                        hand.innerHTML='';
                                        fieldcards[this.i]=undefined;
                                        fieldcards[this.i]=tmp;
                                        update();
                                        
                                        handshift();
                                    }
                                }
                                
                            } else {
                                
                                //console.log(fromi,lastcol);
                                if (lastcol!=-1 && ((fieldcards[fromi].color=='r' && fieldcards[lastcol].color=='b') || (fieldcards[lastcol].color=='r' && fieldcards[fromi].color=='b'))) {
                                    
                                    if (fieldcards[fromi].number+1==fieldcards[lastcol].number) {
                                        //console.log(this.i,e.dataTransfer.getData('fromi'));
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
            //if (nextcol!=-1 && fieldcards[nextcol]!=undefined && fieldcards[i].up==true) {
              //  console.log(row,col);
                
            //}
            pz[row]=fieldcards[i];
            
            if (fieldcards[i]!=undefined) {
                if (fieldcards[i].up==false) {
                    tds[i].innerHTML='&#127136;'
                    tds[i].style.color='lightblue';
                } else {
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
                    
                tds[i].innerHTML=fieldcards[i].face+''+suit
                }
            } else {
                tds[i].innerHTML='';
            }
            
            row++;
            if (row>=7) {
                row=0;
                col++;
            }
        }
         
        for (i=0;i<tds.length;i++) {
            nextcol=i+7;
            if (nextcol>tds.length-1) {
                nextcol=-1;
            }
            
            if (nextcol!=-1 && fieldcards[nextcol]==undefined && fieldcards[i]!=undefined) {
                
                tds[i].setAttribute('draggable','true');
                tds[i].addEventListener('dragstart',tds[i].d3=function (e) {
                    e.dataTransfer.setData('fromi',this.i);
                });
            }
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
        hand=document.getElementById('hand');
        deck=document.getElementById('deck');
        handcard=cards.pop();
        hand.i=0
        handcard.up=true;
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
         
        hand.innerHTML=handcard.face+''+suit
        hand.setAttribute('draggable','true');
        hand.addEventListener('dragstart',hand.d3=function (e) {
            e.dataTransfer.setData('fromi',this.i);
            e.dataTransfer.setData('hand',1);
        });
        function handshift() {
            handcard=cards.shift();
            hand.i=0
            handcard.up=true;
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
         
            hand.innerHTML=handcard.face+''+suit
            hand.setAttribute('draggable','true');
            hand.addEventListener('dragstart',hand.d3=function (e) {
                e.dataTransfer.setData('fromi',this.i);
                e.dataTransfer.setData('hand',1);
        });
        }
        deck.addEventListener('click',function () {
            if (handcard!=undefined) {
            cards.unshift(handcard);
            }
            handcard=undefined;
            handcard=cards.pop();
            hand.i=0
            handcard.up=true;
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
         
            hand.innerHTML=handcard.face+''+suit
            hand.setAttribute('draggable','true');
            hand.addEventListener('dragstart',hand.d3=function (e) {
                e.dataTransfer.setData('fromi',this.i);
                e.dataTransfer.setData('hand',1);
            });
            
        });
         
        fourtable=document.getElementById('four');
        ftds=fourtable.getElementsByTagName('td');
        fsuits=['H','D','C','S'];
        for (i=0;i<ftds.length;i++) {
            ftds[i].number=0;
            ftds[i].suit=fsuits[i];
            ftds[i].addEventListener('dragover',tds[i].d1=function (e) {
                e.preventDefault();
                        //console.log(1);
            });
            ftds[i].addEventListener('drop', tds[i].d2=function (e) {
                e.preventDefault();
                ishand=e.dataTransfer.getData('hand')
                fromi=parseInt(e.dataTransfer.getData('fromi'));
                if (ishand==true) {
                    //console.log(1);
                    if (handcard.suit==this.suit) {
                    if (handcard.number==this.number) {
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
                        this.innerHTML=handcard.face+''+suit
                        this.number++;
                        handcard=undefined;
                        hand.innerHTML=''
                        handshift();
                    }
                    }
                } else {
                //console.log(this.i,e.dataTransfer.getData('fromi'));
                if (fieldcards[fromi].suit==this.suit) {
                    if (fieldcards[fromi].number==this.number) {
                        suit=''
                        if (fieldcards[fromi].suit=='S') {
                            suit='&#9824;';
                            hand.style.color='black';
                        }
                        if (fieldcards[fromi].suit=='H') {
                            suit='&#9829;';
                            hand.style.color='#a33';
                            
                        }
                        if (fieldcards[fromi].suit=='C') {
                            suit='&#9827;';
                            hand.style.color='black';
                            
                        }
                        if (fieldcards[fromi].suit=='D') {
                            suit='&#9830;';
                            hand.style.color='#a33';
                            
                        }
                        this.innerHTML=fieldcards[fromi].face+''+suit
                        this.number++;
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
