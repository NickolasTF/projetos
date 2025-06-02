/*CORES DO TABULEIRO 
 #B58863 
 #F0D9B5 
*/
let columns = 'abcdefgh'

for (let i = 0; i < 8; i++) {

  for(let j = 0; j < 8; j++) {

   if ((i+j) % 2 === 0) {
    document.querySelector(`.${columns[i]}${j+1}`).classList.add('dark-square');
   } else {
    document.querySelector(`.${columns[i]}${j+1}`).classList.add('light-square');
   }

  }

}

//me gerou problemas, pois cria estilos inline, q n da pra sobreescrever dps com CSS, vou resolver isso usando em CSS o nth-child