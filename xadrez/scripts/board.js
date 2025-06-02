//-------------CUIDA DOS BOARDS-------------------------

const inicialBoard = [
    ["R","N","B","Q","K","B","N","R"],//8
    ["P","P","P","P","P","P","P","P"],//7
    ["","","","","","","",""],//6
    ["","","","","","","",""],//5
    ["","","","","","","",""],//4
    ["","","","","","","",""],//3
    ["p","p","p","p","p","p","p","p"],//2
    ["r","n","b","q","k","b","n","r"]//1
  ]; 

let turn = 'white';

const history = [];



let previousBoard = inicialBoard.map(row => [...row]);
let actualBoard = inicialBoard.map(row => [...row]);
let nextBoard = [];
boardHistory();

document.querySelector('.board').addEventListener('click', (event) => {
    const piece = event.target.dataset.piece;
    if(piece !== ''){
      const squareDiv = event.target.closest('.square');
      const square = squareDiv.className.split(' ')[2]; //s-34
      const isWhitePiece = piece === piece.toLowerCase();//jeito mais eficaz de ver se eh branca ou preta, melhor q o anterior com if/else
      if((turn === 'white' && !isWhitePiece) || (turn === 'black' && isWhitePiece)) {
        return;
      }
      nextBoard = move(piece,square,actualBoard)
      possibleChange(piece,square);
    }
  });

function possibleChange(piece,square) {
  const moves = [];
  

  for (let i = 0; i < nextBoard.length; i++) {
    for (let j = 0; j < nextBoard[i].length; j++) {
      if(nextBoard[i][j] !== actualBoard[i][j]) {
       moves.push([8-i,j+1])
      }
    }
  }

  //tiro a peça do lugar q ela esta originalmente
  const squarePiece = square.split('-')[1];
  let squareLine = Number(squarePiece.split('')[0]);
  let squareColumn = Number(squarePiece.split('')[1]);

 
  
  nextBoard[8-squareLine][squareColumn-1] = '';

  previousBoard = actualBoard.map(row => [...row]);

  moves.forEach(([l,c]) => {
    const possibleSquare = `.s-${l}${c}`;
    document.querySelector(possibleSquare).classList.add('highlight');
    
  });

  moves.forEach(([l,c]) => {
    const possibleSquare = `.s-${l}${c}`;
    const targetSquare = document.querySelector(possibleSquare);

    
    targetSquare.addEventListener('click', (event) => {
      event.stopPropagation();
      
       moves.forEach(([linha,coluna]) => {
        nextBoard[8-linha][coluna-1] = actualBoard[8-linha][coluna-1];

      });


      nextBoard[8-l][c-1] = piece;

      actualBoard = nextBoard.map((row) => [...row]);
      boardHistory();
      boardGenerate(actualBoard);


      moves.forEach(([linha,coluna]) => {
        const possibleSquare = `.s-${linha}${coluna}`;
        document.querySelector(possibleSquare).classList.remove('highlight');
      });
      clearMoveListeners(moves);
      turn = turn === 'white' ? 'black' : 'white';
      document.getElementById('turn').textContent = turn ==='white' ? 'Brancas jogam!' : 'Pretas jogam'
    },{once : true})
   
  })

  
  
}



boardGenerate(actualBoard);







function boardHistory() {
  
  const copy = actualBoard.map(row => [...row]);
  history.push(copy);

}


function clearMoveListeners(moves) {
  moves.forEach(([l,c]) => {
    const square = document.querySelector(`.s-${l}${c}`);
    const newSquare = square.cloneNode(true);
    square.parentNode.replaceChild(newSquare,square);
  })
}









