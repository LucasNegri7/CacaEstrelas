// ===== Constantes e variáveis do jogo =====
const TEMPO_INICIAL = 30;
const TAMANHO_ALVO = 50;
const ALTURA_PLACAR = 70;
const EMOJIS_ALVO = ["🚀", "👾", "🛸"];
const CORES_ESTRELAS = ["#ffffff", "#ffd54a", "#9ecbff", "#ffb3c1"];

let pontos = 0;
let tempo = TEMPO_INICIAL;
let jogando = false;
let intervaloRelogio = null;
let timeoutAlvo = null;

const elPontos = document.getElementById("pontos");
const elTempo = document.getElementById("tempo");
const telaInicial = document.getElementById("telaInicial");
const telaFim = document.getElementById("telaFim");

// ===== Som =====
// Gera um "bipe" que sobe de tom, sem precisar de arquivo de áudio.
// Se preferir um arquivo seu, troque por: const audio = new Audio("som.mp3");
function criarSom() {
  const taxa = 8000;
  const n = Math.floor(taxa * 0.4);
  const bytes = new Uint8Array(44 + n);
  const v = new DataView(bytes.buffer);

  const escrever = function (pos, texto) {
    for (let i = 0; i < texto.length; i++) v.setUint8(pos + i, texto.charCodeAt(i));
  };

  escrever(0, "RIFF"); v.setUint32(4, 36 + n, true);
  escrever(8, "WAVEfmt "); v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, taxa, true); v.setUint32(28, taxa, true);
  v.setUint16(32, 1, true); v.setUint16(34, 8, true);
  escrever(36, "data"); v.setUint32(40, n, true);

  for (let i = 0; i < n; i++) {
    const t = i / taxa;
    const onda = Math.sin(2 * Math.PI * (400 * t + 750 * t * t));
    bytes[44 + i] = 128 + onda * 100 * (1 - i / n);
  }

  let binario = "";
  bytes.forEach(function (b) { binario += String.fromCharCode(b); });
  return new Audio("data:audio/wav;base64," + btoa(binario));
}

const audio = criarSom();

// ===== Estrelas =====
function criarEstrelas() {
  // Bônus: quantidade proporcional ao tamanho da tela
  const quantidade = Math.floor((innerWidth * innerHeight) / 8000);

  for (let i = 0; i < quantidade; i++) {
    const estrela = document.createElement("div");
    estrela.className = "star";
    estrela.style.left = Math.random() * 100 + "%";
    estrela.style.top = Math.random() * 100 + "%";
    // Bônus: cor sorteada de um array
    estrela.style.background = CORES_ESTRELAS[Math.floor(Math.random() * CORES_ESTRELAS.length)];
    estrela.style.animationDelay = Math.random() * 2 + "s";
    document.body.appendChild(estrela);
  }
}

function removerEstrelas() {
  document.querySelectorAll(".star").forEach(function (s) { s.remove(); });
}

// No resize, remove as antigas e recria (sem acumular)
window.addEventListener("resize", function () {
  removerEstrelas();
  criarEstrelas();
});

// ===== Alvos =====
// Retorna [x, y] dentro da tela, descontando o tamanho do alvo e a altura do placar
function posicaoAleatoria() {
  const x = Math.floor(Math.random() * (innerWidth - TAMANHO_ALVO));
  const y = Math.floor(Math.random() * (innerHeight - ALTURA_PLACAR - TAMANHO_ALVO)) + ALTURA_PLACAR;
  return [x, y];
}

function atualizarPlacar() {
  elPontos.textContent = pontos;
  elTempo.textContent = tempo;
}

function removerAlvos() {
  clearTimeout(timeoutAlvo);
  document.querySelectorAll(".alvo").forEach(function (a) { a.remove(); });
}

// Bônus: dificuldade progressiva (quanto mais pontos, menos tempo o alvo fica na tela)
function duracaoDoAlvo() {
  return Math.max(600, 1500 - pontos * 40);
}

function criarAlvo() {
  if (!jogando) return;
  removerAlvos();

  // Bônus: alvo "proibido" (bomba) com 20% de chance
  const proibido = Math.random() < 0.2;
  const alvo = document.createElement("div");
  const [x, y] = posicaoAleatoria();

  alvo.className = "alvo";
  alvo.textContent = proibido ? "💣" : EMOJIS_ALVO[Math.floor(Math.random() * EMOJIS_ALVO.length)];
  alvo.style.left = x + "px";
  alvo.style.top = y + "px";

  // Clique: remove o alvo, atualiza pontos e cria outro
  alvo.addEventListener("click", function () {
    pontos = proibido ? Math.max(0, pontos - 3) : pontos + 1;
    atualizarPlacar();
    criarAlvo();
  });

  document.body.appendChild(alvo);

  // Se o jogador não clicar a tempo, o alvo some e outro aparece
  timeoutAlvo = setTimeout(criarAlvo, duracaoDoAlvo());
}

// ===== Controle do jogo =====
function mostrarFim() {
  clearInterval(intervaloRelogio);
  jogando = false;
  removerAlvos();
  document.getElementById("pontosFinais").textContent = pontos;
  telaFim.classList.remove("escondida");
}

// Usada tanto no "Iniciar" quanto no "Jogar novamente" (DRY)
function iniciarJogo() {
  clearInterval(intervaloRelogio);
  removerAlvos();
  pontos = 0;
  tempo = TEMPO_INICIAL;
  jogando = true;
  atualizarPlacar();

  telaInicial.classList.add("escondida");
  telaFim.classList.add("escondida");

  // Som tocado no clique do botão (libera a política de autoplay)
  audio.currentTime = 0;
  const tentativa = audio.play();
  if (tentativa) tentativa.catch(function () {});

  intervaloRelogio = setInterval(function () {
    tempo--;
    atualizarPlacar();
    if (tempo <= 0) mostrarFim();
  }, 1000);

  criarAlvo();
}

document.getElementById("btnIniciar").addEventListener("click", iniciarJogo);
document.getElementById("btnReiniciar").addEventListener("click", iniciarJogo);

criarEstrelas();
