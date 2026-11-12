/* ==========================================================
   KROMA STORE | js/script.js
   Todos os recursos de JavaScript do site.
   Precisa do js/produtos.js carregado ANTES (ele cria o array "produtos").

   Cada recurso só roda se os elementos dele existirem na página,
   então o mesmo arquivo serve para as 5 páginas sem dar erro.

   RECURSOS
    1. Menu hambúrguer ........... todas as páginas
    2. Voltar ao topo ............ todas as páginas
    3. Parallax .................. Início
    4. Slideshow ................. Início
    5. Produtos em destaque ...... Início
    6. Sons (música + sino) ...... todas as páginas
    7. Contagem regressiva ....... Sobre e Ofertas
    8. Catálogo, filtro e busca .. Produtos
    9. Carrinho (localStorage) ... Produtos
   10. Validação do formulário ... Contato
   ========================================================== */


/* ==========================================================
   FUNÇÕES AUXILIARES
   ========================================================== */
const porId = (id) => document.getElementById(id);

const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatarPreco(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// lê/grava no localStorage sem quebrar se o navegador bloquear
function lerStorage(chave, padrao) {
    try {
        const valor = localStorage.getItem(chave);
        return valor === null ? padrao : JSON.parse(valor);
    } catch (erro) {
        return padrao;
    }
}

function gravarStorage(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) { /* sem storage: segue sem salvar */ }
}


/* ==========================================================
   1. MENU HAMBÚRGUER (celular)
   Liga/desliga a classe "aberto" no menu.
   ========================================================== */
function iniciarMenu() {
    const botao = document.querySelector('.btn-menu');
    const menu = document.querySelector('.nav-links');
    if (!botao || !menu) return;

    botao.addEventListener('click', () => {
        const aberto = menu.classList.toggle('aberto');
        botao.setAttribute('aria-expanded', String(aberto));
    });
}


/* ==========================================================
   2. BOTÃO VOLTAR AO TOPO
   Só aparece depois de rolar 400px.
   ========================================================== */
function iniciarTopo() {
    const botao = porId('topo');
    if (!botao) return;

    const atualizar = () => {
        botao.style.display = window.scrollY > 400 ? 'block' : 'none';
    };

    window.addEventListener('scroll', atualizar, { passive: true });
    botao.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    atualizar();
}


/* ==========================================================
   3. PARALLAX
   Elementos com data-velocidade se movem uma fração da rolagem.
   Velocidades diferentes criam sensação de profundidade.
   ========================================================== */
function iniciarParallax() {
    const camadas = document.querySelectorAll('[data-velocidade]');
    if (!camadas.length || reduzirMovimento) return;

    let aguardando = false;

    const mover = () => {
        const rolagem = window.scrollY;
        camadas.forEach((camada) => {
            const velocidade = Number(camada.dataset.velocidade);
            camada.style.transform = `translateY(${rolagem * velocidade}px)`;
        });
        aguardando = false;
    };

    window.addEventListener('scroll', () => {
        if (!aguardando) {
            window.requestAnimationFrame(mover);
            aguardando = true;
        }
    }, { passive: true });
}


/* ==========================================================
   4. SLIDESHOW / CARROSSEL
   Troca sozinho a cada 5s, com setas e bolinhas indicadoras.
   ========================================================== */
function iniciarSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const area = document.querySelector('.slideshow');
    if (!slides.length || !area) return;

    let atual = 0;
    let temporizador = null;

    // bolinhas indicadoras (criadas com um laço)
    const indicadores = document.createElement('div');
    indicadores.className = 'slide-indicadores';
    const pontos = [];

    slides.forEach((slide, i) => {
        const ponto = document.createElement('button');
        ponto.type = 'button';
        ponto.className = 'ponto';
        ponto.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
        ponto.addEventListener('click', () => { mostrarSlide(i); reiniciar(); });
        indicadores.appendChild(ponto);
        pontos.push(ponto);
    });
    area.appendChild(indicadores);

    function mostrarSlide(indice) {
        slides.forEach((s) => s.classList.remove('ativo'));
        pontos.forEach((p) => p.classList.remove('ativo'));
        atual = (indice + slides.length) % slides.length; // volta ao início/fim
        slides[atual].classList.add('ativo');
        pontos[atual].classList.add('ativo');
    }

    function reiniciar() {
        clearInterval(temporizador);
        if (!reduzirMovimento) temporizador = setInterval(() => mostrarSlide(atual + 1), 5000);
    }

    const proximo = porId('proximo');
    const anterior = porId('anterior');
    if (proximo) proximo.addEventListener('click', () => { mostrarSlide(atual + 1); reiniciar(); });
    if (anterior) anterior.addEventListener('click', () => { mostrarSlide(atual - 1); reiniciar(); });

    mostrarSlide(0);
    reiniciar();
}


/* ==========================================================
   5. PRODUTOS EM DESTAQUE (Início)
   Mostra os produtos com destaque: true no js/produtos.js.
   ========================================================== */
function iniciarDestaques() {
    const area = porId('produtos-destaque');
    if (!area || typeof produtos === 'undefined') return;

    const destaques = produtos.filter((produto) => produto.destaque);

    if (!destaques.length) {
        area.innerHTML = '<p>Em breve novos lançamentos.</p>';
        return;
    }

    area.innerHTML = destaques.map((produto) => `
        <article class="card-destaque">
            <img src="${encodeURI(produto.imagem)}" alt="${produto.nome}" loading="lazy">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p class="preco">${formatarPreco(produto.preco)}</p>
            <a href="produtos.html" class="btn-comprar">Ver no catálogo</a>
        </article>
    `).join('');
}


/* ==========================================================
   6. SONS
   - Música de fundo (arquivo em audio/): botão liga/desliga,
     volume baixo, e lembra se estava tocando ao trocar de página.
   - Sino ao adicionar no carrinho: gerado pelo navegador (Web Audio),
     não precisa de arquivo.
   ========================================================== */
let contextoAudio = null;

function tocarSino() {
    try {
        const Contexto = window.AudioContext || window.webkitAudioContext;
        if (!Contexto) return;
        if (!contextoAudio) contextoAudio = new Contexto();
        if (contextoAudio.state === 'suspended') contextoAudio.resume();

        const agora = contextoAudio.currentTime;
        const ganho = contextoAudio.createGain();
        ganho.gain.setValueAtTime(0.0001, agora);
        ganho.gain.exponentialRampToValueAtTime(0.18, agora + 0.02);
        ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 1.4);
        ganho.connect(contextoAudio.destination);

        [880, 1320, 1760].forEach((frequencia, i) => {
            const osc = contextoAudio.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = frequencia;
            osc.connect(ganho);
            osc.start(agora);
            osc.stop(agora + 1.4 - i * 0.2);
        });
    } catch (erro) { /* sem áudio: ignora */ }
}

function iniciarMusica() {
    const botao = porId('btn-musica');
    if (!botao) return;

    const musica = new Audio('audio/tape-echo-christmas-winter-days_29sec-596030.mp3');
    musica.loop = true;
    musica.volume = 0.3; // volume baixo (0 a 1)

    const estado = lerStorage('musica', { tocando: false, tempo: 0 });

    const mostrarTocando = () => { botao.textContent = '⏸ Pausar música'; };
    const mostrarParada = () => { botao.textContent = '🔊 Tocar Música'; };
    const mostrarErro = (mensagem) => {
        botao.textContent = '⚠ Áudio indisponível';
        botao.title = mensagem;
    };

    musica.addEventListener('error', () => {
        const erro = musica.error;
        const mensagem = erro
            ? `Não foi possível carregar a música (erro ${erro.code}). Abra o site por um servidor local, como o Live Server do VS Code.`
            : 'Não foi possível carregar o arquivo de música.';
        console.error(mensagem, erro);
        mostrarErro(mensagem);
    });

    function tocar() {
        return musica.play()
            .then(() => {
                botao.title = '';
                mostrarTocando();
                gravarStorage('musica', { tocando: true, tempo: musica.currentTime });
            }).catch((erro) => {
                console.error('Não foi possível iniciar a reprodução da música.', erro);
                mostrarParada();
                mostrarErro(erro.message || 'Não foi possível iniciar a reprodução da música.');
            });
    }

    botao.addEventListener('click', () => {
        if (musica.paused) {
            tocar();
        } else {
            musica.pause();
            mostrarParada();
            gravarStorage('musica', { tocando: false, tempo: musica.currentTime });
        }
    });

    // guarda o ponto da música para continuar na próxima página
    const salvarTempo = () => {
        if (!musica.paused) gravarStorage('musica', { tocando: true, tempo: musica.currentTime });
    };
    window.addEventListener('pagehide', salvarTempo);
    musica.addEventListener('timeupdate', salvarTempo);

    // tenta retomar (o navegador pode bloquear até haver um clique)
    if (estado.tocando) {
        musica.currentTime = estado.tempo || 0;
        tocar();
    }
}


/* ==========================================================
   7. CONTAGEM REGRESSIVA PARA O NATAL
   Atualiza a cada segundo. Funciona em #contagem (Sobre)
   e #contagem-ofertas (Ofertas).
   ========================================================== */
function iniciarContagem() {
    const alvos = [porId('contagem'), porId('contagem-ofertas')].filter(Boolean);
    if (!alvos.length) return;

    function atualizar() {
        const agora = new Date();
        let natal = new Date(agora.getFullYear(), 11, 25); // mês 11 = dezembro
        if (agora > natal) natal = new Date(agora.getFullYear() + 1, 11, 25);

        const falta = natal - agora; // milissegundos
        const dias = Math.floor(falta / (1000 * 60 * 60 * 24));
        const horas = Math.floor(falta / (1000 * 60 * 60)) % 24;
        const minutos = Math.floor(falta / (1000 * 60)) % 60;
        const segundos = Math.floor(falta / 1000) % 60;

        const texto = `${dias}d ${horas}h ${minutos}min ${segundos}s para o Natal`;
        alvos.forEach((alvo) => { alvo.textContent = texto; });
    }

    atualizar();
    setInterval(atualizar, 1000);
}


/* ==========================================================
   8. CATÁLOGO, FILTRO E BUSCA (Produtos)
   Cria os cards a partir do array "produtos", agrupados por
   categoria, e atualiza na hora conforme busca/categoria.
   ========================================================== */
const listaProdutos = porId('lista-produtos');
const buscaInput = porId('busca');
const categoriaSelect = porId('categoria');
const contadorProdutos = porId('contador');

function gerarCardProduto(produto) {
    return `
        <article class="produto-card">
            <img src="${encodeURI(produto.imagem)}" alt="${produto.nome}" loading="lazy">
            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria}</span>
                <h3>${produto.nome}</h3>
                <p class="produto-descricao">${produto.descricao}</p>
                <p class="produto-valor">${formatarPreco(produto.preco)}</p>
                <div class="produto-acoes">
                    <button class="btn-comprar" type="button" data-id="${produto.id}">Adicionar ao carrinho</button>
                </div>
            </div>
        </article>
    `;
}

function renderizarCatalogo() {
    if (!listaProdutos || typeof produtos === 'undefined') return;

    const termo = buscaInput ? buscaInput.value.trim().toLowerCase() : '';
    const categoriaAtual = categoriaSelect ? categoriaSelect.value : 'todas';

    const filtrados = produtos.filter((produto) => {
        const bateCategoria = categoriaAtual === 'todas' || produto.categoria === categoriaAtual;
        const bateBusca = !termo
            || produto.nome.toLowerCase().includes(termo)
            || produto.descricao.toLowerCase().includes(termo);
        return bateCategoria && bateBusca;
    });

    if (contadorProdutos) {
        contadorProdutos.textContent = `Mostrando ${filtrados.length} de ${produtos.length} produtos`;
    }

    if (!filtrados.length) {
        listaProdutos.innerHTML = '<p class="contador-produtos">🎄 Nenhum produto encontrado para os filtros selecionados.</p>';
        return;
    }

    const categorias = [...new Set(filtrados.map((produto) => produto.categoria))];

    listaProdutos.innerHTML = categorias.map((categoria) => `
        <div class="categoria-grupo">
            <h2>${categoria}</h2>
            <div class="grade-catalogo">
                ${filtrados.filter((p) => p.categoria === categoria).map(gerarCardProduto).join('')}
            </div>
        </div>
    `).join('');
}

function iniciarCatalogo() {
    if (!listaProdutos) return;

    if (buscaInput) buscaInput.addEventListener('input', renderizarCatalogo);
    if (categoriaSelect) categoriaSelect.addEventListener('change', renderizarCatalogo);

    // delegação de evento: os botões são criados pelo JS
    listaProdutos.addEventListener('click', (evento) => {
        const botao = evento.target.closest('.btn-comprar');
        if (!botao) return;
        adicionarAoCarrinho(Number(botao.dataset.id));
    });

    renderizarCatalogo();
}


/* ==========================================================
   9. CARRINHO DE COMPRAS
   Adicionar, aumentar/diminuir, remover, total e quantidade.
   Salvo no localStorage (continua ao recarregar a página).
   ========================================================== */
const btnCarrinho = porId('btn-carrinho');
const painelCarrinho = porId('carrinho-panel');
const btnFecharCarrinho = porId('fechar-carrinho');
const listaCarrinho = porId('lista-carrinho');
const totalCarrinho = porId('total-carrinho');
const totalCarrinhoPanel = porId('total-carrinho-panel');
const qtdCarrinho = porId('qtd-carrinho');
const qtdCarrinhoBotao = porId('qtd-carrinho-botao');

// cada item: { id, quantidade }
let carrinho = [];

function carregarCarrinho() {
    const salvo = lerStorage('carrinho', []);
    if (!Array.isArray(salvo) || typeof produtos === 'undefined') return;

    // descarta itens inválidos ou de produtos que não existem mais
    carrinho = salvo.filter((item) =>
        item && Number.isInteger(item.quantidade) && item.quantidade > 0
        && produtos.some((produto) => produto.id === item.id)
    );
}

function salvarCarrinho() {
    gravarStorage('carrinho', carrinho);
}

function abrirPainelCarrinho(abrir) {
    if (!painelCarrinho) return;
    painelCarrinho.classList.toggle('ativo', abrir);
    if (btnCarrinho) btnCarrinho.setAttribute('aria-expanded', String(abrir));
}

function atualizarCarrinho() {
    if (typeof produtos === 'undefined') return;

    const itens = carrinho.map((item) => ({
        ...produtos.find((produto) => produto.id === item.id),
        quantidade: item.quantidade
    }));

    const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);
    const totalCompra = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

    if (qtdCarrinho) qtdCarrinho.textContent = totalItens;
    if (qtdCarrinhoBotao) qtdCarrinhoBotao.textContent = totalItens;
    if (totalCarrinho) totalCarrinho.textContent = formatarPreco(totalCompra);
    if (totalCarrinhoPanel) totalCarrinhoPanel.textContent = formatarPreco(totalCompra);

    if (!listaCarrinho) return;

    if (!itens.length) {
        listaCarrinho.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio.</li>';
        return;
    }

    listaCarrinho.innerHTML = itens.map((item) => `
        <li>
            <div class="item-info">
                <span class="item-nome">${item.nome}</span>
                <strong>${formatarPreco(item.preco * item.quantidade)}</strong>
            </div>
            <div class="item-acoes">
                <button type="button" class="btn-qtd" data-acao="menos" data-id="${item.id}" aria-label="Diminuir quantidade">−</button>
                <span class="item-qtd">${item.quantidade}</span>
                <button type="button" class="btn-qtd" data-acao="mais" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
                <button type="button" class="btn-remover" data-acao="remover" data-id="${item.id}" aria-label="Remover ${item.nome}">✕</button>
            </div>
        </li>
    `).join('');
}

function adicionarAoCarrinho(id) {
    const existente = carrinho.find((item) => item.id === id);

    if (existente) {
        existente.quantidade += 1;
    } else {
        carrinho.push({ id, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarCarrinho();
    abrirPainelCarrinho(true);
    tocarSino();
}

function alterarItem(id, acao) {
    const item = carrinho.find((i) => i.id === id);
    if (!item) return;

    if (acao === 'mais') item.quantidade += 1;
    if (acao === 'menos') item.quantidade -= 1;

    // zerou ou clicou em remover: tira do carrinho
    if (acao === 'remover' || item.quantidade <= 0) {
        carrinho = carrinho.filter((i) => i.id !== id);
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function iniciarCarrinho() {
    carregarCarrinho();
    atualizarCarrinho();

    if (btnCarrinho && painelCarrinho) {
        btnCarrinho.addEventListener('click', () => {
            abrirPainelCarrinho(!painelCarrinho.classList.contains('ativo'));
        });
    }

    if (btnFecharCarrinho) {
        btnFecharCarrinho.addEventListener('click', () => abrirPainelCarrinho(false));
    }

    if (listaCarrinho) {
        listaCarrinho.addEventListener('click', (evento) => {
            const botao = evento.target.closest('button[data-acao]');
            if (!botao) return;
            alterarItem(Number(botao.dataset.id), botao.dataset.acao);
        });
    }
}


/* ==========================================================
   10. VALIDAÇÃO DO FORMULÁRIO (Contato)
   Campos obrigatórios, formato de e-mail, mensagens de
   erro e de sucesso.
   ========================================================== */
function iniciarFormulario() {
    const formulario = porId('form-contato');
    const caixa = porId('mensagem-form');
    if (!formulario || !caixa) return;

    const campos = {
        nome: porId('nome'),
        email: porId('email'),
        assunto: porId('assunto'),
        mensagem: porId('mensagem')
    };

    const regraEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // tirar o destaque vermelho ao voltar a digitar
    Object.values(campos).forEach((campo) => {
        campo.addEventListener('input', () => campo.classList.remove('erro'));
    });

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); // impede a página de recarregar

        const valores = {
            nome: campos.nome.value.trim(),
            email: campos.email.value.trim(),
            assunto: campos.assunto.value.trim(),
            mensagem: campos.mensagem.value.trim()
        };

        const erros = [];
        const invalidos = [];

        if (valores.nome.length < 3) {
            erros.push('Digite seu nome completo (mínimo 3 letras).');
            invalidos.push(campos.nome);
        }
        if (valores.email === '') {
            erros.push('Digite seu e-mail.');
            invalidos.push(campos.email);
        } else if (!regraEmail.test(valores.email)) {
            erros.push('Digite um e-mail válido, como nome@exemplo.com.');
            invalidos.push(campos.email);
        }
        if (valores.assunto.length < 3) {
            erros.push('Digite o assunto da mensagem.');
            invalidos.push(campos.assunto);
        }
        if (valores.mensagem.length < 10) {
            erros.push('Escreva uma mensagem com pelo menos 10 caracteres.');
            invalidos.push(campos.mensagem);
        }

        Object.values(campos).forEach((campo) => campo.classList.remove('erro'));
        caixa.classList.remove('erro', 'sucesso');

        if (erros.length) {
            invalidos.forEach((campo) => campo.classList.add('erro'));
            caixa.classList.add('erro');
            caixa.innerHTML = erros.map((erro) => `• ${erro}`).join('<br>');
            invalidos[0].focus();
            return;
        }

        caixa.classList.add('sucesso');
        caixa.textContent = `Obrigado, ${valores.nome}! Sua mensagem foi enviada. 🎄`;
        formulario.reset();
    });
}


/* ==========================================================
   INICIALIZAÇÃO
   ========================================================== */
window.addEventListener('DOMContentLoaded', () => {
    iniciarMenu();
    iniciarTopo();
    iniciarParallax();
    iniciarSlideshow();
    iniciarDestaques();
    iniciarMusica();
    iniciarContagem();
    iniciarCatalogo();
    iniciarCarrinho();
    iniciarFormulario();
});
