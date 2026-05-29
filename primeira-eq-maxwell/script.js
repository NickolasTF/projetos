


//função para gerar o grid 200x200, ou qualquer outro grid(tem q ser quadrada) com os valores de cada ponto no espaço.
function matrizGrid (numPontos,distanciaX,distanciaY) {
  // 200 , 0,005, 0,005
  let matriz=[];

  const deltaX = distanciaX / (numPontos-1);
  const deltaY = distanciaY / (numPontos-1);

  
  for (let i=0; i < numPontos; i++) {

    let linha = [];

    for (let j = 0; j < numPontos; j++) {

      let coluna = [i,j];

      linha.push(coluna);

    }
    
    matriz.push(linha);
    
  }
  return matriz;
}

console.log(matrizGrid(3)/* [1][2] */);