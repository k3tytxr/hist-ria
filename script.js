const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultados = document.querySelector(".caixa-resultados");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
    enunciado: "isagi jogando",
    alternativas: [
        "ele chuta para o aliado do time",
        "ele chuta direto no gol"
        ]
    },
    {
    enunciado: "perde o jogo, chora, vai pra casa, recebe a carta",
    alternativas: [
        "bla bla bla",
         "Alternativa 2",
        ]
    },
    {
    enunciado: "Pergunta 1",
    alternativas: [
        "Alternativa 1",
        "Alternativa 2",
        ]
    },
    {
    enunciado: "Pergunta 1",
    alternativas: [
        "Alternativa 1",
        "Alternativa 2",
        ]
    },
    {
    enunciado: "Pergunta 1",
    alternativas: [
        "Alternativa 1",
        "Alternativa 2",
        ]
    },
]
let atual = 0
let perguntaAtual;

function mostraPergunta(){
    perguntaAtual = perguntas [atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
}

mostraPergunta();