// ============================================================
//  CLASSE Baralho — pronta, não precisa mexer
//  Cria as cartas, embaralha e distribui entre os jogadores.
// ============================================================

class Baralho {
  constructor(dados) {
    // Transforma cada objeto literal de HEROIS em um objeto da classe Carta
    this.cartas = dados.map(heroi => new Carta(
      heroi.nome,
      heroi.equipe,
      heroi.emoji,
      heroi.forca,
      heroi.velocidade,
      heroi.inteligencia,
      heroi.poder,
      heroi.imagem
    ));
  }

  // Embaralha trocando cada carta de lugar com outra sorteada
  embaralhar() {
    for (let i = this.cartas.length - 1; i > 0; i--) {
      const sorteado = Math.floor(Math.random() * (i + 1));
      const guardada = this.cartas[i];
      this.cartas[i] = this.cartas[sorteado];
      this.cartas[sorteado] = guardada;
    }
  }

  // Metade das cartas para cada jogador
  distribuir(jogador1, jogador2) {
    const metade = this.cartas.length / 2;
    jogador1.receberCartas(this.cartas.slice(0, metade));
    jogador2.receberCartas(this.cartas.slice(metade));
  }
}
