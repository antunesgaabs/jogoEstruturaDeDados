// ============================================================
//  CLASSE Carta
//
//  Uma classe é uma "fôrma" para criar objetos.
//  Na Semana 4 vocês criaram objetos assim:
//
//     const produto = { nome: 'Tênis', preco: 249.90 };
//
//  Com uma classe, escrevemos a fôrma UMA vez e criamos quantos
//  objetos quisermos usando a palavra new:
//
//     const carta = new Carta('Faísca', 'Tropa Relâmpago', '⚡', 58, 99, 62, 84);
//     console.log(carta.nome);  // 'Faísca'
//
//  O constructor roda automaticamente quando usamos new.
//  Ele guarda os valores no objeto usando this — o mesmo this
//  que vocês usaram nos métodos de objetos na Semana 4.
// ============================================================

class Carta {
  // O último parâmetro (imagem) é opcional: só é usado no bônus final
  constructor(nome, equipe, emoji, forca, velocidade, inteligencia, poder, imagem) {
    this.nome = nome;
    this.equipe = equipe;
    this.emoji = emoji;
    this.forca = forca;
    this.velocidade = velocidade;
    this.inteligencia = inteligencia;
    this.poder = poder;
    this.imagem = imagem;
  }

  // ------------------------------------------------------------
  // TODO 1 — forcaTotal()
  // Retorne a SOMA dos 4 atributos da carta:
  // forca + velocidade + inteligencia + poder
  //
  // Dica: dentro do método, use this.forca, this.velocidade...
  // Exemplo: carta com 10, 20, 30 e 40 → retorna 100
  // Conteúdo: operadores aritméticos (Semana 1)
  // ------------------------------------------------------------
  forcaTotal() {
    // escreva seu código aqui
  }

  // ------------------------------------------------------------
  // TODO 2 — raridade()
  // Retorne a raridade da carta de acordo com a força total:
  //   300 ou mais      → 'Lendária'
  //   250 ou mais      → 'Rara'
  //   abaixo de 250    → 'Comum'
  //
  // Dica: chame o método do TODO 1 com this.forcaTotal()
  // Conteúdo: if / else if / else (Semana 2)
  // ------------------------------------------------------------
  raridade() {
    // escreva seu código aqui
  }

  // ------------------------------------------------------------
  // TODO 3 — valorDe(atributo)
  // Recebe o NOME de um atributo (texto) e retorna o valor dele.
  //   valorDe('forca')        → this.forca
  //   valorDe('velocidade')   → this.velocidade
  //   valorDe('inteligencia') → this.inteligencia
  //   valorDe('poder')        → this.poder
  //   qualquer outro texto    → 0
  //
  // Conteúdo: switch com default (Semana 2)
  // ------------------------------------------------------------
  valorDe(atributo) {
    // escreva seu código aqui
  }

  // ------------------------------------------------------------
  // TODO 4 — resumo()
  // Retorne um texto assim (use template literal):
  //   '⚡ Faísca (Tropa Relâmpago) — força total 303'
  //
  // Formato: emoji, nome, equipe entre parênteses e força total
  // Conteúdo: template literals com ${ } (Semana 4)
  // ------------------------------------------------------------
  resumo() {
    // escreva seu código aqui
  }
}
