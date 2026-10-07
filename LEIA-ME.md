# Super Trunfo de Heróis — Projeto de POO

O jogo já está quase todo pronto: tela, estilo, cartas e regras. Falta a "inteligência" das classes, e essa parte é com vocês.

## Como abrir

1. Abram a pasta `aluno` no VS Code.
2. Abram o arquivo `index.html` no navegador (clique duplo, ou arraste para o Chrome).
3. Cliquem em **🧪 Verificação** no canto superior direito para ver o que falta.

## Onde vocês escrevem código

Só nestes 3 arquivos, dentro de `js/classes/`:

| Arquivo | TODOs |
|---|---|
| `Carta.js` | 1, 2, 3, 4 |
| `Jogador.js` | 5, 6, 7, 8, 9 |
| `Jogo.js` | 10, 11 |

Procurem por `// escreva seu código aqui`. Cada TODO explica o que fazer, dá um exemplo e diz qual semana tem o conteúdo.

Os arquivos da pasta `js/nao-mexer/` já estão prontos. Podem (e devem) ler, mas não precisam mudar nada.

## Como saber se deu certo

1. Salvem o arquivo (`Ctrl + S`).
2. Recarreguem a página (`F5`).
3. Abram a **Verificação**: cada TODO fica ✅ quando está funcionando, ou ❌ com a explicação do erro.

**A partida é liberada quando os TODOs 3, 5, 6, 10 e 11 estiverem ✅.** Os outros completam a tela: raridade, força total, coleção e histórico.

## Dicas

- Façam na ordem: 1, 2, 3... Um TODO às vezes usa o anterior.
- "Esperava 100, recebeu undefined": faltou o `return`.
- Apareceu uma faixa vermelha dizendo "Erro ao carregar"? Tem um erro de digitação. Apertem `F12`, abram a aba **Console** e vejam o número da linha.
- Dentro de um método, tudo que é do objeto começa com `this.` (ex: `this.forca`, `this.cartas`).
- Revezem o teclado: quem não está digitando confere o código e lê o próximo TODO.

## 🦸 Bônus: criem os seus próprios heróis

Terminaram os 11 TODOs e jogaram uma partida? Agora é hora de brincar!

1. Abram `js/bonus/meus-herois.js`.
2. Copiem o modelo de herói (tirem os `//`) e troquem pelos dados do seu herói.
3. Para colocar uma **foto**, salvem a imagem na pasta `imagens/` e escrevam `imagem: 'imagens/nome-do-arquivo.png'` (também funciona com o endereço de uma imagem da internet).
4. Salvem (`Ctrl + S`) e recarreguem (`F5`). Uma faixa azul na tela inicial confirma que seus heróis entraram no baralho; se algo estiver errado, ela avisa em amarelo.

Regras: criem heróis em número **par** (2, 4, 6...), com atributos de **0 a 100**. Equipe nova? É só escrever o nome dela: ela aparece sozinha na coleção.
