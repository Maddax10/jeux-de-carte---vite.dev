import '/src/styles/main.scss'
import { Card } from "./card.js"
const myCardsZone = document.querySelector("#myCardsZone");
const cardToFindZone = document.querySelector("#cardToFindZone");
const pointsSpan = document.querySelector("#points");
const skipBtn = document.querySelector("#skip");

let allCards = new Array();
const emptyCard = new Card(0);

//Carte qu'on doit trouver
let currentCard = emptyCard;
let myCards = new Array()
let points = 0;

const getRandom = () => {
  return Math.floor(Math.random() * 10);
}

//———————————————————————————————————————————————————————————
// Events
//———————————————————————————————————————————————————————————


const playTheCard = (ev) => {
  let cardClickedValue = Number(ev.target.getAttribute("value"));
  let currentCardValue = currentCard.getValue();

  if (cardClickedValue === currentCardValue) {
    points++;
  }
  else {
    points--;
  }
  ev.target.remove();
  updatePoints();
  removeCardFromHand(cardClickedValue);
  setCurrentCard();

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
const handleClicks = (ev) => {
  ev.preventDefault();

  if (ev.target.id === "card") playTheCard(ev);
  if (ev.target.id === "skip") skip();
}
myCardsZone.addEventListener("click", handleClicks);
skipBtn.addEventListener("click", handleClicks);
//-----------------------------------------------------------
// Fin Events
//-----------------------------------------------------------

const updatePoints = () => {
  pointsSpan.innerHTML = points;
}

//———————————————————————————————————————————————————————————
// génération des cartes
//———————————————————————————————————————————————————————————

//Génération de toutes les cartes
const generateAllCards = (nbCards) => {
  for (let i = 1; i < nbCards + 1; i++) {
    allCards.push(new Card(i));
  }
}

generateAllCards(10);

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

getFiveCards();
console.log("myCards", myCards);

//-----------------------------------------------------------
//Fin génération
//-----------------------------------------------------------

//———————————————————————————————————————————————————————————
// Manipulation des cards
//———————————————————————————————————————————————————————————

//Trie des cards dans l'ordre
//Pour éviter de voir le tableau trié avant, je fais un slice (car l'affectation est via reference et non par copie)
console.log("Avant le tri : ", myCards.slice());

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
sortCards();

console.log("Après le tri : ", myCards);

//L'ordi sort une carte au hasard parmis les 10
const getRandomCard = () => {
  return allCards[getRandom()];
}

console.log("getRandomCard()", getRandomCard());
//-----------------------------------------------------------
// Fin manipulation
//-----------------------------------------------------------

//———————————————————————————————————————————————————————————
// Ajout des cards pour le front
//———————————————————————————————————————————————————————————
//Ajout des cartes de la main
const showHandCards = () => {
  for (let i = 0; i < myCards.length; i++) {
    myCardsZone.innerHTML += `<div class="card" id="card" value="${myCards[i].getValue()}">${myCards[i].getValue()}</div>`;
  }
}
showHandCards();

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
  if (nbCardPlayed > 9 || myCards.length <= 0) {
    alert("Fini avec " + points + " points");
    return true;
  }

  return false;
}
const resetGame = () => {
  // Réinitialise les variables
  points = 0;
  allCards = [];
  myCards = [];
  myCardsZone.innerHTML = "";
  cardToFindZone.innerHTML = "";
  updatePoints();

  // Regénère toutes les cartes et la main
  generateAllCards(10);
  getFiveCards();
  sortCards();

  // Réaffiche les cartes de la main
  showHandCards();

  // Nouvelle carte à trouver
  setCurrentCard();
}

//Ajout de la 1ère carte à trouver
const setCurrentCard = () => {
  if (checkEndGame()) {
    resetGame();

    return;
  }
  currentCard = getRandomCard();

  //Si la carte trouvée à déja été jouée, alors on reprend une cartes
  while (currentCard.getPlayed()) {
    currentCard = getRandomCard();
  }

  currentCard.setPlayedToTrue();

  cardToFindZone.innerHTML = `<div class="card" id="card" value="${currentCard.getValue()}">${currentCard.getValue()}</div>`;
}
setCurrentCard();

//-----------------------------------------------------------
// Fin Ajout des cards pour le front
//-----------------------------------------------------------