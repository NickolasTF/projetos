//-------------CUIDA DOS BOARDS-------------------------

const board = [
    ["R","N","B","Q","K","B","N","R"],//8
    ["P","P","P","P","P","P","P","P"],//7
    ["","","","","","","",""],//6
    ["","","","","","","",""],//5
    ["","","","","","","",""],//4
    ["","","","","","","",""],//3
    ["p","p","p","p","p","p","p","p"],//2
    ["r","n","b","q","k","b","n","r"]//1
  ]; 

// q q eu tenho eu passo pra move() a peça, o square e o board e consigo receber os possiveis movimentos dessa peça
//apos cada mudança no tabuleiro chamar boardHistory() e no começo tbm, quando criadas as variaveis previousBoard,actualBoard,nextBoard
const history = [];



let previousBoard = board.map(row => [...row]);
let actualBoard = board.map(row => [...row]);
let nextBoard = [];
boardHistory();

document.querySelector('.board').addEventListener('click', (event) => {
    const piece = event.target.innerHTML;
    if(piece !== ''){
      const square = event.target.className.split(' ')[2]; //s-34
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

  moves.forEach(([l,c]) => {
    const possibleSquare = `.s-${l}${c}`;
    document.querySelector(possibleSquare).classList.add('highlight');
    
    document.querySelector(possibleSquare).addEventListener('click', () => {

      moves.forEach(([linha,coluna]) => {
        /* 
        OPERADOR TERNARIO
        if(l === linha && c === coluna ) {
          nextBoard[8-linha][coluna-1] = `${piece}`;
        }else {
          nextBoard[8-linha][coluna-1] = '';
        } 
        */
        nextBoard[8-linha][coluna-1] = (l === linha && c === coluna) ? `${piece}` : '';
      });
      previousBoard = actualBoard.map(row => [...row]);
      actualBoard = nextBoard.map(row => [...row]);
      boardHistory();
      
      
      //limpo o q eu coloquei, ou seja, tiro os highlight q adicionei nesse caso especifico
      moves.forEach(([l,c]) => {
        const possibleSquare = `.s-${l}${c}`;
        document.querySelector(possibleSquare).classList.remove('highlight')
        
          
      });

    }, {once: true});
  });
}







boardGenerate(actualBoard);







function boardHistory() {
  
  const copy = actualBoard.map(row => [...row]);
  history.push(copy);

}












