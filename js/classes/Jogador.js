// ============================================================
//  CLASSE Jogador
//
//  Cada jogador tem um nome e uma pilha de cartas (um array).
//  Cada item do array this.cartas é um objeto da classe Carta,
//  então dá pra chamar os métodos dela: carta.forcaTotal(),
//  carta.nome, carta.equipe...
// ============================================================

class Jogador {
  constructor(nome) {
    this.nome = nome;
    this.cartas = [];
  }

  // Pronto: quantas cartas o jogador tem
  quantidadeDeCartas() {
    return this.cartas.length;
  }

  // Pronto: a carta de cima da pilha (a primeira do array)
  cartaDoTopo() {
    return this.cartas[0];
  }

  // Pronto: tira a carta de cima da pilha e devolve ela
  entregarCartaDoTopo() {
    return this.cartas.shift();
  }

  // ------------------------------------------------------------
  // TODO 5 — temCartas()
  // Retorne true se o jogador ainda tem pelo menos uma carta,
  // e false se o array this.cartas estiver vazio.
  //
  // Conteúdo: .length e operadores de comparação (Semanas 1 e 3)
  // ------------------------------------------------------------
  temCartas() {
    // escreva seu código aqui
  }

  // ------------------------------------------------------------
  // TODO 6 — receberCartas(lista)
  // Recebe um ARRAY de cartas e coloca cada uma delas no FINAL
  // da pilha do jogador (this.cartas). Não precisa retornar nada.
  //
  // Exemplo: pilha [A, B] + receberCartas([C, D]) → [A, B, C, D]
  // Conteúdo: for...of + push (Semana 3)
  // ------------------------------------------------------------
  receberCartas(lista) {
    // escreva seu código aqui
  }

  // ------------------------------------------------------------
  // TODO 7 — nomesDasCartas()
  // Retorne um array só com os NOMES das cartas do jogador.
  //
  // Exemplo: ['Faísca', 'Coruja', 'Brasa']
  // Conteúdo: map (Semana 4)
  // ------------------------------------------------------------
  nomesDasCartas() {
    // escreva seu código aqui
  }

  // ------------------------------------------------------------
  // TODO 8 — cartasDaEquipe(equipe)
  // Retorne um array só com as cartas do jogador cuja propriedade
  // equipe seja igual ao texto recebido.
  //
  // Exemplo: cartasDaEquipe('Liga da Maré') → [Tsunami, Coral]
  // Conteúdo: filter (Semana 4)
  // ------------------------------------------------------------
  cartasDaEquipe(equipe) {
    // escreva seu código aqui
  }

  // ------------------------------------------------------------
  // TODO 9 — forcaMedia()
  // Retorne a MÉDIA da força total das cartas do jogador.
  //   1. Se o jogador não tiver cartas, retorne 0.
  //   2. Some carta.forcaTotal() de todas as cartas com reduce.
  //   3. Divida a soma pela quantidade de cartas.
  //
  // Conteúdo: if + reduce (Semanas 2 e 4)
  // ------------------------------------------------------------
  forcaMedia() {
    // escreva seu código aqui
  }
}
