const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultados = document.querySelector(".caixa-resultados");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
    enunciado: "isagi jogando",
    alternativas: [
        { 
            texto: "ele chuta para o aliado do time",
            afirmacao: "afirmacao"
        },
        {
            texto: "ele chuta direto no gol",
            afirmacao: "afirmacao"
        }
        ]
    },
    {
    enunciado: "perde o jogo, chora, vai pra casa, recebe a carta, pega-pega",
    alternativas: [
        {
            texto: "chutar para o mais forte",
            afirmacao: "afirmacao"
        },
        {
            texto: "chutar para o mais fraco",
            afirmacao: "afirmacao"
        }
        ]
    },
    {
    enunciado: "elimina alguem, próxima etapa, dormitório e tals, enunciado da partida, jogando, isagi passa",
    alternativas: [
        {
            texto: "bachira",
            afirmacao: "afirmacao"
        },
        {
            texto: "kunigami",
            afirmacao: "afirmacao"
        }
        ]
    },
    {
    enunciado: "ego vendo, soa o apito e as posições, barou avança ",
    alternativas: [
        {
            texto: "dois contra um na defesa",
            afirmacao: "afirmacao"
        },
        {
            texto: "vai pra linha do meio esperando a bola para o contra-ataque",
            afirmacao: "afirmacao"
        }
        ]
    },
]
let atual = 0;
let perguntaAtual;

function mostraPergunta(){
    perguntaAtual = perguntas [atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
}

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa.texto 
    }
}

mostraPergunta();