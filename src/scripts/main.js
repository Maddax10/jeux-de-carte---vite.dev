import '/src/styles/main.scss'
import { Card } from "./card.js"
let allCards = new Array();
const emptyCard = new Card(0);

//Carte qu'on doit trouver
let CurrentCard = emptyCard;
let myCards = new Array()

const getRandom = () => {
  return Math.floor(Math.random() * 10);
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

let tmp;
for(let i = 0; i < myCards.length-1; i++){
  for(let j = i + 1; j < myCards.length; j++){
    if(myCards[i].getValue() > myCards[j].getValue()){
      tmp = myCards[i];
      myCards[i] = myCards[j];
      myCards[j] = tmp;
    }
  }
}

console.log("Après le tri : ", myCards);

//L'ordi sort une carte au hasard parmis les 10
const getRandomCard = () => {
  return allCards[getRandom()];
}

console.log("getRandomCard()",getRandomCard());
//-----------------------------------------------------------
//Fin manipulation
//-----------------------------------------------------------

