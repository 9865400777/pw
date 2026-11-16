let cartas = [];
let pontosJogador = 0;
let pontosComputador = 0;

async function carregarCartas() {
    try {
        const resposta = await fetch("./cartas.json");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar o JSON.");
        }

        cartas = await resposta.json();

        mostrarCartas();

        document.getElementById("resultado").textContent =
            "Escolha uma carta!";
    } catch (erro) {
        console.error(erro);

        document.getElementById("resultado").textContent =
            "Não foi possível carregar as cartas.";
    }
}

function mostrarCartas() {
    const areaCartas = document.getElementById("cartas");

    areaCartas.innerHTML = "";

    for (let i = 0; i < cartas.length; i++) {
        const botao = document.createElement("button");
        botao.className = "carta";

        // Criar imagem da carta
        const img = document.createElement("img");
        img.src = cartas[i].imagem;
        img.alt = cartas[i].nome;
        img.className = "imagem-carta";

        // Criar nome
        const nome = document.createElement("h3");
        nome.textContent = cartas[i].nome;

        // Criar força
        const forca = document.createElement("p");
        forca.textContent = "Força: " + cartas[i].forca;

        // Colocar tudo dentro da carta
        botao.appendChild(img);
        botao.appendChild(nome);
        botao.appendChild(forca);

        // Ação ao clicar na carta
        botao.addEventListener("click", function () {
            jogar(i);
        });

        // Adicionar carta à página
        areaCartas.appendChild(botao);
    }
}

function jogar(indice) {
    const cartaJogador = cartas[indice];

    const sorteio = Math.floor(Math.random() * cartas.length);
    const cartaComputador = cartas[sorteio];

    let mensagem =
        "Você: " + cartaJogador.nome +
        " (" + cartaJogador.forca + ").\n" +
        "Computador: " + cartaComputador.nome +
        " (" + cartaComputador.forca + ").\n\n";

    if (cartaJogador.forca > cartaComputador.forca) {
        pontosJogador++;
        mensagem += "Você venceu!";
    } else if (cartaJogador.forca < cartaComputador.forca) {
        pontosComputador++;
        mensagem += "O computador venceu!";
    } else {
        mensagem += "Empate!";
    }

    document.getElementById("resultado").textContent = mensagem;

    atualizarPlacar();
}

function atualizarPlacar() {
    document.getElementById("pontosJogador").textContent =
        pontosJogador;

    document.getElementById("pontosComputador").textContent =
        pontosComputador;
}

function reiniciarJogo() {
    pontosJogador = 0;
    pontosComputador = 0;

    atualizarPlacar();

    document.getElementById("resultado").textContent =
        "Escolha uma carta!";
}

document.getElementById("reiniciar").addEventListener(
    "click",
    reiniciarJogo
);

carregarCartas();