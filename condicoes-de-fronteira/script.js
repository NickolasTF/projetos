/*
Trabalho 2 - Condições de Fronteira
Nickolas Torres Faria - 12311EEL001
Arthur Felipe Lopes Silva - 12311ETE013



Trabalho apresentado à disciplina FEELT31405 –
Eletromagnetismo, Turma 1, sob orientação do
Prof. Luiz Arthur Tarralo Passatuto.
Data:11/07/2026
*/

// --- CONSTANTES DO PROBLEMA (Opção B) ---

const d1 = 80e-9;      // 80 nm
const d2 = 60e-9;      // 60 nm
const L = 400e-9;      // 400 nm
const er1 = 3.9;
const er2 = 7.5;
const V0 = 5;          // 5 V
const e0 = 8.854e-12;  // Permissividade do vácuo
        
        
const A = 0.02;        // C/m^2
const sigma = 60e-9;   // 60 nm
const D0 = (e0 * V0) / ((d1 / er1) + (d2 / er2));



// --- CRIAÇÃO DA MALHA ESPACIAL ---
const Nx = 300; 
const Ny = 300;
const dx = (d1 + d2) / (Nx - 1);
const dy = L / (Ny - 1);


// Arrays de coordenadas
const x_arr = Array.from({length: Nx}, (_, i) => i * dx);
const y_arr = Array.from({length: Ny}, (_, i) => i * dy);


// --- CÁLCULO DO CAMPO D (Dado Numérico / Simulado) ---
  function calculateField(x, y) {

  let Dx, Dy = 0; 
                  
  const exp_y = Math.exp(-Math.pow(y - L/2, 2) / (2 * Math.pow(sigma, 2)));        
  const exp_x = Math.exp(-Math.pow(x - d1, 2) / (2 * Math.pow(sigma, 2)));          
  const perturb = A * exp_x * exp_y;


  if (x <= d1) {
    // Região 1 (SiO2)
    Dx = D0 + perturb;
    } else {
      // Região 2 (Si3N4)
      Dx = D0 - perturb;

    }
    return { Dx, Dy };
  }

  function calculateRhoTeorico(y) {
    let exp_y_teorico = Math.exp(-Math.pow(y - L/2, 2) / (2 * Math.pow(sigma, 2)));
    return 2 * A * exp_y_teorico;
  }

// --- EXTRAÇÃO NA INTERFACE ---
        
// Achar a divisão das intefaces
let interface_idx = 0;
let min_diff = Infinity;
for(let i=0; i<Nx; i++) {
  let diff = Math.abs(x_arr[i] - d1);
  if(diff < min_diff) {
    min_diff = diff;
    interface_idx = i;
  }
}

// Vetores para guardar os resultados ao longo de y (interface s = y)
let posicao = [];
let delta_Dn_num = [];
let delta_Et_num = [];
let erro_absoluto = [];
let rho_s_arr = [];

for (let j = 0; j < Ny; j++) {
            
  let y = y_arr[j];
            
  // Lados da interface
  let x_esq = x_arr[interface_idx]; 
  let x_dir = x_arr[interface_idx + 1] || x_arr[interface_idx]; // previne out of bounds

  let campo_1 = calculateField(x_esq, y);        
  let campo_2 = calculateField(x_dir, y);

  // Salto numérico D normal (eixo x)
  let Dn1 = campo_1.Dx;
  let Dn2 = campo_2.Dx;
  let dDn = Dn1 - Dn2;

  // Salto numérico E tangencial (eixo y) -> Et = Dy / (er * e0)
  let Et1 = campo_1.Dy / (er1 * e0);
  let Et2 = campo_2.Dy / (er2 * e0);
  let dEt = Et1 - Et2;

  // --- CÁLCULO ANALÍTICO DE RHO_S TEÓRICO ---
  // rho_s = Dn1(d1) - Dn2(d1)

  
  let rho_s_teorico = calculateRhoTeorico(y);

  posicao.push(y * 1e9); // Passando para nm para o plot
  delta_Dn_num.push(dDn);
  delta_Et_num.push(dEt);
  rho_s_arr.push(rho_s_teorico);
  erro_absoluto.push(Math.abs(dDn - rho_s_teorico));
}






// --- GRÁFICOS ---
        
const layoutDark = {
            
  paper_bgcolor: 'transparent',
  plot_bgcolor: '#1e1e1e',
  font: {color: '#e0e0e0'},
  margin: { t: 30, b: 40, l: 60, r: 20 },
  xaxis: { gridcolor: '#444' },
  yaxis: { gridcolor: '#444' }
};

// G2: Gráfico de Linha (Dn e Rho_S)
        
let trace_dDn = { x: posicao, y: delta_Dn_num, mode: 'lines', name: 'ΔD<sub>n</sub> (Numérico)', line: {color: '#03DAC6', width: 3} };

let trace_rho = { x: posicao, y: rho_s_arr, mode: 'lines', name: 'ρ<sub>s</sub> (Teórico)', line: {color: '#CF6679', dash: 'dash', width: 2} };
        
Plotly.newPlot('plot-dn', [trace_dDn, trace_rho], {
  ...layoutDark, title: 'Interface em x = 80nm', xaxis: {title: 'Coordenada s (y) [nm]'}, yaxis: {title: 'Carga [C/m²]'}
});

// G3: Gráfico de Linha (Et)
let trace_dEt = { x: posicao, y: delta_Et_num, mode: 'lines', name: 'ΔE_t', line: {color: '#BB86FC'} };
Plotly.newPlot('plot-et', [trace_dEt], {
  ...layoutDark, yaxis: {title: 'Campo [V/m]'}, xaxis: {title: 'Coordenada s (y) [nm]'}
});

// G4: Heatmap de Erro (Perturbação Absoluta na Malha 2D)
// Plotamos a diferença absoluta entre o campo real (com defeito) e o campo ideal (D0).
let Z_Erro_2D = [];

for (let j = 0; j < Ny; j++) {
  let row = [];
  for (let i = 0; i < Nx; i++) {
    let y = y_arr[j];
    let x = x_arr[i];

    // O campo ideal (sem anomalia) é sempre D0.
    let campo_ideal = D0;
    
    // O campo calculado (numérico/medido) contém a anomalia.
    let campo_medido = calculateField(x, y).Dx;

    // Erro absoluto na malha 2D = |Medido - Ideal|
    let erro_pontual = Math.abs(campo_medido - campo_ideal);
    
    row.push(erro_pontual);
  }
  Z_Erro_2D.push(row);
}

let trace_heatmap = {
  z: Z_Erro_2D, 
  x: x_arr.map(v => v*1e9), 
  y: y_arr.map(v => v*1e9),
  type: 'heatmap', 
  colorscale: 'Viridis' 
};

Plotly.newPlot('plot-error', [trace_heatmap], {
  ...layoutDark, 
  title: 'Erro Absoluto (Perturbação Induzida) [C/m²]', 
  xaxis: {title: 'x [nm]'}, 
  yaxis: {title: 'y [nm]'}
});


// G1: QUIVER PLOT EM CANVAS HTML5 

  function drawQuiverCanvas() {
            
  const canvas = document.getElementById('quiverCanvas');
  const ctx = canvas.getContext('2d');
            
    
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  // Limpar
  ctx.clearRect(0, 0, canvas.width, canvas.height);
            
  // Margens para o Canvas
  const margem = 20;
  const w = canvas.width - 2*margem;
  const h = canvas.height - 2*margem;

  // Não desenhamos os 300x300 pontos senao fica denso demais. Vamos amostrar:
  const step_plot = 15; // Plota 1 seta a cada 15 pontos
            
  // Traçar uma linha para a interface
  ctx.strokeStyle = "white";
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  let p_interface_x = margem + (d1 / (d1+d2)) * w;
  ctx.moveTo(p_interface_x, margem);
  ctx.lineTo(p_interface_x, margem + h);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#BB86FC"; // Cor das setas
  ctx.strokeStyle = "#BB86FC";
            
  for(let j = 0; j < Ny; j+=step_plot) {
    for(let i = 0; i < Nx; i+=step_plot) {
                    
      let campo = calculateField(x_arr[i], y_arr[j]);
      
      // Como Dy é 0 nominalmente, a seta seria 100% reta.
      // Para dar vida, a amplitude dita o tamanho da seta x.
      let magX = campo.Dx * 20000; // Fator de escala visual
      let magY = 0; 
                    
      let cx = margem + (x_arr[i] / (d1+d2)) * w;
      let cy = margem + (y_arr[j] / L) * h;
                    
      // Desenha Flecha
      let angle = Math.atan2(magY, magX);
      let len = Math.max(2, Math.min(20, Math.abs(magX))); // limita tamanho

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + len*Math.cos(angle), cy + len*Math.sin(angle));
      ctx.stroke();
                    
      // Cabeça da Flecha
      ctx.beginPath();
      ctx.moveTo(cx + len*Math.cos(angle), cy + len*Math.sin(angle));
      ctx.lineTo(cx + len*Math.cos(angle) - 4*Math.cos(angle - Math.PI/6), cy + len*Math.sin(angle) - 4*Math.sin(angle - Math.PI/6));
      ctx.lineTo(cx + len*Math.cos(angle) - 4*Math.cos(angle + Math.PI/6), cy + len*Math.sin(angle) - 4*Math.sin(angle + Math.PI/6));
      ctx.fill();
                
    }
            
  }
        
}
        
// Desenha o Quiver e re-desenha se a janela redimensionar
drawQuiverCanvas();
window.addEventListener('resize', drawQuiverCanvas);