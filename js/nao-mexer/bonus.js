// ============================================================
//  BÔNUS — pronto, não precisa mexer
//  Pega os heróis de meus-herois.js, confere se estão certinhos
//  e coloca no baralho. Se algo estiver errado, avisa na tela
//  (faixa amarela) em vez de quebrar o jogo.
// ============================================================

(function () {
  const lista = typeof MEUS_HEROIS === 'undefined' ? [] : MEUS_HEROIS;
  const CORES_RESERVA = ['#ef4444', '#22c55e', '#ec4899', '#14b8a6', '#f97316', '#84cc16'];
  const problemas = [];
  const avisos = [];
  const validos = [];

  // 1) Confere cada herói
  lista.forEach((heroi, indice) => {
    const nome = heroi && typeof heroi.nome === 'string' ? heroi.nome.trim() : '';
    const rotulo = nome === '' ? `herói nº ${indice + 1}` : nome;
    const erros = [];

    if (nome === '') erros.push('falta o nome');
    if (!heroi || typeof heroi.equipe !== 'string' || heroi.equipe.trim() === '') {
      erros.push('falta a equipe');
    }
    for (const atributo of ATRIBUTOS) {
      const valor = heroi ? heroi[atributo] : undefined;
      if (typeof valor !== 'number' || !Number.isFinite(valor) || valor < 0 || valor > 100) {
        erros.push(`${atributo} precisa ser um número de 0 a 100 (sem aspas e sem acento)`);
      }
    }

    const jaExiste = HEROIS.concat(validos).some((h) => h.nome.trim().toLowerCase() === nome.toLowerCase());
    if (nome !== '' && jaExiste) erros.push('já existe um herói com esse nome');

    if (erros.length > 0) {
      problemas.push(`${rotulo}: ${erros.join('; ')}.`);
    } else {
      validos.push(heroi);
    }
  });

  // 2) O baralho precisa ter número par de cartas
  if ((HEROIS.length + validos.length) % 2 !== 0 && validos.length > 0) {
    const sobrou = validos.pop();
    avisos.push(`"${sobrou.nome}" ficou de fora: crie mais um herói para o baralho ter número par de cartas.`);
  }

  // 3) Coloca no baralho (e registra equipes novas)
  let proximaCor = 0;
  for (const heroi of validos) {
    const equipe = heroi.equipe.trim();
    if (!EQUIPES.includes(equipe)) {
      EQUIPES.push(equipe);
      const corValida = typeof heroi.cor === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(heroi.cor.trim());
      CORES_DAS_EQUIPES[equipe] = corValida ? heroi.cor.trim() : CORES_RESERVA[proximaCor % CORES_RESERVA.length];
      proximaCor++;
    }
    const total = heroi.forca + heroi.velocidade + heroi.inteligencia + heroi.poder;
    if (total > 320) {
      avisos.push(`${heroi.nome} tem força total ${total}: vai dominar o jogo! 😅`);
    }
    // copia todas as propriedades (inclusive um atributo novo, se a turma criar)
    const copia = Object.assign({}, heroi);
    copia.nome = heroi.nome.trim();
    copia.equipe = equipe;
    copia.emoji = heroi.emoji || '🦸';
    HEROIS.push(copia);
  }

  // 4) Atualiza a tela inicial
  const regra = document.getElementById('regraCartas');
  if (regra) regra.textContent = `Cada jogador recebe ${HEROIS.length / 2} cartas de heróis.`;

  const faixa = document.getElementById('avisoBonus');
  if (faixa && (validos.length > 0 || problemas.length > 0 || avisos.length > 0)) {
    faixa.hidden = false;
    faixa.innerHTML = '';
    const titulo = document.createElement('p');
    titulo.className = 'bonus-titulo';
    titulo.textContent = validos.length > 0
      ? `🦸 Bônus ativo: ${validos.length} herói(s) seu(s) no baralho!`
      : '🦸 Bônus: seus heróis ainda não entraram no baralho.';
    faixa.appendChild(titulo);
    for (const texto of problemas.concat(avisos)) {
      const linha = document.createElement('p');
      linha.className = 'bonus-problema';
      linha.textContent = `⚠️ ${texto}`;
      faixa.appendChild(linha);
    }
  }
})();
