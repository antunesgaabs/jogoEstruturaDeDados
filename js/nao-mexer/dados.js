// ============================================================
//  DADOS DO JOGO — pronto, não precisa mexer
//  Cada herói é um objeto literal (igual à Semana 4).
//  A classe Baralho transforma cada um em uma Carta com new.
// ============================================================

const ATRIBUTOS = ['forca', 'velocidade', 'inteligencia', 'poder'];

const NOMES_DOS_ATRIBUTOS = {
  forca: 'Força',
  velocidade: 'Velocidade',
  inteligencia: 'Inteligência',
  poder: 'Poder',
};

const EQUIPES = ['Guardiões do Sol', 'Liga da Maré', 'Sentinelas da Noite', 'Tropa Relâmpago'];

const CORES_DAS_EQUIPES = {
  'Guardiões do Sol': '#f59e0b',
  'Liga da Maré': '#0ea5e9',
  'Sentinelas da Noite': '#8b5cf6',
  'Tropa Relâmpago': '#eab308',
};

const HEROIS = [
  { nome: 'Capitã Aurora', equipe: 'Guardiões do Sol', emoji: '☀️', forca: 78, velocidade: 70, inteligencia: 82, poder: 88 },
  { nome: 'Brasa', equipe: 'Guardiões do Sol', emoji: '🔥', forca: 85, velocidade: 66, inteligencia: 50, poder: 80 },
  { nome: 'Girassol', equipe: 'Guardiões do Sol', emoji: '🌻', forca: 45, velocidade: 58, inteligencia: 76, poder: 62 },
  { nome: 'Titã de Pedra', equipe: 'Guardiões do Sol', emoji: '🗿', forca: 98, velocidade: 30, inteligencia: 44, poder: 70 },

  { nome: 'Tsunami', equipe: 'Liga da Maré', emoji: '🌊', forca: 90, velocidade: 72, inteligencia: 55, poder: 85 },
  { nome: 'Coral', equipe: 'Liga da Maré', emoji: '🐚', forca: 50, velocidade: 64, inteligencia: 80, poder: 58 },
  { nome: 'Tubarão Azul', equipe: 'Liga da Maré', emoji: '🦈', forca: 88, velocidade: 84, inteligencia: 40, poder: 52 },
  { nome: 'Maré Mansa', equipe: 'Liga da Maré', emoji: '🐢', forca: 60, velocidade: 25, inteligencia: 90, poder: 55 },

  { nome: 'Sombra', equipe: 'Sentinelas da Noite', emoji: '🦇', forca: 70, velocidade: 88, inteligencia: 86, poder: 64 },
  { nome: 'Coruja', equipe: 'Sentinelas da Noite', emoji: '🦉', forca: 40, velocidade: 62, inteligencia: 97, poder: 60 },
  { nome: 'Eclipse', equipe: 'Sentinelas da Noite', emoji: '🌑', forca: 66, velocidade: 58, inteligencia: 70, poder: 92 },
  { nome: 'Vulto', equipe: 'Sentinelas da Noite', emoji: '👤', forca: 55, velocidade: 95, inteligencia: 48, poder: 45 },

  { nome: 'Faísca', equipe: 'Tropa Relâmpago', emoji: '⚡', forca: 58, velocidade: 99, inteligencia: 62, poder: 84 },
  { nome: 'Trovão', equipe: 'Tropa Relâmpago', emoji: '🌩️', forca: 92, velocidade: 60, inteligencia: 52, poder: 90 },
  { nome: 'Ventania', equipe: 'Tropa Relâmpago', emoji: '🌪️', forca: 62, velocidade: 90, inteligencia: 58, poder: 72 },
  { nome: 'Pixel', equipe: 'Tropa Relâmpago', emoji: '🤖', forca: 48, velocidade: 70, inteligencia: 95, poder: 50 },
];
