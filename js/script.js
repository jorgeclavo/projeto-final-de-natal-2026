/* ==========================================================================
   KROMA STORE - SCRIPT PRINCIPAL (AV2 DESENVOLVIMENTO WEB)
   Recursos implementados:
   1. Slideshow automático com botões e indicadores (Obrigatório)
   2. Efeito Parallax na rolagem (Obrigatório)
   3. Controle de Música Natalina e Efeito Sonoro de Sino (Obrigatório)
   4. Geração Dinâmica de Cards - Catálogo e Destaques (Obrigatório)
   5. Filtro por Categoria e Busca em Tempo Real (Obrigatório)
   6. Carrinho de Compras com localStorage e Remoção de Itens (Extra 1)
   7. Contagem Regressiva para o Natal (Extra 2)
   8. Validação do Formulário de Contato (Extra 3)
   9. Menu Responsivo Hambúrguer (Extra 4)
   10. Animação ao Rolar com IntersectionObserver (Extra 5)
   11. Botão Voltar ao Topo (Extra 6)
   12. Modal / Lightbox de Detalhes do Produto (Extra 7 - Novo)
   13. Efeito de Neve Natalina Gerado por JS (Extra 8 - Novo)
   ========================================================================== */

// Garante acesso seguro ao array 'produtos' vindo de js/produtos.js
const catalogoProdutos = typeof produtos !== "undefined" ? produtos : [];

// ==========================================================================
// ESTILOS AUXILIARES INJETADOS VIA JS (GARANTE FUNCIONAMENTO DO MODAL E SLIDES)
// ==========================================================================
function injetarEstilosAuxiliares() {
    const style = document.createElement("style");
    style.textContent = `
        /* Garantia de exibição do Slideshow */
        .slideshow { position: relative; }
        .slide { display: none; }
        .slide.ativo { display: block; animation: fadeSlide 0.6s ease; }
        @keyframes fadeSlide { from { opacity: 0.3; } to { opacity: 1; } }
        .indicadores-slide {
            display: flex; justify-content: center; gap: 8px; margin-top: 12px;
        }
        .indicador-dot {
            width: 12px; height: 12px; border-radius: 50%; border: none;
            background: rgba(255,255,255,0.4); cursor: pointer; transition: 0.3s;
        }
        .indicador-dot.ativo { background: #C9A227; transform: scale(1.2); }

        /* Garantia de exibição das seções .revelar */
        .revelar { opacity: 0; transform: translateY(25px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .revelar.visivel { opacity: 1; transform: translateY(0); }

        /* Botão remover item no carrinho */
        .btn-remover-item {
            background: #B3202A; color: #fff; border: none; border-radius: 4px;
            padding: 2px 7px; margin-left: 8px; cursor: pointer; font-size: 0.8rem;
        }
        .btn-remover-item:hover { opacity: 0.85; }

        /* Modal / Lightbox de Detalhes do Produto */
        .modal-kroma-overlay {
            position: fixed; inset: 0; background: rgba(0, 0, 0, 0.78);
            display: none; align-items: center; justify-content: center;
            z-index: 9999; padding: 20px;
        }
        .modal-kroma-overlay.aberto { display: flex; }
        .modal-kroma-box {
            background: #FBF6EA; color: #12263F; max-width: 720px; width: 100%;
            border-radius: 14px; padding: 24px; position: relative;
            display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px; align-items: center; box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }
        .modal-kroma-box img {
            width: 100%; border-radius: 10px; background: #fff; object-fit: contain;
        }
        .modal-kroma-fechar {
            position: absolute; top: 12px; right: 14px; background: #B3202A;
            color: #fff; border: none; width: 32px; height: 32px; border-radius: 50%;
            font-size: 1rem; cursor: pointer;
        }
        .modal-kroma-categoria {
            display: inline-block; background: #1F5D3A; color: #fff;
            padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; margin-bottom: 8px;
        }
        .modal-kroma-preco {
            font-size: 1.4rem; font-weight: 700; color: #B3202A; margin: 12px 0;
        }

        /* Flocos de Neve Natalinos */
        .floco-neve-js {
            position: fixed; top: -20px; color: #ffffff; user-select: none;
            pointer-events: none; z-index: 9990; opacity: 0.8;
            animation: cairNeve linear forwards;
        }
        @keyframes cairNeve {
            to { transform: translateY(105vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// UTILITÁRIO: FORMATAÇÃO DE MOEDA (R$)
// ==========================================================================
function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ==========================================================================
// RECURSO 3 (OBRIGATÓRIO): MÚSICA DE FUNDO NATALINA
// ==========================================================================
const musicaNatal = new Audio("audio/tape-echo-christmas-winter-days_29sec-596030.mp3");
musicaNatal.loop = true;
musicaNatal.volume = 0.25; // Volume suave conforme regra do manual

function iniciarControleAudio() {
    const btnMusica = document.getElementById("btn-musica");
    if (!btnMusica) return;

    btnMusica.addEventListener("click", () => {
        if (musicaNatal.paused) {
            musicaNatal.play()
                .then(() => {
                    btnMusica.textContent = "⏸️ Pausar Música";
                })
                .catch((erro) => {
                    console.error("Erro ao carregar áudio:", erro);
                    btnMusica.textContent = "🔇 Áudio indisponível";
                });
        } else {
            musicaNatal.pause();
            btnMusica.textContent = "🔊 Tocar Música";
        }
    });
}

// ==========================================================================
// RECURSO 1 (OBRIGATÓRIO): SLIDESHOW COM BOTÕES E INDICADORES
// ==========================================================================
function iniciarSlideshow() {
    const slides = document.querySelectorAll(".slide");
    const btnAnterior = document.getElementById("anterior");
    const btnProximo = document.getElementById("proximo");
    const containerSlideshow = document.querySelector(".slideshow");

    if (!slides.length || !containerSlideshow) return;

    let slideAtual = 0;

    // Cria os indicadores (bolinhas) dinamicamente
    const barraIndicadores = document.createElement("div");
    barraIndicadores.className = "indicadores-slide";

    slides.forEach((_, indice) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = indice === 0 ? "indicador-dot ativo" : "indicador-dot";
        dot.setAttribute("aria-label", `Ir para slide ${indice + 1}`);
        dot.addEventListener("click", () => mostrarSlide(indice));
        barraIndicadores.appendChild(dot);
    });
    containerSlideshow.appendChild(barraIndicadores);

    const dots = barraIndicadores.querySelectorAll(".indicador-dot");

    function mostrarSlide(indice) {
        slides.forEach((s) => s.classList.remove("ativo"));
        dots.forEach((d) => d.classList.remove("ativo"));

        slideAtual = (indice + slides.length) % slides.length;
        slides[slideAtual].classList.add("ativo");
        if (dots[slideAtual]) dots[slideAtual].classList.add("ativo");
    }

    if (btnProximo) btnProximo.addEventListener("click", () => mostrarSlide(slideAtual + 1));
    if (btnAnterior) btnAnterior.addEventListener("click", () => mostrarSlide(slideAtual - 1));

    // Troca automática a cada 5 segundos
    setInterval(() => mostrarSlide(slideAtual + 1), 5000);
}

// ==========================================================================
// RECURSO 2 (OBRIGATÓRIO): PARALLAX EM JAVASCRIPT
// ==========================================================================
function iniciarParallax() {
    const camadas = document.querySelectorAll("[data-velocidade]");
    if (!camadas.length) return;

    let aguardandoFrame = false;

    window.addEventListener("scroll", () => {
        if (!aguardandoFrame) {
            window.requestAnimationFrame(() => {
                const rolagem = window.scrollY;
                camadas.forEach((camada) => {
                    const velocidade = parseFloat(camada.dataset.velocidade) || 0.2;
                    camada.style.transform = `translateY(${rolagem * velocidade}px)`;
                });
                aguardandoFrame = false;
            });
            aguardandoFrame = true;
        }
    });
}

// ==========================================================================
// RECURSO 6 (EXTRA): CARRINHO DE COMPRAS COM LOCALSTORAGE E REMOÇÃO
// ==========================================================================
let carrinho = JSON.parse(localStorage.getItem("kroma_carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("kroma_carrinho", JSON.stringify(carrinho));
}

function atualizarCarrinhoUI() {
    const qtdCarrinho = document.getElementById("qtd-carrinho");
    const qtdCarrinhoBotao = document.getElementById("qtd-carrinho-botao");
    const totalCarrinho = document.getElementById("total-carrinho");
    const totalCarrinhoPanel = document.getElementById("total-carrinho-panel");
    const listaCarrinho = document.getElementById("lista-carrinho");

    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    const totalValor = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

    if (qtdCarrinho) qtdCarrinho.textContent = totalItens;
    if (qtdCarrinhoBotao) qtdCarrinhoBotao.textContent = totalItens;
    if (totalCarrinho) totalCarrinho.textContent = formatarPreco(totalValor);
    if (totalCarrinhoPanel) totalCarrinhoPanel.textContent = formatarPreco(totalValor);

    if (!listaCarrinho) return;

    if (!carrinho.length) {
        listaCarrinho.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio.</li>';
        return;
    }

    listaCarrinho.innerHTML = carrinho
        .map((item, index) => `
            <li>
                <span>${item.nome} <strong>(x${item.quantidade})</strong></span>
                <div>
                    <strong>${formatarPreco(item.preco * item.quantidade)}</strong>
                    <button type="button" class="btn-remover-item" data-index="${index}" aria-label="Remover item">✕</button>
                </div>
            </li>
        `)
        .join("");
}

function adicionarAoCarrinho(nome, preco) {
    const existente = carrinho.find((item) => item.nome === nome);
    if (existente) {
        existente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco: Number(preco), quantidade: 1 });
    }

    salvarCarrinho();
    atualizarCarrinhoUI();
    tocarSinoNatal();

    const painelCarrinho = document.getElementById("carrinho-panel");
    const btnCarrinho = document.getElementById("btn-carrinho");
    if (painelCarrinho) painelCarrinho.classList.add("ativo");
    if (btnCarrinho) btnCarrinho.setAttribute("aria-expanded", "true");
}

function removerDoCarrinho(index) {
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade -= 1;
    } else {
        carrinho.splice(index, 1);
    }
    salvarCarrinho();
    atualizarCarrinhoUI();
}

function iniciarEventosCarrinho() {
    const btnCarrinho = document.getElementById("btn-carrinho");
    const painelCarrinho = document.getElementById("carrinho-panel");
    const btnFecharCarrinho = document.getElementById("fechar-carrinho");
    const listaCarrinho = document.getElementById("lista-carrinho");

    if (btnCarrinho && painelCarrinho) {
        btnCarrinho.addEventListener("click", () => {
            const aberto = painelCarrinho.classList.toggle("ativo");
            btnCarrinho.setAttribute("aria-expanded", String(aberto));
        });
    }

    if (btnFecharCarrinho && painelCarrinho) {
        btnFecharCarrinho.addEventListener("click", () => {
            painelCarrinho.classList.remove("ativo");
            if (btnCarrinho) btnCarrinho.setAttribute("aria-expanded", "false");
        });
    }

    if (listaCarrinho) {
        listaCarrinho.addEventListener("click", (event) => {
            const btnRemover = event.target.closest(".btn-remover-item");
            if (btnRemover) {
                removerDoCarrinho(Number(btnRemover.dataset.index));
            }
        });
    }
}

// ==========================================================================
// RECURSO 4 E 5 (OBRIGATÓRIOS): CARDS DINÂMICOS, FILTRO E BUSCA
// ==========================================================================
function gerarCardProduto(produto) {
    return `
        <article class="produto-card" data-produto-nome="${produto.nome}">
            <img src="${encodeURI(produto.imagem)}" alt="${produto.nome}" loading="lazy" class="gatilho-modal" style="cursor:pointer;">
            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria}</span>
                <h3 class="gatilho-modal" style="cursor:pointer;">${produto.nome}</h3>
                <p class="produto-descricao">${produto.descricao}</p>
                <p class="produto-valor">${formatarPreco(produto.preco)}</p>
                <div class="produto-acoes">
                    <button class="btn-comprar" type="button" data-nome="${produto.nome}" data-preco="${produto.preco}">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderizarDestaquesHome() {
    const areaDestaques = document.getElementById("produtos-destaque");
    if (!areaDestaques || !catalogoProdutos.length) return;

    // Filtra itens marcados com destaque: true (ou pega os 4 primeiros como fallback)
    let destaques = catalogoProdutos.filter((p) => p.destaque === true);
    if (!destaques.length) destaques = catalogoProdutos.slice(0, 4);

    areaDestaques.innerHTML = destaques.map(gerarCardProduto).join("");

    areaDestaques.addEventListener("click", (event) => {
        const botao = event.target.closest(".btn-comprar");
        if (botao) {
            adicionarAoCarrinho(botao.dataset.nome, botao.dataset.preco);
            return;
        }
        const gatilho = event.target.closest(".gatilho-modal");
        if (gatilho) {
            const card = gatilho.closest(".produto-card");
            const prod = catalogoProdutos.find((p) => p.nome === card.dataset.produtoNome);
            if (prod) abrirModalProduto(prod);
        }
    });
}

function iniciarCatalogoProdutos() {
    const listaProdutos = document.getElementById("lista-produtos");
    if (!listaProdutos) return;

    const buscaInput = document.getElementById("busca");
    const categoriaSelect = document.getElementById("categoria");
    const contadorProdutos = document.getElementById("contador");

    function renderizar() {
        const termoBusca = buscaInput ? buscaInput.value.trim().toLowerCase() : "";
        const categoriaAtual = categoriaSelect ? categoriaSelect.value : "todas";

        const categoriasUnicas = [...new Set(catalogoProdutos.map((p) => p.categoria))];

        const gruposFiltrados = categoriasUnicas
            .map((categoria) => {
                const itens = catalogoProdutos.filter((produto) => {
                    const bateCategoria = categoriaAtual === "todas" || produto.categoria === categoriaAtual;
                    const bateBusca =
                        !termoBusca ||
                        produto.nome.toLowerCase().includes(termoBusca) ||
                        produto.descricao.toLowerCase().includes(termoBusca);
                    return bateCategoria && bateBusca && produto.categoria === categoria;
                });
                return { categoria, itens };
            })
            .filter((grupo) => grupo.itens.length > 0);

        if (!gruposFiltrados.length) {
            listaProdutos.innerHTML = '<p class="contador-produtos">🎄 Nenhum produto encontrado para os filtros selecionados.</p>';
            if (contadorProdutos) contadorProdutos.textContent = `Mostrando 0 de ${catalogoProdutos.length} produtos`;
            return;
        }

        listaProdutos.innerHTML = gruposFiltrados
            .map((grupo) => `
                <div class="categoria-grupo">
                    <h2>${grupo.categoria}</h2>
                    <div class="grade-catalogo">
                        ${grupo.itens.map(gerarCardProduto).join("")}
                    </div>
                </div>
            `)
            .join("");

        const totalExibido = gruposFiltrados.reduce((soma, g) => soma + g.itens.length, 0);
        if (contadorProdutos) {
            contadorProdutos.textContent = `Mostrando ${totalExibido} de ${catalogoProdutos.length} produtos`;
        }
    }

    // Delegação de eventos para Comprar e Abrir Modal
    listaProdutos.addEventListener("click", (event) => {
        const botao = event.target.closest(".btn-comprar");
        if (botao) {
            adicionarAoCarrinho(botao.dataset.nome, botao.dataset.preco);
            return;
        }

        const gatilho = event.target.closest(".gatilho-modal");
        if (gatilho) {
            const card = gatilho.closest(".produto-card");
            const prod = catalogoProdutos.find((p) => p.nome === card.dataset.produtoNome);
            if (prod) abrirModalProduto(prod);
        }
    });

    if (buscaInput) buscaInput.addEventListener("input", renderizar);
    if (categoriaSelect) categoriaSelect.addEventListener("change", renderizar);

    renderizar();
}

// ==========================================================================
// RECURSO 12 (NOVO - EXTRA 7): MODAL / LIGHTBOX DE DETALHES DO PRODUTO
// ==========================================================================
let modalOverlay = null;

function criarEstruturaModal() {
    modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-kroma-overlay";
    modalOverlay.innerHTML = `
        <div class="modal-kroma-box" role="dialog" aria-modal="true">
            <button type="button" class="modal-kroma-fechar" aria-label="Fechar detalhes">✕</button>
            <img id="modal-img" src="" alt="">
            <div>
                <span id="modal-cat" class="modal-kroma-categoria"></span>
                <h2 id="modal-titulo"></h2>
                <p id="modal-desc"></p>
                <p id="modal-preco" class="modal-kroma-preco"></p>
                <button type="button" id="modal-btn-comprar" class="btn-comprar">Adicionar ao carrinho</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    modalOverlay.querySelector(".modal-kroma-fechar").addEventListener("click", fecharModalProduto);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) fecharModalProduto();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") fecharModalProduto();
    });
}

function abrirModalProduto(produto) {
    if (!modalOverlay) criarEstruturaModal();

    modalOverlay.querySelector("#modal-img").src = encodeURI(produto.imagem);
    modalOverlay.querySelector("#modal-img").alt = produto.nome;
    modalOverlay.querySelector("#modal-cat").textContent = produto.categoria;
    modalOverlay.querySelector("#modal-titulo").textContent = produto.nome;
    modalOverlay.querySelector("#modal-desc").textContent = produto.descricao;
    modalOverlay.querySelector("#modal-preco").textContent = formatarPreco(produto.preco);

    const btnComprarModal = modalOverlay.querySelector("#modal-btn-comprar");
    btnComprarModal.onclick = () => {
        adicionarAoCarrinho(produto.nome, produto.preco);
        fecharModalProduto();
    };

    modalOverlay.classList.add("aberto");
}

function fecharModalProduto() {
    if (modalOverlay) modalOverlay.classList.remove("aberto");
}

// ==========================================================================
// RECURSO 7 (EXTRA 2): CONTAGEM REGRESSIVA PARA O NATAL (SOBRE E OFERTAS)
// ==========================================================================
function iniciarContagemNatal() {
    const elSobre = document.getElementById("contagem");
    const elOfertas = document.getElementById("contagem-ofertas");
    if (!elSobre && !elOfertas) return;

    function atualizar() {
        const agora = new Date();
        let natal = new Date(agora.getFullYear(), 11, 25, 0, 0, 0); // Mês 11 = Dezembro
        if (agora > natal) {
            natal = new Date(agora.getFullYear() + 1, 11, 25, 0, 0, 0);
        }

        const diferenca = natal - agora;
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
        const segundos = Math.floor((diferenca / 1000) % 60);

        const texto = `🎄 Faltam ${dias}d ${horas}h ${minutos}min ${segundos}s para o Natal!`;
        if (elSobre) elSobre.textContent = texto;
        if (elOfertas) elOfertas.textContent = texto;
    }

    atualizar();
    setInterval(atualizar, 1000);
}

// ==========================================================================
// RECURSO 8 (EXTRA 3): VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ==========================================================================
function iniciarValidacaoFormulario() {
    const form = document.getElementById("form-contato");
    const caixaMensagem = document.getElementById("mensagem-form");
    if (!form || !caixaMensagem) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const assunto = document.getElementById("assunto").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        caixaMensagem.style.marginTop = "15px";
        caixaMensagem.style.padding = "12px";
        caixaMensagem.style.borderRadius = "8px";

        if (nome.length < 3) {
            caixaMensagem.style.background = "#fde8e8";
            caixaMensagem.style.color = "#B3202A";
            caixaMensagem.textContent = "⚠️ Por favor, digite seu nome completo (mínimo 3 letras).";
        } else if (!emailValido) {
            caixaMensagem.style.background = "#fde8e8";
            caixaMensagem.style.color = "#B3202A";
            caixaMensagem.textContent = "⚠️ Digite um e-mail válido (ex: nome@exemplo.com).";
        } else if (!assunto) {
            caixaMensagem.style.background = "#fde8e8";
            caixaMensagem.style.color = "#B3202A";
            caixaMensagem.textContent = "⚠️ Informe o assunto da sua mensagem.";
        } else if (mensagem.length < 10) {
            caixaMensagem.style.background = "#fde8e8";
            caixaMensagem.style.color = "#B3202A";
            caixaMensagem.textContent = "⚠️ Escreva uma mensagem com pelo menos 10 caracteres.";
        } else {
            caixaMensagem.style.background = "#e6f4ea";
            caixaMensagem.style.color = "#1F5D3A";
            caixaMensagem.textContent = `✅ Obrigado, ${nome}! Sua mensagem sobre "${assunto}" foi enviada com sucesso.`;
            form.reset();
        }
    });
}

// ==========================================================================
// RECURSOS 9, 10 E 11 (EXTRAS 4, 5 E 6): MENU, ANIMAÇÃO AO ROLAR E TOPO
// ==========================================================================
function iniciarNavegacaoEAnimacoes() {
    // Menu hambúrguer
    const btnMenu = document.querySelector(".btn-menu");
    const menu = document.querySelector(".nav-links");
    if (btnMenu && menu) {
        btnMenu.addEventListener("click", () => menu.classList.toggle("aberto"));
    }

    // Animação ao rolar (.revelar)
    const elementosRevelar = document.querySelectorAll(".revelar");
    if (elementosRevelar.length) {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                }
            });
        }, { threshold: 0.1 });

        elementosRevelar.forEach((el) => observador.observe(el));
    }

    // Botão Voltar ao Topo
    const btnTopo = document.getElementById("topo");
    if (btnTopo) {
        btnTopo.style.display = "none";
        window.addEventListener("scroll", () => {
            btnTopo.style.display = window.scrollY > 400 ? "block" : "none";
        });
        btnTopo.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

// ==========================================================================
// RECURSO 13 (NOVO - EXTRA 8): EFEITO DE NEVE NATALINA DINÂMICA
// ==========================================================================
function iniciarNeveNatalina() {
    setInterval(() => {
        if (document.hidden) return; // Economiza processamento se a aba estiver oculta

        const floco = document.createElement("span");
        floco.className = "floco-neve-js";
        floco.textContent = "❄";
        floco.style.left = `${Math.random() * 100}vw`;
        floco.style.fontSize = `${Math.random() * 10 + 10}px`;

        const duracao = Math.random() * 5 + 6; // Entre 6s e 11s
        floco.style.animationDuration = `${duracao}s`;

        document.body.appendChild(floco);
        setTimeout(() => floco.remove(), duracao * 1000);
    }, 900);
}

// ==========================================================================
// INICIALIZAÇÃO GERAL AO CARREGAR A PÁGINA
// ==========================================================================
window.addEventListener("DOMContentLoaded", () => {
    injetarEstilosAuxiliares();
    iniciarControleAudio();
    iniciarSlideshow();
    iniciarParallax();
    atualizarCarrinhoUI();
    iniciarEventosCarrinho();
    renderizarDestaquesHome();
    iniciarCatalogoProdutos();
    iniciarContagemNatal();
    iniciarValidacaoFormulario();
    iniciarNavegacaoEAnimacoes();
    iniciarNeveNatalina();
});