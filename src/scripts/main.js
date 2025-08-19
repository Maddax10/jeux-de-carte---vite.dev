/* 

- gérer le fait qu'il n'y ai que 5 niveaux maximum et que le jeu doit s'arrêter au bout des 5 niveaux.

*/


import '/src/styles/main.scss'
import { Card } from "./card.js"

const myCardsZone = document.querySelector("#myCardsZone");
const cardToFindZone = document.querySelector("#cardToFindZone");
const pointsSpan = document.querySelector("#points");
const skipBtn = document.querySelector("#skipBtn");
const time = document.querySelector("#time");
const levels = document.querySelector("#levels");

let allCards = new Array();
const emptyCard = new Card(0);

//Carte qu'on doit trouver
let currentCard = emptyCard;
let myCards = new Array()
let points = 0;
let secondsByLvl = [100,80,60,40,20];
let currentLvl = 0;
const MaxLvl = 5;
let timerId = 0;

//———————————————————————————————————————————————————————————
// Gestion du timer et des niveaux
//———————————————————————————————————————————————————————————
const timer = () => {
  if(timerId > 0) clearInterval(timerId);
  timerId = 
  setInterval(() => {
    secondsByLvl[currentLvl]--;
    let secondsTmp = secondsByLvl[currentLvl] % 60;
    console.log(secondsTmp);
    let minutesTmp = (secondsByLvl[currentLvl] - secondsTmp) / 60;
    time.innerHTML = `${minutesTmp}:${secondsTmp}`;
    // Pour arrêter le timer quand ça arrive à 0 seconde :
    if (secondsByLvl[currentLvl] <= 0) {
      clearInterval(timerId)
      checkEndGame();
    };
  }, 1000);
}

const resetLvl = () => {
  currentLvl = 0;
}

const addLvl = () => {
  currentLvl++;
}

const updateLvl = () => {
  levels.innerHTML = currentLvl + 1;
}

//-----------------------------------------------------------
// Fin Gestion du timer
//-----------------------------------------------------------

//———————————————————————————————————————————————————————————
// Gestion du drop
//———————————————————————————————————————————————————————————
//Event du drop des éléments dans la génération des cartes

const dropZone = document.querySelector("#emptyCardDropZone");

let dragged = null;

dropZone.addEventListener('dragover', e => {
  e.preventDefault(); // autorise le drop
  e.target.classList.add('active');
});

dropZone.addEventListener('dragleave', e => {
  e.preventDefault(); // autorise le drop
  e.target.classList.remove('active');
});

dropZone.addEventListener('drop', e => {
  e.preventDefault();

  // Récupère la valeur de la carte déposée
  let cardClickedValue = Number(dragged.textContent);
  let currentCardValue = currentCard.getValue();

  if(currentLvl = 0){
    sortCards();
  }

  if (cardClickedValue === currentCardValue) {
    points++;
  } else {
    points--;
    // Optionnel : effet visuel d'erreur
  }
  // Marque la carte comme jouée
  dragged.remove();
  removeCardFromHand(cardClickedValue);
  updatePoints();
  setCurrentCard();
  // e.target.remove();
});

//-----------------------------------------------------------
//Fin gestion du drop
//-----------------------------------------------------------

//———————————————————————————————————————————————————————————
// génération des cartes
//———————————————————————————————————————————————————————————

//Génération de toutes les cartes
const generateAllCards = (nbCards) => {
  for (let i = 1; i < nbCards + 1; i++) {
    allCards.push(new Card(i));
  }
}

//Attribution des cartes dans notre main
const getFiveCards = () => {
  let rnd;
  let usedRnd = new Array();
  let i = 0;
  while (i < 5) {
    rnd = getRandom();
    if (!usedRnd.includes(rnd)) {
      myCards.push(allCards[rnd]);
      usedRnd.push(rnd);
      i++;
    }
  }
}

//-----------------------------------------------------------
//Fin génération
//-----------------------------------------------------------

//———————————————————————————————————————————————————————————
// Manipulation des cards
//———————————————————————————————————————————————————————————

//Trie des cards de la main dans l'ordre
const sortCards = () => {
  let tmp;
  for (let i = 0; i < myCards.length - 1; i++) {
    for (let j = i + 1; j < myCards.length; j++) {
      if (myCards[i].getValue() > myCards[j].getValue()) {
        tmp = myCards[i];
        myCards[i] = myCards[j];
        myCards[j] = tmp;
      }
    }
  }
}

//L'ordi sort une carte au hasard parmis les 10
const getRandomCard = () => {
  return allCards[getRandom()];
}

const removeCardFromHand = (cardClickedValue) => {
  const index = myCards.findIndex(card => card.getValue() === cardClickedValue);
  if (index !== -1) {
    myCards.splice(index, 1);
  }
}
//Quand on skip, le pc retire une nouvelle carte
const skip = () => {
  setCurrentCard();
  console.log("skip");
}
//-----------------------------------------------------------
// Fin manipulation
//-----------------------------------------------------------

//———————————————————————————————————————————————————————————
// Ajout des cards pour le front
//———————————————————————————————————————————————————————————
//Ajout des cartes de la main

const showHandCards = () => {
  for (let i = 0; i < myCards.length; i++) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.id = "card";
    cardDiv.draggable = true;
    cardDiv.textContent = myCards[i].getValue();

    // Ajout des listeners drag & drop ici
    cardDiv.addEventListener('dragstart', e => {
      dragged = cardDiv;
      e.target.classList.add('active');
      e.dataTransfer.effectAllowed = "move";
    });

    myCardsZone.appendChild(cardDiv);
  }
}

const checkEndGame = () => {
  //Si toutes les cartes de allCards sont played, alors on arrête le jeu et on réinitialise tout
  let nbCardPlayed = 0;

  allCards.forEach(card => {
    if (card.getPlayed())
      nbCardPlayed++;
  });

  // Vérification si l'ordi a joué toutes les cartes
  // ou
  // Vérification si on a joué toutes nos cartes
  if (nbCardPlayed > 9 || myCards.length <= 0 || secondsByLvl[currentLvl] <= 0) {
    resetGame();
    return true;
  }
  return false;
}
const resetGame = () => {
  // Réinitialise les variables
  secondsByLvl = [100,80,60,40,20];
  allCards = [];
  myCards = [];
  myCardsZone.innerHTML = "";
  cardToFindZone.innerHTML = "";
  updatePoints();

  // Regénère toutes les cartes et la main
  generateAllCards(10);
  getFiveCards();

  // Réaffiche les cartes de la main
  showHandCards();

  // Nouvelle carte à trouver
  setCurrentCard();
  timer();
  addLvl();
  updateLvl();
}

//Ajout de la 1ère carte à trouver
const setCurrentCard = () => {
  if (checkEndGame()) {
    return;
  }

  currentCard = getRandomCard();

  //Si la carte trouvée à déja été jouée, alors on reprend une cartes
  while (currentCard.getPlayed()) {
    currentCard = getRandomCard();
  }

  currentCard.setPlayedToTrue();

  cardToFindZone.innerHTML = `<div class="card" id="card">${currentCard.getValue()}</div>`;
}

//-----------------------------------------------------------
// Fin Ajout des cards pour le front
//-----------------------------------------------------------

const getRandom = () => {
  return Math.floor(Math.random() * 10);
}

const updatePoints = () => {
  pointsSpan.innerHTML = points;
}

//———————————————————————————————————————————————————————————
// Events
//———————————————————————————————————————————————————————————

const handleClicks = (ev) => {
  ev.preventDefault();

  if (ev.target.id === "skipBtn") skip();
}
skipBtn.addEventListener("click", handleClicks);

//-----------------------------------------------------------
// Fin Events
//-----------------------------------------------------------

generateAllCards(10);
getFiveCards();

console.log("myCards", myCards);

sortCards();

console.log("Après le tri : ", myCards);

showHandCards();
setCurrentCard();
timer();
time.innerHTML = "0:00";
updateLvl();