//to querendo gerar as divs pelo JS e ai a div q tiver uma letra será clicavel

// primeiro eu faço uma matriz com todas as peças, assim eu associo essa matriz com o tabuleiro(square-ij) dps faço o JS pra cada movimento de peça, vendo onde ela ta e onde ela pode ir dps eh so ver se ja tem uma peça la e fazer a relação
const board2 = [
  ['81','82','83','84','85','86','87','88'],
  ['71','72','73','74','75','76','77','78'],
  ['61','62','X','64','X','66','67','68'],
  ['51','X','53','54','55','X','57','58'],
  ['41','42','43','N','45','46','47','48'],
  ['31','X','33','34','35','X','37','38'],
  ['21','22','X','24','X','26','27','28'],
  ['11','12','13','14','15','16','17','18']
];



const columns = 'abcdefgh';

for (let i  = 0; i < 8; i++) {

  for (let j = 0; j < 8; j++) {
    
    const linha = 8-i;
    const coluna = j+1;
    const square = document.querySelector(`.s-${linha}${coluna}`);

    square.innerHTML = board2[i][j] // ${linha}${coluna}

  }

}


/*
const board1 = [
  ['8a','8b','8c','8d','8e','8f','8g','8h'],
  ['7a','7b','7c','7d','7e','7f','7g','7h'],
  ['6a','6b','6c','6d','6e','6f','6g','6h'],
  ['5a','5b','5c','5d','5e','5f','5g','5h'],
  ['4a','4b','4c','4d','4e','4f','4g','4h'],
  ['3a','3b','3c','3d','3e','3f','3g','3h'],
  ['2a','2b','2c','2d','2e','2f','2g','2h'],
  ['1a','1b','1c','1d','1e','1f','1g','1h']
];

const board2 = [
  ['81','82','83','84','85','86','87','88'],
  ['71','72','73','74','75','76','77','78'],
  ['61','62','63','64','65','66','67','68'],
  ['51','52','53','54','55','56','57','58'],
  ['41','42','43','44','45','46','47','48'],
  ['31','32','33','34','35','36','37','38'],
  ['21','22','23','24','25','26','27','28'],
  ['11','12','13','14','15','16','17','18']
];

const board3 = [
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','n','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','','']
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



 PRIMEIRO PASSO COLOCAR AS CASAS COM OS NOMES DAS PEÇAS (R -> ROOK PRETO, r -> ROOK BRANCO)
 DPS FAZER O MOVIMENTO DELAS COM EXEMPLO COLOCA UMA MATRIZ COM A PEÇA TESTE NO CENTRO E VAI TESTANDO ALGUNS CASOS E ESCREVENDO O CODIGO
 POR FIM INCORPORAR AS IMAGENS DE CADA PEÇA 
 
 */