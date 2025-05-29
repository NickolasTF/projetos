const whitePieces = 'rnbqkp'
const blackPieces = 'RNBQKP'
move();

function move(/* piece,square,board */) {
  const pieceFunction = {
    r: rookMove,
    n: knightMove,
    b: bishopMove,
    q: queenMove,
    k: kingMove,
    p: pawnMove
  }
  const board = [
    ['r', '', '', '', 'k', '', '', 'n'],
    ['', '', '', '', '', 'P', '', ''],
    ['B', '', 'Q', '', '', '', 'n', ''],
    ['', 'p', '', 'K', '', '', '', 'p'],
    ['P', '', '', '', '', '', '', ''],
    ['', '', 'N', '', '', 'B', '', 'R'],
    ['', 'P', '', '', 'P', '', '', ''],
    ['N', '', '', '', 'K', '', '', 'R']
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

  const piece = 'p';
  let square = '52';
  let type = 'white';
  const pieceMove = pieceFunction[piece.toLowerCase()];
  const validMoves = pieceMove(square,type,board);//recebendo os movimentos validos da função peçaMove()

  const possibleMoves = board.map(row => [...row]);//criando uma copia de board

  validMoves.forEach(([l,c]) => possibleMoves[8-l][c-1] = piece);

  printBoard(possibleMoves)


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

function getAllyPieces(type) {
  if(type === 'black') {
    return 'RNBQKP';
  }else {
    return 'rnbqkp';
  }
}

function linearMoves(square, dx, dy, allyPieces, board) {
  
  let squareLine = Number(square.split('')[0]);
  let squareColumn = Number(square.split('')[1]);
  const allPieces = 'RNBQKPrnbqkp';
  const moves = [];

  squareLine = squareLine + dx;
  squareColumn = squareColumn + dy;

  while (squareLine > 0 && squareLine < 9 && squareColumn > 0  && squareColumn < 9) {
    const squarePiece = board[8 - squareLine][squareColumn - 1]

    if(squarePiece !== '' && allPieces.includes(squarePiece)) { 
          if (allyPieces.includes(squarePiece)) {
            break
          }else {
            moves.push([squareLine, squareColumn]);
            break
          }
        }
    moves.push([squareLine, squareColumn]);

    squareLine += dx;
    squareColumn += dy;
    
  }

  return moves

}

function rookMove(square,type,board) {

  const allyPieces = getAllyPieces(type);
  
  const moves = [];

  linearMoves(square,+1,0,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,-1,0,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,0,+1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,0,-1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));


  return moves
  /*
  function getRookMoves(squareLine,squareColumn) {
    ------------------GENERICO DE CALCULAR OS MOVIMENTOS RETILINEOS-----------------------------
    
   const moves = [];

   //pra cima //i = 1 2 3 4
    for (let i = 1; i < 9 - squareLine; i++) {
      const l = squareLine + i;
      const c = squareColumn;
      const squarePiece = board[8-l][c-1];
      if(squarePiece !== '' && allPieces.includes(squarePiece)) { 
        if (allyPieces.includes(squarePiece)) {
          break
        }else {
          moves.push([l, c]);
          break
        }
      }
      moves.push([l, c]);
    }

   //pra baixo
   for (let i = squareLine - 1; i > 0; i--) {

      moves.push([i, squareColumn]);

    }
   //pra esquerda
    for (let i = squareColumn - 1; i > 0 ; i--) {

      moves.push([squareLine, i]);

    }
   //pra direita
    for (let i = 1; i < 9 - squareColumn; i++) {

      moves.push([squareLine,squareColumn + i]);

    }
    
  }
  */

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
  const allyPieces = getAllyPieces(type);

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
    if (l < 1 || l > 8 || c < 1 || c > 8){
      return false
    } 

    const squarePiece = board[8-l][c-1];
    return l > 0 && l < 9 && c > 0 && c < 9 && (squarePiece === '' || !allyPieces.includes(squarePiece));

  }

  return  getHorseMoves(squareLine,squareColumn).filter(([l,c]) => boardFilter(l,c));

}

function bishopMove(square,type,board) {

  const allyPieces = getAllyPieces(type);
  const moves = [];

  linearMoves(square,+1,+1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,-1,+1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,-1,-1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,+1,-1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));


  return moves
}

function queenMove(square,type,board) {
  const allyPieces = getAllyPieces(type);
  const moves = [];

  linearMoves(square,+1,0,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,+1,+1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,0,+1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,-1,+1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,-1,0,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,-1,-1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,0,-1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  linearMoves(square,+1,-1,allyPieces,board).forEach(([l,c]) => moves.push([l,c]));
  
  
  return moves
}

function kingMove(square,type,board) {
  
  let squareLine = Number(square.split('')[0]);
  let squareColumn = Number(square.split('')[1]);
  const allyPieces = getAllyPieces(type);
  const moves = [];
  



  moves.push([squareLine + 1 , squareColumn + 1]);
  moves.push([squareLine + 1 , squareColumn]);
  moves.push([squareLine + 1 , squareColumn - 1]);
  moves.push([squareLine, squareColumn - 1]);
  moves.push([squareLine - 1 , squareColumn - 1]);
  moves.push([squareLine - 1 , squareColumn]);
  moves.push([squareLine - 1 , squareColumn + 1]);
  moves.push([squareLine, squareColumn + 1]);
  


  function boardFilter(l,c) {
    if (l < 1 || l > 8 || c < 1 || c > 8){
      return false
    } 

    const squarePiece = board[8-l][c-1];
    return l > 0 && l < 9 && c > 0 && c < 9 && (squarePiece === '' || !allyPieces.includes(squarePiece));

  }
  return moves.filter(([l,c]) => boardFilter(l,c))

}

function pawnMove(square,type,board) {

  let squareLine = Number(square.split('')[0]);
  let squareColumn = Number(square.split('')[1]);
  const allyPieces = getAllyPieces(type);

  function boardFilter(l,c) {
    if (l < 1 || l > 8 || c < 1 || c > 8){
      return false;
    }

    const squarePiece = board[8-l][c-1];
    return l > 0 && l < 9 && c > 0 && c < 9 && (squarePiece === '');

  }


  function captureFilter(l,c) {
    if (l < 1 || l > 8 || c < 1 || c > 8){
      return false;
    }
    const squarePiece = board[8-l][c-1];
    return l > 0 && l < 9 && c > 0 && c < 9 && (!allyPieces.includes(squarePiece));
  }


  function getPawnMove(type) {
    const moves = [];
    let normalMoves = [];
    let captureMoves = [];

    if(type === 'white') {

      normalMoves.push([squareLine + 1, squareColumn]);    

      if(squareLine === 2){
        normalMoves.push([squareLine + 2, squareColumn]);
      }

      normalMoves = normalMoves.filter(([l,c]) => boardFilter(l,c))

      


      captureMoves.push([squareLine + 1, squareColumn + 1]);
      captureMoves.push([squareLine + 1, squareColumn - 1]);
      captureMoves = captureMoves.filter(([l,c]) => captureFilter(l,c));


    }else if(type === 'black') {
      
      normalMoves.push([squareLine -1, squareColumn]);  

      if(squareLine === 7){
        normalMoves.push([squareLine - 2, squareColumn]);
      }

      normalMoves = normalMoves.filter(([l,c]) => boardFilter(l,c))

      


      captureMoves.push([squareLine -1, squareColumn - 1]);
      captureMoves.push([squareLine - 1, squareColumn + 1]);
      captureMoves = captureMoves.filter(([l,c]) => captureFilter(l,c));
    }

    moves.push(...normalMoves,...captureMoves);

    return moves;
  }
  
  return getPawnMove(type);
  

}

function resetBoard(board,pawns) {
  pawns = {
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,
    p7: 0,
    p8: 0,
    P1: 0,
    P2: 0,
    P3: 0,
    P4: 0,
    P5: 0,
    P6: 0,
    P7: 0,
    P8: 0,
  };

  board = [
    ["R","N","B","Q","K","B","N","R"],//8
    ["P","P","P","P","P","P","P","P"],//7
    ["","","","","","","",""],//6
    ["","","","","","","",""],//5
    ["","","","","","","",""],//4
    ["","","","","","","",""],//3
    ["p","p","p","p","p","p","p","p"],//2
    ["r","n","b","q","k","b","n","r"]//1
  ];

return board,pawns;
}
