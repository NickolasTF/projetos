const whitePieces = 'rnbqkp'
const blackPieces = 'RNBQKP'
move();

function move(/* piece, square, board */) {
const pieceFunction = {
  r: rookMove,
  n: knightMove,
  b: bishopMove,
  q: queenMove,
  k: kingMove,
  p: pawnMove
}
const board = [
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','N','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','','']
];

/* aqui abaixo o codigo q me entrega o tipo (black or white), a casa dela e a peça
------------------DESCOMENTAR OS PARAMETROS DA FUNÇÃO TB------------------------
  // piece = 'N' \\\ square(chega s-44)= '44' \\\ type = 'black'(ou'white')

let type = '';
if(whitePieces.includes(piece)) {
  type = 'white';
} else if(blackPieces.includes(piece)) {
  type = 'black';
}

square = square.split('-')[1]

*/

const piece = 'N';
let square = '44';
let type = 'black';
const pieceMove = pieceFunction[piece.toLowerCase()]
const validMoves = pieceMove(square,type,board)

const possibleMoves = board.map(row => [...row]);//criando uma copia de board

validMoves.forEach(([l,c]) => possibleMoves[8-l][c-1] = piece);






//printBoard(possibleMoves)

function printBoard(board) {
  for (let i = 0; i < 8; i++) {
    const linha = 8 - i; // linha real (de 8 a 1)
    const row = board[i].map(cell => cell || '..').join(' ');
    console.log(linha + ' ' + row);
  }
  console.log('  a  b  c  d  e  f  g  h');
}



/*aqui em validMoves eu tenho um vetor do tipo [ [ 6, 5 ], [ 5, 6 ], [ 3, 6 ], [ 2, 5 ], [ 3, 2 ] ] onde o movimento eh da peça 'N' no 44
[ 
  ['81','82','83','84','85','86','87','88'],
  ['71','72','73','74','75','76','77','78'],
  ['61','62','N','64','n','66','67','68'],
  ['51','K','53','54','55','b','57','58'],
  ['41','42','43','N','45','46','47','48'],
  ['31','32','33','34','35','a','37','38'],
  ['21','22','B','24','b','26','27','28'],
  ['11','12','13','14','15','16','17','18']
];

PRA TRANSFORMAR ISSO NAS CLASSES DAS DIVS 
usando for
const availableSquares = [];
for (let i = 0; i < moves.length; i++) {
  availableSquares.push(`s-${moves[i][0]}${moves[i][1]}`);
  
} const availableSquares = [];
for (let i = 0; i < moves.length; i++) {
  availableSquares.push(`s-${moves[i][0]}${moves[i][1]}`);
  
} 
usando map
validMoves = validMoves.map(([linha,coluna]) => [`s-${linha}${coluna}`]);

validMoves = [
  [ 's-65' ],
  [ 's-56' ],
  [ 's-36' ],
  [ 's-25' ],
  [ 's-32' ]
]
*/



















//on click() = "move('N', `${qual quadrado ela esta}`)" daqui eu verifico q q eu posso fazer com essa peça, (q cor ela eh) o q vou passar pra a função peçaMove() e (a partir desse quadrado pra onde ela pode ir)retorno da função peçaMove()


/*

eu associo cada peça a um par da matriz ixj board
on click() eu passo a string associada como parametro pra k e daqui eu chamo a função correspondente ao movimento dessa peça

*/

//e ai na função peçaMove eu retorno alguma coisa e aqui eu gero o HTML com o innnerHTML(da div pra qual a peça vai) = <img da peça> ou melhor posso fazer o click dar um highlight nas possiveis casas de movimentação, caso clique em alguma delas a peça vai pra la 






}



function rookMove(square,type) {

}



function knightMove(square,type,board) {
/* 
let allyPieces;
let enemyPieces;
const moves = [];
const squareLine = Number(square.split('')[0])
const squareColumn = Number(square.split('')[1])

moves.push([squareLine+2,squareColumn-1]);
moves.push([squareLine+2,squareColumn+1]);

moves.push([squareLine+1,squareColumn+2]);
moves.push([squareLine-1,squareColumn+2]);

moves.push([squareLine-2,squareColumn+1]);
moves.push([squareLine-2,squareColumn-1]);

moves.push([squareLine-1,squareColumn-2]);
moves.push([squareLine+1,squareColumn-2]);

for(let i = moves.length-1; i >= 0; i--) {
  const [linha,coluna] = moves[i]
  if(linha > 8 || linha < 1 || coluna > 8 || coluna < 1) {
    moves.splice(i,1)
  }
} 

if(type === 'black') {
  allyPieces = 'RNBQKP'
  enemyPieces = 'rnbqkp'
}else if(type === 'white') {
  allyPieces = 'rnbqkp'
  enemyPieces = 'RNBQKP'
}

for (let i = moves.length-1; i >= 0 ; i--) {
  const [linha,coluna] = moves[i];

  if(allyPieces.includes(board[8-linha][coluna-1])) {
    moves.splice(i,1)
  } 
}
*/
//-------------------VOU REESCREVER ESSE CODIGO USANDO FUNÇÕES---------------------
const squareLine = Number(square.split('')[0]);
const squareColumn = Number(square.split('')[1]);
let allyPieces;

if(type === 'black') {
  allyPieces = 'RNBQKP'
}else {
  allyPieces = 'rnbqkp'
}

function getHorseMoves(squareLine,squareColumn) {
  return [
    [squareLine + 2, squareColumn - 1],
    [squareLine + 2, squareColumn + 1],

    [squareLine + 1, squareColumn + 2],
    [squareLine - 1, squareColumn + 2],

    [squareLine - 2, squareColumn + 1],
    [squareLine - 2, squareColumn - 1],

    [squareLine - 1, squareColumn - 2],
    [squareLine + 1, squareColumn - 2],
  ];
}

function boardFilter(l,c) {
  const squarePiece = board[8-l][c-1];
  return l > 0 && l < 9 && c > 0 && c < 9 && (squarePiece === '' || !allyPieces.includes(squarePiece));

}

return  getHorseMoves(squareLine,squareColumn).filter(([l,c]) => boardFilter(l,c));




}



function bishopMove(square,type) {

}



function queenMove(square,type) {

}



function kingMove(square,type) {

}



function pawnMove(square,type) {

}


