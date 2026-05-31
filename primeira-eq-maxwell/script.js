


//função para gerar o grid 200x200, ou qualquer outro grid(tem q ser quadrada) com os valores de cada ponto no espaço.
function matrizGeraGrid (numPontos,distanciaX,distanciaY) {
  // 200 , 0,005, 0,005
  let matriz=[];

  const deltaX = distanciaX / (numPontos-1);
  const deltaY = distanciaY / (numPontos-1);


  for (let i=0; i < numPontos; i++) {
    // i representa o eixo y

    let linha = [];

    for (let j = 0; j < numPontos; j++) {
      //j representa o eixo x

      let coluna = [deltaX*j,deltaY*i];

      linha.push(coluna);

    }
    
    matriz.push(linha);
    
  }
  return matriz;
  //aqui se acessa o ponto por matriz[COORDENADAy][COORDENADAx]
}


//função q calcula o campo D no capacitor de acordo com a equação do enunciado
function calcularCampoD(x,y) {
  const eps0 = 8.854187817e-12;
  const epsR = 4.5;
  const E0 = 1.2e5;
  const d = 0.005;

  const L = 0.005;
  const beta = 0.3;

  let termoSin = Math.sin((Math.PI * x) / d);
  let termoCos = Math.cos((2 * Math.PI * y) / L)

  let Dx = eps0 * epsR * E0 * (1 + beta * termoSin * termoCos);
  let Dy = 0;

  return [Dx,Dy];
}

//função q vai passar pelos 200x200 pontos da malha e determinar o Dx e o Dy deles
function funcaoGeraD(numPontos,matriz) {
  // vai chegar uma matriz e eu vou usar ex o ponto [0,1](x=1,y=0) e o [2,4](x=4,y=2)
  let Dx = [];
  let Dy = [];
  //preciso criar matriz de pontos, pois o plotly n vai ler coordenadas, vai ler ordenadas e abscissas

  for (let y = 0; y < numPontos; y++) {
    let linhaDx = [];
    let linhaDy = [];

    for (let x = 0; x < numPontos; x++) {
      let coordX = matriz[y][x][0];
      let coordY = matriz[y][x][1];


      let valorD = calcularCampoD(coordX,coordY);

      linhaDx.push(valorD[0]);
      linhaDy.push(valorD[1]);
      
    }
    

    Dx.push(linhaDx);
    Dy.push(linhaDy);
    
  }

  return { matrizDx: Dx , matrizDy: Dy};
}


//função q calcula o div D usando o método das diferenças finitas centradas
function calcularDiferencasFinitas(matrizDx, numPontos, distanciaX) {
  // vai entrar a matriz com os valores Dx pra cada ponto, o numero de pontos(200), a distacia 0,005m, e vai sair a matriz rho numerico

  const deltaX = distanciaX / (numPontos-1);
  let matrizRhoNumerico = [];

  for (let y =0 ; y < numPontos; y++) {

    let linhaRho = [];

    for (let x = 0; x < numPontos; x++) {
      let diferencasFin;


      //caso esta na borda inicial
      if (x === 0) {
        diferencasFin = (matrizDx[y][x + 1] - matrizDx[y][x]) / deltaX;
      }
      //caso esteja na borda final
      else if (x === numPontos - 1){
        diferencasFin = (matrizDx[y][x] - matrizDx[y][x - 1]) / deltaX;
      }
      //caso esteja no meio da matriz
      else { 
        diferencasFin = (matrizDx[y][x + 1] - matrizDx[y][x - 1]) / (2 * deltaX);
      }
      linhaRho.push(diferencasFin);

    }

    matrizRhoNumerico.push(linhaRho);
  }

  return matrizRhoNumerico;
}

//a derivada de Dx em x fica : e0.eR.E0.beta.(pi/d)cos((pi.x)/d)cos((2.pi.y)/L)
function calcularRhoTeorico(x,y) {
  const eps0 = 8.854187817e-12;
  const epsR = 4.5;
  const E0 = 1.2e5;

  const d = 0.005;
  const L = 0.005;
  const beta = 0.3;

  let termoCosX = Math.cos((Math.PI * x) / d);

  let termoCosY = Math.cos((2 * Math.PI * y) / L)
  
  return eps0 * epsR * E0 * beta * ((Math.PI) / d) * termoCosX * termoCosY;
}


//função q gera o RhoTeorico

function funcaoGeraRhoTeorico(numPontos,matriz) {

  let matrizRhoTeorico = [];

  for(let y = 0; y < numPontos; y++) {

    let linhaRho = [];

    for(let x = 0; x < numPontos; x++) {

      let coordX = matriz[y][x][0];
      let coordY = matriz[y][x][1];

      let valorTeorico = calcularRhoTeorico(coordX,coordY);
      linhaRho.push(valorTeorico);

    }
    matrizRhoTeorico.push(linhaRho);

  }

  return matrizRhoTeorico; 
}



function calcularMatrizErro(matrizNumerico,matrizTeorico,numPontos) {
  let matrizErro = [];

  for(let y = 0; y < numPontos; y++) {

    let linhaErro = [];

    for(let x = 0; x < numPontos; x++) {

      let erro = Math.abs(matrizNumerico[y][x] - matrizTeorico[y][x]);

      linhaErro.push(erro);
    }

    matrizErro.push(linhaErro);
  }

  return matrizErro;
}




//---------------------------Opção B – Capacitor de placas planas com carga volumétrica---------------------------//


const numPontos = 200;
const D = 0.005;
const L = 0.005;

//Passo 1: Malha
let malha = matrizGeraGrid(numPontos, D, L);

    
//Passo 2: Campo Medido
let campos = funcaoGeraD(numPontos, malha);
let matrizDx = campos.matrizDx;

//Passo 3: Divergência Numérica
let rhoNumerico = calcularDiferencasFinitas(matrizDx, numPontos, D);

//Passo 4: Divergência Teórica
let rhoTeorico = funcaoGeraRhoTeorico(numPontos, malha);

//Passo 5: Erro
let matrizErro = calcularMatrizErro(rhoNumerico, rhoTeorico, numPontos);




//Usando a biblioteca PLOTLY para gerar os graficos


let eixoX = [];
let eixoY = [];

for (let i = 0; i < numPontos; i++) {

  eixoX.push(i * D / (numPontos - 1));
  eixoY.push(i * L / (numPontos - 1));

}


//G1: Campo D

Plotly.newPlot('grafico1', [{
  x: eixoX,
  y: eixoY,
  z: matrizDx,
  type: 'heatmap',
  colorscale: 'Viridis'
}], { title: 'Intensidade do Campo Dx' });

//G2: Carga Numérica

Plotly.newPlot('grafico2', [{
  x: eixoX, 
  y: eixoY,
  z: rhoNumerico,
  type: 'heatmap',
  colorscale: 'Jet'
}], { title: 'Densidade de Carga Numérica (Diferenças Finitas Centradas)' });

//G3: Carga Teórica

Plotly.newPlot('grafico3', [{
  x: eixoX, 
  y: eixoY,
  z: rhoTeorico,
  type: 'heatmap',
  colorscale: 'Jet'
}], { title: 'Densidade de Carga Teórica (Calculado Analiticamente-à mão-)' });


//G4: Erro Absoluto

Plotly.newPlot('grafico4', [{
  x: eixoX, 
  y: eixoY,
  z: matrizErro,
  type: 'heatmap',
  colorscale: 'Hot'
}], { title: 'Erro Absoluto (|Numérico - Teórico|)' });





