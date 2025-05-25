

// primeiro eu faço uma matriz com todas as peças, assim eu associo essa matriz com o tabuleiro(square-ij) dps faço o JS pra cada movimento de peça, vendo onde ela ta e onde ela pode ir dps eh so ver se ja tem uma peça la e fazer a relação

const columns = 'abcdefgh';

const board1 = [
  ['a8','b8','c8','d8','e8','f8','g8','h8'],
  ['a7','b7','c7','d7','e7','f7','g7','h7'],
  ['a6','b6','c6','d6','e6','f6','g6','h6'],
  ['a5','b5','c5','d5','e5','f5','g5','h5'],
  ['a4','b4','c4','d4','e4','f4','g4','h4'],
  ['a3','b3','c3','d3','e3','f3','g3','h3'],
  ['a2','b2','c2','d2','e2','f2','g2','h2'],
  ['a1','b1','c1','d1','e1','f1','g1','h1']
];

const board2 = [
  ['18','28','38','48','58','68','78','88'],
  ['17','27','37','47','57','67','77','87'],
  ['16','26','36','46','56','66','76','86'],
  ['15','25','35','45','55','65','75','85'],
  ['14','24','34','44','54','64','74','84'],
  ['13','23','33','43','53','63','73','83'],
  ['12','22','32','42','52','62','72','82'],
  ['11','21','31','41','51','61','71','81']
];

// maiusculas -> black, minusculas -> white
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



// PRIMEIRO PASSO COLOCAR AS CASAS COM OS NOMES DAS PEÇAS (R -> ROOK PRETO, r -> ROOK BRANCO)
// DPS FAZER O MOVIMENTO DELAS COM EXEMPLO COLOCA UMA MATRIZ COM A PEÇA TESTE NO CENTRO E VAI TESTANDO ALGUNS CASOS E ESCREVENDO O CODIGO
// POR FIM INCORPORAR AS IMAGENS DE CADA PEÇA  