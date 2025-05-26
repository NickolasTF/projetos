const whitePieces = 'rnbqkp'
const blackPieces = 'RNBQKP'
knightMove();
function move(/* piece, square */) {
  
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

const piece = 'N'; // isso aqui eu uso pra chamar a função correspondente a peça
// os dois abaixo passo como paramentros
let square = '44';
let type = 'black';



//on click() = "move('N', `${qual quadrado ela esta}`)" daqui eu verifico q q eu posso fazer com essa peça, (q cor ela eh) o q vou passar pra a função peçaMove() e (a partir desse quadrado pra onde ela pode ir)retorno da função peçaMove()

// funcão | if else -> para verificar se eh branca ou preta e qual tipo da peça daqui eu passo pra função peçaMove() correspondente


/*

eu associo cada peça a um par da matriz ixj board
on click() eu passo a string associada como parametro pra k e daqui eu chamo a função correspondente ao movimento dessa peça

*/

//e ai na função peçaMove eu retorno alguma coisa e aqui eu gero o HTML com o innnerHTML(da div pra qual a peça vai) = <img da peça> ou melhor posso fazer o click dar um highlight nas possiveis casas de movimentação, caso clique em alguma delas a peça vai pra la 

}



function rookMove(square,type) {

}



function knightMove(/* square,type,board */) {
//-----------------------------------DESCOMENTAR OS PARAMETROS--------------------------
const square = '44';
const type = 'black';
const board2 = [
  ['81','82','83','84','85','86','87','88'],
  ['71','72','73','74','75','76','77','78'],
  ['61','62','q','64','K','66','67','68'],
  ['51','p','53','54','55','56','57','58'],
  ['41','42','43','N','45','46','47','48'],
  ['31','P','33','34','35','K','37','38'],
  ['21','22','N','24','n','26','27','28'],
  ['11','12','13','14','15','16','17','18']
];


/* 
let allyPieces;
let enemyPieces
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

  if(allyPieces.includes(board2[8-linha][coluna-1])) {
    moves.splice(i,1)
  } 
}

*/
//-------------------VOU REESCREVER ESSE CODIGO USANDO FUNÇÕES---------------------













/*
----------CODIGO PRA TRANSFORMAR O VETOR DE MOVES EM UM VETOR COM AS CLASSES DAS DIVS Q POSSO IR-----------------
const availableSquares = [];
for (let i = 0; i < moves.length; i++) {
  availableSquares.push(`s-${moves[i][0]}${moves[i][1]}`);
  
} 
const availableSquares = moves.map(([linha,coluna]) => [`s-${linha}${coluna}`]);
*/
/*
availableSquares = [
  [ 's-63' ],
  [ 's-65' ],
  [ 's-56' ],
  [ 's-36' ],
  [ 's-25' ],
  [ 's-23' ],
  [ 's-32' ],
  [ 's-52' ]
]

-------------------esse vetor availableSquares tem q vir dps do board ou junto sei la, mas n agr------------
 verificar quais casas dentre as availables tem peças aliadas e retira-las
*/


}



function bishopMove(square,type) {

}



function queenMove(square,type) {

}



function kingMove(square,type) {

}



function pawnMove(square,type) {

}


