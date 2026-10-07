// ============================================================
//  TELA DO JOGO — pronto, não precisa mexer
//  Tudo o que mexe no HTML (DOM) está aqui. Este arquivo só
//  CHAMA os métodos das classes que vocês completaram.
// ============================================================

let jogo = null;
let fase = 'inicio'; // 'escolha' | 'vez-computador' | 'revelado' | 'fim'
let ultimaRodada = null;

const elemento = id => document.getElementById(id);

// Chama um método dos alunos sem deixar a tela quebrar se ele
// ainda não estiver pronto (devolve o valor reserva no lugar)
function tentar(funcao, reserva) {
  try {
    const valor = funcao();
    return valor === undefined ? reserva : valor;
  } catch (erro) {
    return reserva;
  }
}

// ---------------- Verificação ----------------

function classesCarregaram() {
  const faltando = [];
  if (typeof Carta === 'undefined') faltando.push('Carta.js');
  if (typeof Jogador === 'undefined') faltando.push('Jogador.js');
  if (typeof Jogo === 'undefined') faltando.push('Jogo.js');
  if (faltando.length > 0) {
    const aviso = elemento('avisoErro');
    aviso.hidden = false;
    aviso.innerHTML = `⚠️ Erro ao carregar <strong>${faltando.join(', ')}</strong>. ` +
      'Deve ter algum erro de digitação (uma chave ou parêntese sobrando/faltando). ' +
      'Aperte <kbd>F12</kbd> e abra a aba <strong>Console</strong> para ver a linha do erro.';
    return false;
  }
  return true;
}

function mostrarVerificacao(resultados) {
  const lista = elemento('listaTestes');
  lista.innerHTML = '';
  for (const r of resultados) {
    const li = document.createElement('li');
    li.className = r.ok ? 'teste ok' : 'teste falhou';
    li.innerHTML =
      `<span class="teste-icone">${r.ok ? '✅' : '❌'}</span>` +
      `<div><strong>TODO ${r.todo} · ${r.titulo}</strong>` +
      `<span class="teste-arquivo">${r.arquivo}</span>` +
      `<p>${r.mensagem}</p></div>`;
    lista.appendChild(li);
  }
  const passaram = resultados.filter(r => r.ok).length;
  elemento('btnVerificacao').textContent = `🧪 Verificação ${passaram}/${resultados.length}`;
  elemento('btnVerificacao').classList.toggle('completo', passaram === resultados.length);
}

function verificarBloqueio(resultados) {
  const faltando = resultados
    .filter(r => !r.ok && TODOS_OBRIGATORIOS_PARA_JOGAR.includes(r.todo))
    .map(r => r.todo);
  const aviso = elemento('avisoBloqueio');
  const botao = elemento('btnComecar');
  if (faltando.length > 0) {
    aviso.hidden = false;
    aviso.innerHTML = `🔒 Para liberar a partida, complete os TODOs <strong>${faltando.join(', ')}</strong>. ` +
      'Clique em "Verificação" no topo para ver o que falta.';
    botao.disabled = true;
  } else {
    aviso.hidden = true;
    botao.disabled = false;
  }
}

// ---------------- Cartas ----------------

function desenharCarta(carta, opcoes) {
  const div = document.createElement('div');

  if (!carta || opcoes.oculta) {
    div.className = 'carta verso';
    div.innerHTML = '<span>?</span>';
    return div;
  }

  const raridade = tentar(() => carta.raridade(), '???');
  const total = tentar(() => carta.forcaTotal(), '?');
  const classeRaridade = { 'Lendária': 'lendaria', 'Rara': 'rara', 'Comum': 'comum' }[raridade] || 'desconhecida';

  div.className = `carta ${classeRaridade}`;
  div.style.setProperty('--cor-equipe', CORES_DAS_EQUIPES[carta.equipe] || '#64748b');
  div.innerHTML =
    `<div class="carta-topo"><span class="carta-equipe">${carta.equipe}</span>` +
    `<span class="carta-raridade">${raridade}</span></div>` +
    `<div class="carta-emoji"></div>` +
    `<div class="carta-nome">${carta.nome}</div>` +
    `<div class="carta-total">Força total <strong>${total}</strong></div>`;

  // Imagem do herói (bônus). Sem imagem, ou se ela não carregar, mostra o emoji.
  const area = div.querySelector('.carta-emoji');
  if (carta.imagem) {
    area.classList.add('com-imagem');
    const img = document.createElement('img');
    img.alt = carta.nome;
    img.src = carta.imagem;
    img.addEventListener('error', () => {
      area.classList.remove('com-imagem');
      area.textContent = carta.emoji;
    });
    area.appendChild(img);
  } else {
    area.textContent = carta.emoji;
  }

  const atributos = document.createElement('div');
  atributos.className = 'carta-atributos';
  for (const atributo of ATRIBUTOS) {
    const valor = tentar(() => carta.valorDe(atributo), '?');
    const linha = document.createElement(opcoes.clicavel ? 'button' : 'div');
    linha.className = 'atributo';
    if (opcoes.destaque === atributo) linha.classList.add('destaque');
    const largura = typeof valor === 'number' ? valor : 0;
    linha.innerHTML =
      `<span class="atributo-nome">${NOMES_DOS_ATRIBUTOS[atributo]}</span>` +
      `<span class="atributo-barra"><span style="width:${largura}%"></span></span>` +
      `<span class="atributo-valor">${valor}</span>`;
    if (opcoes.clicavel) {
      linha.addEventListener('click', () => escolherAtributo(atributo));
    }
    atributos.appendChild(linha);
  }
  div.appendChild(atributos);
  return div;
}

// ---------------- Telas ----------------

function renderizar() {
  // Placar
  elemento('nomeHumano').textContent = jogo.humano.nome;
  elemento('cartasHumano').textContent = `${jogo.humano.quantidadeDeCartas()} cartas`;
  elemento('cartasComputador').textContent = `${jogo.computador.quantidadeDeCartas()} cartas`;
  elemento('infoRodada').textContent = `Rodada ${Math.min(jogo.rodada, jogo.limiteDeRodadas)} de ${jogo.limiteDeRodadas}`;
  elemento('infoMonte').textContent = jogo.monte.length > 0 ? `🃏 ${jogo.monte.length} cartas no monte` : '';

  // Cartas na mesa
  const slotHumano = elemento('slotHumano');
  const slotComputador = elemento('slotComputador');
  slotHumano.innerHTML = '';
  slotComputador.innerHTML = '';

  if (fase === 'revelado') {
    slotHumano.appendChild(desenharCarta(ultimaRodada.minhaCarta, { destaque: ultimaRodada.atributo }));
    slotComputador.appendChild(desenharCarta(ultimaRodada.cartaDoComputador, { destaque: ultimaRodada.atributo }));
  } else if (fase !== 'fim') {
    slotHumano.appendChild(desenharCarta(jogo.humano.cartaDoTopo(), { clicavel: fase === 'escolha' }));
    slotComputador.appendChild(desenharCarta(jogo.computador.cartaDoTopo(), { oculta: true }));
  }

  renderizarCentro();
  renderizarColecao();
}

function renderizarCentro() {
  const centro = elemento('centro');

  if (fase === 'escolha') {
    centro.innerHTML = '<p class="centro-titulo">Sua vez!</p><p>Clique em um atributo da sua carta.</p>';
    return;
  }

  if (fase === 'vez-computador') {
    centro.innerHTML = '<p class="centro-titulo">Vez do computador</p><p>Ele vai escolher o melhor atributo da carta dele.</p>';
    const botao = document.createElement('button');
    botao.className = 'botao-principal';
    botao.textContent = 'Ver jogada';
    botao.addEventListener('click', jogadaDoComputador);
    centro.appendChild(botao);
    return;
  }

  if (fase === 'revelado') {
    const textos = {
      vitoria: '🎉 Você venceu a rodada!',
      derrota: '😬 O computador venceu a rodada',
      empate: '🤝 Empate! As cartas vão para o monte',
    };
    const nomeAtributo = NOMES_DOS_ATRIBUTOS[ultimaRodada.atributo];
    const quem = ultimaRodada.quemEscolheu === 'humano' ? 'Você escolheu' : 'O computador escolheu';
    centro.innerHTML =
      `<p class="centro-titulo resultado-${ultimaRodada.resultado}">${textos[ultimaRodada.resultado] || 'Resultado desconhecido'}</p>` +
      `<p>${quem} <strong>${nomeAtributo}</strong>: ` +
      `${ultimaRodada.minhaCarta.valorDe(ultimaRodada.atributo)} × ${ultimaRodada.cartaDoComputador.valorDe(ultimaRodada.atributo)}</p>`;
    const botao = document.createElement('button');
    botao.className = 'botao-principal';
    botao.textContent = jogo.acabou() ? 'Ver resultado final' : 'Próxima rodada';
    botao.addEventListener('click', proximaRodada);
    centro.appendChild(botao);
    return;
  }

  if (fase === 'fim') {
    const vencedor = jogo.vencedor();
    let titulo = `🏆 ${vencedor} venceu!`;
    if (vencedor === 'Empate') titulo = '🤝 Deu empate!';
    if (vencedor === jogo.computador.nome) titulo = '🤖 O computador venceu!';
    centro.innerHTML =
      `<p class="centro-titulo">${titulo}</p>` +
      `<p>${jogo.humano.nome}: ${jogo.humano.quantidadeDeCartas()} cartas · Computador: ${jogo.computador.quantidadeDeCartas()} cartas</p>`;
    const botao = document.createElement('button');
    botao.className = 'botao-principal';
    botao.textContent = 'Jogar de novo';
    botao.addEventListener('click', () => comecarPartida(jogo.humano.nome));
    centro.appendChild(botao);
  }
}

function renderizarColecao() {
  const humano = jogo.humano;
  const media = tentar(() => humano.forcaMedia(), null);
  const nomes = tentar(() => humano.nomesDasCartas(), null);

  let html = `<p class="colecao-linha"><span>Força média</span><strong>${
    typeof media === 'number' ? Math.round(media) : '<em>complete o TODO 9</em>'
  }</strong></p>`;

  html += '<div class="colecao-equipes">';
  for (const equipe of EQUIPES) {
    const cartas = tentar(() => humano.cartasDaEquipe(equipe), null);
    const quantidade = Array.isArray(cartas) ? cartas.length : '?';
    html += `<span class="selo-equipe" style="--cor-equipe:${CORES_DAS_EQUIPES[equipe]}">${equipe}: <strong>${quantidade}</strong></span>`;
  }
  html += '</div>';
  if (!Array.isArray(tentar(() => humano.cartasDaEquipe(EQUIPES[0]), null))) {
    html += '<p class="colecao-aviso">Complete o TODO 8 para ver quantas cartas de cada equipe você tem.</p>';
  }

  html += `<p class="colecao-nomes">${
    Array.isArray(nomes) ? nomes.join(' · ') : '<em>Complete o TODO 7 para ver os nomes das suas cartas.</em>'
  }</p>`;

  elemento('colecao').innerHTML = html;
}

function adicionarAoHistorico(registro) {
  const resumoMinha = tentar(() => registro.minhaCarta.resumo(), registro.minhaCarta.nome);
  const resumoComputador = tentar(() => registro.cartaDoComputador.resumo(), registro.cartaDoComputador.nome);
  const icones = { vitoria: '✅', derrota: '❌', empate: '🤝' };
  const li = document.createElement('li');
  li.innerHTML =
    `<span class="historico-rodada">R${registro.rodada} ${icones[registro.resultado] || ''} ${NOMES_DOS_ATRIBUTOS[registro.atributo]}</span>` +
    `<span>Você: ${resumoMinha}</span>` +
    `<span>PC: ${resumoComputador}</span>`;
  elemento('historico').prepend(li);
}

// ---------------- Ações ----------------

function comecarPartida(nome) {
  jogo = new Jogo(nome);
  jogo.iniciar();
  fase = 'escolha';
  elemento('historico').innerHTML = '';
  elemento('telaInicio').hidden = true;
  elemento('telaJogo').hidden = false;
  renderizar();
}

function escolherAtributo(atributo) {
  if (fase !== 'escolha') return;
  ultimaRodada = jogo.jogarRodada(atributo);
  adicionarAoHistorico(ultimaRodada);
  fase = 'revelado';
  renderizar();
}

function jogadaDoComputador() {
  if (fase !== 'vez-computador') return;
  ultimaRodada = jogo.jogarRodada(jogo.atributoDoComputador());
  adicionarAoHistorico(ultimaRodada);
  fase = 'revelado';
  renderizar();
}

function proximaRodada() {
  if (jogo.acabou()) {
    fase = 'fim';
  } else if (jogo.vez === 'humano') {
    fase = 'escolha';
  } else {
    fase = 'vez-computador';
  }
  renderizar();
}

// ---------------- Início ----------------

elemento('btnVerificacao').addEventListener('click', () => {
  elemento('painelTestes').hidden = !elemento('painelTestes').hidden;
});
elemento('btnFecharTestes').addEventListener('click', () => {
  elemento('painelTestes').hidden = true;
});
elemento('btnComecar').addEventListener('click', () => {
  const nome = elemento('nomeDupla').value.trim();
  comecarPartida(nome === '' ? 'Dupla' : nome);
});

if (classesCarregaram()) {
  const resultados = rodarTestes();
  mostrarVerificacao(resultados);
  verificarBloqueio(resultados);
} else {
  elemento('btnComecar').disabled = true;
}
