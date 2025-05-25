const whitePieces = 'rnbqkp'
const blackPieces = 'RNBQKP'
knightMove();
function move(/* piece, square */) {
  
  /* aqui o codigo q me entrega o tipo (black or white), a casa dela e a peça
  ------------------DESCOMENTAR OS PARAMETROS DA FUNÇÃO TB------------------------
    // piece = 'N' \\\ square(chega s-44)= 44 \\\ type = 'black'(ou'white')
  
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
let square = 44;
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



function knightMove(/* square,type */) {
//-------------------------DESCOMENTAR OS PARAMETROS----------------------------------
let square = '81';
let type = 'black';


/* 

dps tenho q ver se vai cair em uma casa com uma peça aliada se sim, n pode, se n substitui a peça inimiga por essa 

*/
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
  
  if(linha > 8 || linha < 1 || coluna > 8 || coluna < 1)  {
    moves.splice(i,1)
  }
  
}

//aqui a variavel moves, contem todas as possiveis casas q essa peça pode ir a partir da q ele estava, basta verificar se tem uma aliada la ou uma inimiga e comer a inimiga ou retirar das possibilidades a aliada










}



function bishopMove(square,type) {

}



function queenMove(square,type) {

}



function kingMove(square,type) {

}



function pawnMove(square,type) {

}


