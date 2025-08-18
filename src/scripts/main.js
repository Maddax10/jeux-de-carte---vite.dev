import '/src/styles/main.scss'
import { Card } from "./card.js"
let allCards = new Array();
const emptyCard = new Card(0);

//Carte qu'on doit trouver
let CurrentCard = emptyCard;
let myCards = new Array()

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
    rnd = Math.floor(Math.random() * 10);
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


//-----------------------------------------------------------
//Fin manipulation
//-----------------------------------------------------------