export class Card {
  constructor(value){
    this.value = value;
    this.played = false;
  }
  getValue = () => {
    return this.value;
  }
  setPlayedToTrue = () => {
    this.played = true;
  }
}