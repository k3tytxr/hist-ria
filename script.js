const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultados = document.querySelector(".texto-resultado");
const caixaStatus = document.querySelector("#status");
const caixaPontos = document.querySelector("#pontos");
const botaoContinuar = document.querySelector("#botao-continuar");

// JOGADOR

let jogador = {
    chute: 10,
    velocidade: 10,
    drible: 10,
    defesa: 10,
    visao: 10,
    ego: 10
};

let pontosDisponiveis = 5;
let partida = 1;
let perguntaAtual = 0;
let resultadoPendente = null;

// HISTÓRIA

const perguntas = [
    {
        enunciado: "Isagi está com a bola diante do gol. O que você faz?",
        alternativas: [
            {
                texto: "Chutar diretamente ao gol",
                atributo: "chute",
                chanceBase: 50
            },
            {
                texto: "Passar para um aliado",
                atributo: "visao",
                chanceBase: 50
            }
        ]
    },
    {
        enunciado: "Você chegou ao desafio do pega-pega! Quem vai perseguir?",
        alternativas: [
            {
                texto: "Perseguir o jogador mais forte",
                atributo: "velocidade",
                chanceBase: 45
            },
            {
                texto: "Perseguir o jogador mais fraco",
                atributo: "velocidade",
                chanceBase: 60
            }
        ]
    },
    {
        enunciado: "Você precisa escolher alguém para roubar na próxima seleção!",
        alternativas: [
            {
                texto: "Escolher Bachira",
                atributo: "drible",
                chanceBase: 55
            },
            {
                texto: "Escolher Kunigami",
                atributo: "chute",
                chanceBase: 55
            }
        ]
    },
    {
        enunciado: "Barou avança com a bola. Como você vai reagir?",
        alternativas: [
            {
                texto: "Fazer dois contra um na defesa",
                atributo: "defesa",
                chanceBase: 55
            },
            {
                texto: "Esperar no meio para o contra-ataque",
                atributo: "visao",
                chanceBase: 55
            }
        ]
    }
];

// MOSTRAR STATUS

function mostrarStatus() {
    caixaStatus.innerHTML = "";

    for (const atributo in jogador) {
        const linha = document.createElement("div");
        linha.className = "status-item";

        const nome = atributo.charAt(0).toUpperCase()
            + atributo.slice(1);

        linha.innerHTML = `
            <span>${nome}</span>
            <strong>${jogador[atributo]}</strong>
        `;

        caixaStatus.appendChild(linha);
    }

    caixaPontos.textContent =
        "Pontos disponíveis: " + pontosDisponiveis;
}

// PREPARAÇÃO

function mostrarPreparacao() {
    mostrarStatus();

    caixaPerguntas.textContent =
        "PARTIDA " + partida + " — PREPARAÇÃO";

    caixaResultados.textContent =
        "Distribua seus pontos antes de entrar em campo.";

    caixaAlternativas.innerHTML = "";

    for (const atributo in jogador) {
        const botao = document.createElement("button");

        const nome = atributo.charAt(0).toUpperCase()
            + atributo.slice(1);

        botao.textContent = nome + " (+1)";

        botao.disabled = pontosDisponiveis <= 0;

        botao.addEventListener("click", function() {
            if (pontosDisponiveis > 0) {
                jogador[atributo]++;
                pontosDisponiveis--;

                mostrarPreparacao();
            }
        });

        caixaAlternativas.appendChild(botao);
    }

    const iniciar = document.createElement("button");

    iniciar.textContent = "ENTRAR NA PARTIDA";

    iniciar.addEventListener("click", iniciarPartida);

    caixaAlternativas.appendChild(iniciar);

    botaoContinuar.style.display = "none";
}

// INICIAR PARTIDA

function iniciarPartida() {
    perguntaAtual = 0;
    mostrarPergunta();
}

// MOSTRAR PERGUNTAS

function mostrarPergunta() {
    mostrarStatus();

    const pergunta = perguntas[perguntaAtual];

    caixaPerguntas.textContent = pergunta.enunciado;
    caixaResultados.textContent = "";
    caixaAlternativas.innerHTML = "";

    botaoContinuar.style.display = "none";

    for (const alternativa of pergunta.alternativas) {
        const botao = document.createElement("button");

        botao.textContent = alternativa.texto;

        botao.addEventListener("click", function() {
            realizarJogada(alternativa);
        });

        caixaAlternativas.appendChild(botao);
    }
}

// DADO D100

function realizarJogada(alternativa) {
    const atributo = jogador[alternativa.atributo];

    let chance = alternativa.chanceBase + atributo;

    chance = Math.max(5, Math.min(95, chance));

    const dado = Math.floor(Math.random() * 100) + 1;

    let sucesso = dado <= chance;
    let mensagem;

    if (dado === 1) {
        sucesso = true;
        mensagem = "CRÍTICO POSITIVO!";
    } else if (dado === 100) {
        sucesso = false;
        mensagem = "FALHA CRÍTICA!";
    } else if (sucesso) {
        mensagem = "SUCESSO!";
    } else {
        mensagem = "FALHA!";
    }

    const botoes = caixaAlternativas.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    caixaResultados.innerHTML = `
        <h2>${mensagem}</h2>
        <p>🎲 Dado: <strong>${dado}</strong></p>
        <p>Chance de sucesso: <strong>${chance}%</strong></p>
        <p>Atributo: <strong>${alternativa.atributo}</strong></p>
    `;

    resultadoPendente = sucesso;

    botaoContinuar.style.display = "block";
    botaoContinuar.textContent = "CONTINUAR";
}

// CONTINUAR

botaoContinuar.addEventListener("click", function() {
    if (resultadoPendente === false) {
        eliminarJogador();
        return;
    }

    if (resultadoPendente === true) {
        perguntaAtual++;

        if (perguntaAtual >= perguntas.length) {
            vencerPartida();
        } else {
            mostrarPergunta();
        }
    }
});

// VITÓRIA

function vencerPartida() {
    partida++;
    pontosDisponiveis += 5;

    caixaPerguntas.textContent = "VOCÊ SOBREVIVEU!";

    caixaAlternativas.innerHTML = "";

    caixaResultados.innerHTML = `
        <h2>⚽ VITÓRIA!</h2>
        <p>Você conseguiu avançar no Blue Lock!</p>
        <p>O Ego concedeu 5 pontos de evolução.</p>
    `;

    botaoContinuar.style.display = "none";

    const botao = document.createElement("button");

    botao.textContent = "PRÓXIMA PARTIDA";

    botao.addEventListener("click", mostrarPreparacao);

    caixaAlternativas.appendChild(botao);

    mostrarStatus();
}

// ELIMINAÇÃO

function eliminarJogador() {
    caixaPerguntas.textContent = "FIM DE JOGO";

    caixaAlternativas.innerHTML = "";

    caixaResultados.innerHTML = `
        <h1>ELIMINADO!</h1>
        <p>Você caiu do Blue Lock.</p>
        <p>O Ego não perdoa os fracos.</p>
        <p>Você chegou até a partida ${partida}.</p>
    `;

    botaoContinuar.style.display = "none";

    const reiniciar = document.createElement("button");

    reiniciar.textContent = "TENTAR NOVAMENTE";

    reiniciar.addEventListener("click", reiniciarJogo);

    caixaAlternativas.appendChild(reiniciar);
}

// REINICIAR

function reiniciarJogo() {
    jogador = {
        chute: 10,
        velocidade: 10,
        drible: 10,
        defesa: 10,
        visao: 10,
        ego: 10
    };

    pontosDisponiveis = 5;
    partida = 1;
    perguntaAtual = 0;
    resultadoPendente = null;

    mostrarPreparacao();
}

// COMEÇAR

mostrarPreparacao();

