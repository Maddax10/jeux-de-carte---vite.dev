import '/src/styles/main.scss'
import { Card } from "./card.js"
let allCards = new Array();
const emptyCard =  new Card(0);

let myCurrentCard = emptyCard;

//___________________________________________________________
//Générer toutes les cartes possibles
//___________________________________________________________

const generateAllCards = (nbCards) => {
  for (let i = 1; i < nbCards+1; i++) {
    allCards.push(new Card(i));
  }
}
generateAllCards(10);
//-----------------
//Fin génération de toutes les cartes