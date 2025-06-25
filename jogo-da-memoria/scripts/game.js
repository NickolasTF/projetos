let game = {
  animals: ['cachorro-1', 'cachorro-2', 'esquilo-1', 'esquilo-2', 'gato-1', 'gato-2', 'passaro-1', 'passaro-2', 'raposa-1', 'raposa-2'],
  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function(id) {

    let card = this.cards.filter(card => card.id === id)[0];
    console.log(card)

    if(card.flipped || this.lockMode) {
      return false;
    }

    if(!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }

  },

  checkGameOver() {

    return this.cards.filter(card => !card.flipped).length === 0;


  }
  ,

  checkMatch: function() {
    if(!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },


  unflipCards: function() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },








  createCards: function(animals) {

  this.cards = [];

  for(let animal of animals) {
    /* this.cards.push((this.createPair(animal))); */
    this.cards.push(...this.createPair(animal));

  }

  return this.cards.flatMap(pair => pair);
},


createPair: function(animal) {
  return [{
    id: this.createId(animal),
    icon: animal,
    flipped: false
  }, {
    id: this.createId(animal),
    icon: animal,
    flipped: false
  }]
},

createId: function(animal) {
  return animal + parseInt(Math.random()*1000);
}



};




