// ============================================================
//  VERIFICAÇÃO DOS TODOs — pronto, não precisa mexer
//  Cada teste cria objetos novos, chama o seu método e confere
//  se o resultado é o esperado.
// ============================================================

// TODOs sem os quais a partida não funciona
const TODOS_OBRIGATORIOS_PARA_JOGAR = [3, 5, 6, 10, 11];

function cartaDeTeste(nome = 'Teste', equipe = 'Equipe X', valores = [10, 20, 30, 40]) {
  return new Carta(nome, equipe, '🧪', valores[0], valores[1], valores[2], valores[3]);
}

function formatar(valor) {
  if (typeof valor === 'string') return `'${valor}'`;
  if (Array.isArray(valor)) return `[${valor.map(formatar).join(', ')}]`;
  return String(valor);
}

function verificar(recebido, esperado, descricao) {
  if (formatar(recebido) !== formatar(esperado)) {
    let mensagem = `${descricao}: esperava ${formatar(esperado)}, recebeu ${formatar(recebido)}`;
    if (recebido === undefined) mensagem += ' — faltou o return?';
    throw new Error(mensagem);
  }
}

const TESTES = [
  {
    todo: 1, titulo: 'forcaTotal()', arquivo: 'Carta.js',
    testar() {
      verificar(cartaDeTeste().forcaTotal(), 100, 'Carta (10, 20, 30, 40)');
      verificar(cartaDeTeste('B', 'X', [58, 99, 62, 84]).forcaTotal(), 303, 'Carta (58, 99, 62, 84)');
    },
  },
  {
    todo: 2, titulo: 'raridade()', arquivo: 'Carta.js',
    testar() {
      verificar(cartaDeTeste('A', 'X', [75, 75, 75, 75]).raridade(), 'Lendária', 'Força total 300');
      verificar(cartaDeTeste('B', 'X', [70, 60, 60, 60]).raridade(), 'Rara', 'Força total 250');
      verificar(cartaDeTeste('C', 'X', [69, 60, 60, 60]).raridade(), 'Comum', 'Força total 249');
    },
  },
  {
    todo: 3, titulo: 'valorDe(atributo)', arquivo: 'Carta.js',
    testar() {
      const carta = cartaDeTeste();
      verificar(carta.valorDe('forca'), 10, "valorDe('forca')");
      verificar(carta.valorDe('velocidade'), 20, "valorDe('velocidade')");
      verificar(carta.valorDe('inteligencia'), 30, "valorDe('inteligencia')");
      verificar(carta.valorDe('poder'), 40, "valorDe('poder')");
      verificar(carta.valorDe('altura'), 0, "valorDe('altura') (atributo que não existe)");
    },
  },
  {
    todo: 4, titulo: 'resumo()', arquivo: 'Carta.js',
    testar() {
      const texto = new Carta('Faísca', 'Tropa Relâmpago', '⚡', 58, 99, 62, 84).resumo();
      verificar(texto, '⚡ Faísca (Tropa Relâmpago) — força total 303', 'resumo() do Faísca');
    },
  },
  {
    todo: 5, titulo: 'temCartas()', arquivo: 'Jogador.js',
    testar() {
      const jogador = new Jogador('Teste');
      verificar(jogador.temCartas(), false, 'Jogador sem cartas');
      jogador.cartas.push(cartaDeTeste());
      verificar(jogador.temCartas(), true, 'Jogador com 1 carta');
    },
  },
  {
    todo: 6, titulo: 'receberCartas(lista)', arquivo: 'Jogador.js',
    testar() {
      const jogador = new Jogador('Teste');
      jogador.cartas.push(cartaDeTeste('A'));
      jogador.receberCartas([cartaDeTeste('B'), cartaDeTeste('C')]);
      verificar(jogador.cartas.length, 3, 'Quantidade de cartas depois de receber 2');
      verificar(jogador.cartas.map(c => c.nome), ['A', 'B', 'C'], 'Ordem das cartas na pilha');
    },
  },
  {
    todo: 7, titulo: 'nomesDasCartas()', arquivo: 'Jogador.js',
    testar() {
      const jogador = new Jogador('Teste');
      jogador.cartas.push(cartaDeTeste('Faísca'), cartaDeTeste('Coruja'));
      verificar(jogador.nomesDasCartas(), ['Faísca', 'Coruja'], 'Nomes das cartas');
    },
  },
  {
    todo: 8, titulo: 'cartasDaEquipe(equipe)', arquivo: 'Jogador.js',
    testar() {
      const jogador = new Jogador('Teste');
      jogador.cartas.push(
        cartaDeTeste('A', 'Liga da Maré'),
        cartaDeTeste('B', 'Tropa Relâmpago'),
        cartaDeTeste('C', 'Liga da Maré')
      );
      const resultado = jogador.cartasDaEquipe('Liga da Maré');
      const nomes = Array.isArray(resultado) ? resultado.map(c => c.nome) : resultado;
      verificar(nomes, ['A', 'C'], "Cartas da 'Liga da Maré'");
    },
  },
  {
    todo: 9, titulo: 'forcaMedia()', arquivo: 'Jogador.js',
    testar() {
      const jogador = new Jogador('Teste');
      verificar(jogador.forcaMedia(), 0, 'Jogador sem cartas');
      jogador.cartas.push(cartaDeTeste('A', 'X', [10, 20, 30, 40]), cartaDeTeste('B', 'X', [50, 50, 50, 50]));
      verificar(jogador.forcaMedia(), 150, 'Média entre 100 e 200');
    },
  },
  {
    todo: 10, titulo: 'comparar(minhaCarta, cartaAdversaria, atributo)', arquivo: 'Jogo.js',
    testar() {
      const jogo = new Jogo('Teste');
      const minha = cartaDeTeste('A', 'X', [80, 20, 50, 40]);
      const outra = cartaDeTeste('B', 'X', [60, 90, 50, 10]);
      verificar(jogo.comparar(minha, outra, 'forca'), 'vitoria', 'Força 80 contra 60');
      verificar(jogo.comparar(minha, outra, 'velocidade'), 'derrota', 'Velocidade 20 contra 90');
      verificar(jogo.comparar(minha, outra, 'inteligencia'), 'empate', 'Inteligência 50 contra 50');
    },
  },
  {
    todo: 11, titulo: 'melhorAtributo(carta)', arquivo: 'Jogo.js',
    testar() {
      const jogo = new Jogo('Teste');
      verificar(jogo.melhorAtributo(cartaDeTeste('A', 'X', [58, 99, 62, 84])), 'velocidade', 'Carta (58, 99, 62, 84)');
      verificar(jogo.melhorAtributo(cartaDeTeste('B', 'X', [10, 20, 30, 40])), 'poder', 'Carta (10, 20, 30, 40)');
      verificar(jogo.melhorAtributo(cartaDeTeste('C', 'X', [90, 10, 90, 10])), 'forca', 'Empate entre força e inteligência');
    },
  },
];

function rodarTestes() {
  return TESTES.map(teste => {
    try {
      teste.testar();
      return { todo: teste.todo, titulo: teste.titulo, arquivo: teste.arquivo, ok: true, mensagem: 'Funcionando!' };
    } catch (erro) {
      return { todo: teste.todo, titulo: teste.titulo, arquivo: teste.arquivo, ok: false, mensagem: erro.message };
    }
  });
}
