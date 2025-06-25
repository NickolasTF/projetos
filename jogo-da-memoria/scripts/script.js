const front = 'card-front';
const back = 'card-back';


startGame();

function startGame() {
  let cards = game.createCards(game.animals);
  shuffleCards(cards);
  initializeCards(cards);
}


function shuffleCards(cards) {
  let currentIndex = cards.length;
  let randomIndex = 0;

  while(currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;
    
    [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];

  }

}

function initializeCards(cards) {
  let board = document.getElementById('board');
  board.innerHTML = '';
  cards.forEach(card => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add('card');
    cardElement.dataset.icon = card.icon;
    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);
    
  });

}

function createCardContent(card, cardElement) {

  createCardFace(front, card, cardElement);
  createCardFace(back, card, cardElement);



}

function createCardFace(face, card, cardElement) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);
  if(face === front) {
    let iconElement = document.createElement('img');
    iconElement.classList.add('icon');
    iconElement.src = `./images/${card.icon}.jpg`;
    cardElementFace.appendChild(iconElement)
  }else {
    cardElementFace.innerHTML = '?';
  }
  cardElement.appendChild(cardElementFace);
}

function flipCard() {
  if(game.setCard(this.id)) {

    this.classList.add('flip');
    if(game.secondCard) {
      if(game.checkMatch()) {
        game.clearCards();
        if(game.checkGameOver()){
          let gameOverLayer = document.getElementById('gameOver');
          gameOverLayer.style.display = 'flex';
        };
      }else {
        setTimeout(() => {
        let firstCardView = document.getElementById(game.firstCard.id);
        let secondCardView = document.getElementById(game.secondCard.id);

        firstCardView.classList.remove('flip');
        secondCardView.classList.remove('flip');
        game.unflipCards();
        }, 1000);
      };
    }

  }
}


function restart() {
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById('gameOver');
  gameOverLayer.style.display = 'none';
}



