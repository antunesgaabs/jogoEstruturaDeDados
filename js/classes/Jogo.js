// ============================================================
//  CLASSE Jogo
//
//  Controla a partida. Repare que um objeto Jogo GUARDA outros
//  objetos dentro dele: dois Jogadores e um Baralho. É assim que
//  a Programação Orientada a Objetos organiza um sistema — cada
//  classe cuida da sua parte e elas conversam entre si.
// ============================================================

class Jogo {
  constructor(nomeDoJogador) {
    this.humano = new Jogador(nomeDoJogador);
    this.computador = new Jogador('Computador');
    this.baralho = new Baralho(HEROIS);
    this.monte = [];            // cartas que ficam na mesa quando dá empate
    this.rodada = 1;
    this.limiteDeRodadas = 30;
    this.vez = 'humano';        // quem escolhe o atributo: 'humano' ou 'computador'
  }

  // Pronto: embaralha e distribui as cartas
  iniciar() {
    this.baralho.embaralhar();
    this.baralho.distribuir(this.humano, this.computador);
  }

  // ------------------------------------------------------------
  // TODO 10 — comparar(minhaCarta, cartaAdversaria, atributo)
  // Compare o valor do atributo escolhido nas duas cartas e retorne:
  //   'vitoria' → se o valor da minhaCarta for MAIOR
  //   'derrota' → se o valor da minhaCarta for MENOR
  //   'empate'  → se os valores forem iguais
  //
  // Dica: use o método do TODO 3 → minhaCarta.valorDe(atributo)
  // Conteúdo: if / else if / else (Semana 2)
  // ------------------------------------------------------------
  comparar(minhaCarta, cartaAdversaria, atributo) {
    // escreva seu código aqui
  }

  // ------------------------------------------------------------
  // TODO 11 — melhorAtributo(carta)
  // Esta é a "inteligência" do computador: descobrir qual é o
  // atributo com o MAIOR valor na carta e retornar o NOME dele.
  //
  // Exemplo: carta com forca 58, velocidade 99, inteligencia 62
  //          e poder 84 → retorna 'velocidade'
  //
  // Dica: percorra o array ATRIBUTOS (que já existe, em dados.js):
  //       ['forca', 'velocidade', 'inteligencia', 'poder']
  //       É o mesmo raciocínio do encontrarMaior() da Semana 3.
  //       Em caso de empate, fique com o primeiro que apareceu.
  // Conteúdo: for...of + if (Semana 3)
  // ------------------------------------------------------------
  melhorAtributo(carta) {
    // escreva seu código aqui
  }

  // ============================================================
  //  Daqui pra baixo está pronto — mas vale a pena ler!
  // ============================================================

  atributoDoComputador() {
    return this.melhorAtributo(this.computador.cartaDoTopo());
  }

  jogarRodada(atributo) {
    const quemEscolheu = this.vez;
    const minhaCarta = this.humano.entregarCartaDoTopo();
    const cartaDoComputador = this.computador.entregarCartaDoTopo();
    const resultado = this.comparar(minhaCarta, cartaDoComputador, atributo);
    const cartasNaMesa = [minhaCarta, cartaDoComputador].concat(this.monte);

    if (resultado === 'vitoria') {
      this.humano.receberCartas(cartasNaMesa);
      this.monte = [];
      this.vez = 'humano';
    } else if (resultado === 'derrota') {
      this.computador.receberCartas(cartasNaMesa);
      this.monte = [];
      this.vez = 'computador';
    } else {
      // empate: as cartas ficam no monte e vão para quem vencer a próxima
      this.monte = cartasNaMesa;
    }

    const registro = {
      rodada: this.rodada,
      atributo: atributo,
      quemEscolheu: quemEscolheu,
      minhaCarta: minhaCarta,
      cartaDoComputador: cartaDoComputador,
      resultado: resultado,
    };
    this.rodada++;
    return registro;
  }

  acabou() {
    return !this.humano.temCartas()
      || !this.computador.temCartas()
      || this.rodada > this.limiteDeRodadas;
  }

  vencedor() {
    const minhas = this.humano.quantidadeDeCartas();
    const doComputador = this.computador.quantidadeDeCartas();
    if (minhas > doComputador) return this.humano.nome;
    if (doComputador > minhas) return this.computador.nome;
    return 'Empate';
  }
}
