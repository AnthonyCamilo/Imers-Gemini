let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

// Função para carregar e exibir os dados iniciais
async function carregarDadosIniciais() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Renderiza todos os cards
    } catch (error) {
        console.error("Falha ao buscar dados iniciais:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Tente recarregar a página.</p>";
    }
}



async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao buscar dados:", error);
            return; // Interrompe a execução se houver erro
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca) ||
        dado.aplicacao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        // Cria listas de vantagens e desvantagens em HTML
        const vantagensHtml = dado.vantagens.map(item => `<li>${item}</li>`).join('');
        const desvantagensHtml = dado.desvantagens.map(item => `<li>${item}</li>`).join('');

        // Cria o botão de vídeo apenas se o link existir
        const videoButtonHtml = dado.link_video ? `<a href="${dado.link_video}" target="_blank" class="video-link-btn">Assistir Vídeo</a>` : '';

        let article = document.createElement("article");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Descrição:</strong> ${dado.descricao}</p>
            <p><strong>Aplicação:</strong> ${dado.aplicacao}</p>
            <p><strong>Vantagens:</strong></p>
            <ul>${vantagensHtml}</ul>
            <p><strong>Desvantagens:</strong></p>
            <ul>${desvantagensHtml}</ul>
            ${videoButtonHtml}
        `;
        cardContainer.appendChild(article);
    }
}

// Chama a função para carregar os dados assim que o script for lido
carregarDadosIniciais();