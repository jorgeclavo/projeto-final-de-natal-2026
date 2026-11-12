const produtos = [
    {
        nome: 'Vestido Midi Vermelho',
        categoria: 'Vestidos',
        preco: 489.90,
        descricao: 'Silhueta midi com linhas minimalistas e acabamento refinado para festas de fim de ano.',
        imagem: 'img/roupas/VestidoMidiVermelhoQueimadocomTraçosLinearesFinosdoPapaiNoel.jpg'
    },
    {
        nome: 'Slip Dress Vermelho',
        categoria: 'Vestidos',
        preco: 529.90,
        descricao: 'Modelo elegante com caimento sofisticado, ideal para eventos mais formais e noites especiais.',
        imagem: 'img/roupas/VestidoModSlipDressVermelhoFechadocomDecoteReto.jpg'
    },
    {
        nome: 'Vestido Festivo de Cetim',
        categoria: 'Vestidos',
        preco: 559.90,
        descricao: 'Peça de luxo em tom verde militar com brilho sutil e acabamento elegante para festas.',
        imagem: 'img/roupas/RegatadeCetimVerdeMilitarcomPontoLuzemFormatodeEstrelaGuia.jpg'
    },
    {
        nome: 'Blusa Gola Alta Vermelha',
        categoria: 'Camisas e Blusas',
        preco: 259.90,
        descricao: 'Malha premium com gola alta e delicado acabamento em ponto que valoriza o visual natalino.',
        imagem: 'img/roupas/BlusaGolaAltaVermelhaMutedemMalhaRibana.jpg'
    },
    {
        nome: 'Camisa Marfim com Bordado',
        categoria: 'Camisas e Blusas',
        preco: 279.90,
        descricao: 'Peça leve e moderna com bordado discreto inspirando a árvore de Natal em uma paleta clássica.',
        imagem: 'img/roupas/Camisa Marfim com Bordado de Árvore.png'
    },
    {
        nome: 'Camisa Verde Minimalista',
        categoria: 'Camisas e Blusas',
        preco: 299.90,
        descricao: 'Corte clean em verde profundo, com visual elegante e versátil para compor tanto looks casuais quanto formais.',
        imagem: 'img/roupas/Camisa Verde em Vistas Frontal e Traseira.png'
    },
    {
        nome: 'Cropped Oversized Natalino',
        categoria: 'Camisas e Blusas',
        preco: 239.90,
        descricao: 'Estampa geométrica inspirada em árvores de Natal com leve volume e peso de luxo contemporâneo.',
        imagem: 'img/roupas/CroppedOversizedcomArteVetorialSilhuetadadaArvoredeNatal.jpg'
    },
    {
        nome: 'Camisa Social de Linho',
        categoria: 'Camisas e Blusas',
        preco: 319.90,
        descricao: 'Linha sofisticada com bordado monocromático e modelagem refinada para looks de fim de ano.',
        imagem: 'img/roupas/CamisaSocialdeLinhoBrancacomBordadoMonocromáticodeRenanaGola.jpg'
    },
    {
        nome: 'Camiseta Boxy Off White',
        categoria: 'Camisas e Blusas',
        preco: 229.90,
        descricao: 'Corte oversized com micro bordado em “Ho Ho Ho”, ideal para dias leves e celebrativos.',
        imagem: 'img/roupas/CamisetaBoxyOffWhitecomMicrobordadoHoHoHoMinimonoPeito.jpg'
    },
    {
        nome: 'Camiseta Cinza Papai Noel',
        categoria: 'Camisas e Blusas',
        preco: 219.90,
        descricao: 'Visual descontraído com arte de Papai Noel em vibe minimalista e urbana.',
        imagem: 'img/roupas/Camisetas Cinza com Arte de Papai Noel.png'
    },
    {
        nome: 'Camiseta Polo Norte',
        categoria: 'Camisas e Blusas',
        preco: 239.90,
        descricao: 'Estampa vintage com referências nórdicas, perfeita para compor um visual natalino moderno.',
        imagem: 'img/roupas/Camisetas Polo Norte Frente e Verso.png'
    },
    {
        nome: 'Cardigan de Tricô Cru',
        categoria: 'Camisas e Blusas',
        preco: 349.90,
        descricao: 'Modelagem leve e sofisticada com botão discreto em formato de pinheiro.',
        imagem: 'img/roupas/CardigandeTricôCrucomBotoamentoDiscretoemFormatodePinheiro.jpg'
    },
    {
        nome: 'Suéter Bordô',
        categoria: 'Camisas e Blusas',
        preco: 379.90,
        descricao: 'Suéter de malha encorpada em bordô com visual acolhedor e refinado.',
        imagem: 'img/roupas/Suéter Bordô em Vista Frontal e Traseira.png'
    },
    {
        nome: 'Top Camisete Estrela',
        categoria: 'Camisas e Blusas',
        preco: 199.90,
        descricao: 'Peça leve com símbolo delicado de floco de neve em um corte clean e contemporâneo.',
        imagem: 'img/roupas/TopCamisetecomPequenoSimbolodeFlocodeNeveGeometrico.jpg'
    },
    {
        nome: 'T-Shirt Preta Minimalista',
        categoria: 'Camisas e Blusas',
        preco: 209.90,
        descricao: 'Tipografia minimalista em dourado que entrega contraste e sofisticação ao visual.',
        imagem: 'img/roupas/TShirtPretacomTipografiaMinimalista2512emDourado.jpg'
    },
    {
        nome: 'Blazer Alfaiataria Marsala',
        categoria: 'Casacos e Blazers',
        preco: 649.90,
        descricao: 'Blazer estruturado com forro interno e estampa natalina em detalhe para um visual sofisticado.',
        imagem: 'img/roupas/BlazerAlfaiatariaMarsalacomForroInternoEstampadoemPadronagemNatalina.jpg'
    },
    {
        nome: 'Jaqueta Bomber Verde',
        categoria: 'Casacos e Blazers',
        preco: 579.90,
        descricao: 'Jaqueta funcional e elegante, com acabamento impecável e vibe urbana para o clima festivo.',
        imagem: 'img/roupas/Jaqueta bomber verde oliva_ frente e costas.png'
    },
    {
        nome: 'Colete Alfaiataria Off White',
        categoria: 'Casacos e Blazers',
        preco: 419.90,
        descricao: 'Colete discreto com botões duplos e microdetalhes em vermelho, ideal para sobreposições elegantes.',
        imagem: 'img/roupas/ColeteAlfaiatariaOffWhitecomAbotoamentoDuploeMicrodetalheVermelho.jpg'
    },
    {
        nome: 'Kimono Neutro',
        categoria: 'Casacos e Blazers',
        preco: 469.90,
        descricao: 'Modelagem fluida inspirada em luzes de Natal, com arte abstrata e toque leve.',
        imagem: 'img/roupas/KimonoNeutrocomArteAbstrataInspiradaemLuzesdeNatal.jpg'
    },
    {
        nome: 'Manequim Camisa Xadrez',
        categoria: 'Casacos e Blazers',
        preco: 399.90,
        descricao: 'Peça de alfaiataria com padronagem xadrez que reforça a estética elegante e natalina.',
        imagem: 'img/roupas/Manequins com Camisa Xadrez Frente e Verso.png'
    },
    {
        nome: 'Calça Pantalona Verde',
        categoria: 'Saias e Calças',
        preco: 359.90,
        descricao: 'Calça ampla com barra minimalista e equilíbrio entre conforto, luxo e caimento impecável.',
        imagem: 'img/roupas/CalcaPantalonaVerdeFlorestadeCosAltocomBarraMinimalista.jpg'
    },
    {
        nome: 'Saia Plissada Dourada',
        categoria: 'Saias e Calças',
        preco: 329.90,
        descricao: 'Modelagem de movimento com linhas geométricas em dourado fosco para um visual festivo.',
        imagem: 'img/roupas/SaiaPlissadaMidicomLinhasGeométricasemDouradoFosco.jpg'
    },
    {
        nome: 'Shorts de Linho',
        categoria: 'Saias e Calças',
        preco: 249.90,
        descricao: 'Versão leve e fresca do linho com cortes precisos, uma escolha contemporânea para o verão natalino.',
        imagem: 'img/roupas/Shorts de linho_ frente e costas.png'
    },
    {
        nome: 'Calça Relax de Linho',
        categoria: 'Saias e Calças',
        preco: 289.90,
        descricao: 'Corte confortável e elegante, pensado para compor looks com movimento e sobriedade.',
        imagem: 'img/roupas/Mockup de Polo Preto com Coordenadas.png'
    },
    {
        nome: 'Saia Midi com Abertura',
        categoria: 'Saias e Calças',
        preco: 339.90,
        descricao: 'Silhueta feminina com acabamento refinado, ideal para ocasiões especiais e festas.',
        imagem: 'img/roupas/Mockup de Camiseta Natalina Minimalista.png'
    },
    {
        nome: 'Pantalona Verde Floresta',
        categoria: 'Saias e Calças',
        preco: 369.90,
        descricao: 'Visual sofisticado com corte fluido e forte apelo premium em tons de verde profundo.',
        imagem: 'img/roupas/CalcaPantalonaVerdeFlorestadeCosAltocomBarraMinimalista.jpg'
    }
];

const lojaNatalina = document.getElementById('lojaNatalina');
const logoKroma = document.getElementById('logoKroma');
const iconeKroma = document.getElementById('iconeKroma');
const buscaInput = document.getElementById('busca');
const categoriaSelect = document.getElementById('categoria');
const contadorProdutos = document.getElementById('contador');
const listaProdutos = document.getElementById('lista-produtos');
const btnCarrinho = document.getElementById('btn-carrinho');
const painelCarrinho = document.getElementById('carrinho-panel');
const btnFecharCarrinho = document.getElementById('fechar-carrinho');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const totalCarrinhoPanel = document.getElementById('total-carrinho-panel');
const qtdCarrinho = document.getElementById('qtd-carrinho');
const qtdCarrinhoBotao = document.getElementById('qtd-carrinho-botao');
const carrinho = [];

function formatarPreco(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

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
                    <button class="btn-comprar" type="button" data-nome="${produto.nome}" data-preco="${produto.preco}">Adicionar ao carrinho</button>
                </div>
            </div>
        </article>
    `;
}

function atualizarCarrinho() {
    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    const totalCompra = carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);

    if (qtdCarrinho) qtdCarrinho.textContent = totalItens;
    if (qtdCarrinhoBotao) qtdCarrinhoBotao.textContent = totalItens;
    if (totalCarrinho) totalCarrinho.textContent = formatarPreco(totalCompra);
    if (totalCarrinhoPanel) totalCarrinhoPanel.textContent = formatarPreco(totalCompra);

    if (!listaCarrinho) return;

    if (!carrinho.length) {
        listaCarrinho.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio.</li>';
        return;
    }

    listaCarrinho.innerHTML = carrinho
        .map((item) => `
            <li>
                <span>${item.nome} x${item.quantidade}</span>
                <strong>${formatarPreco(item.preco * item.quantidade)}</strong>
            </li>
        `)
        .join('');
}

function adicionarAoCarrinho(nome, preco) {
    const produtoExistente = carrinho.find((item) => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
    if (painelCarrinho) painelCarrinho.classList.add('ativo');
    if (btnCarrinho) btnCarrinho.setAttribute('aria-expanded', 'true');
}

function renderizarCatalogo() {
    if (!listaProdutos) return;

    const termoBusca = buscaInput ? buscaInput.value.trim().toLowerCase() : '';
    const categoriaAtual = categoriaSelect ? categoriaSelect.value : 'todas';

    const categorias = [...new Set(produtos.map((produto) => produto.categoria))];

    const gruposFiltrados = categorias
        .map((categoria) => {
            const itens = produtos.filter((produto) => {
                const bateCategoria = categoriaAtual === 'todas' || produto.categoria === categoriaAtual;
                const bateBusca = !termoBusca || produto.nome.toLowerCase().includes(termoBusca) || produto.descricao.toLowerCase().includes(termoBusca);
                return bateCategoria && bateBusca && produto.categoria === categoria;
            });

            return {
                categoria,
                itens
            };
        })
        .filter((grupo) => grupo.itens.length > 0);

    if (!gruposFiltrados.length) {
        listaProdutos.innerHTML = '<p class="contador-produtos">Nenhum produto encontrado para os filtros selecionados.</p>';
        if (contadorProdutos) contadorProdutos.textContent = '0 produtos encontrados';
        return;
    }

    listaProdutos.innerHTML = gruposFiltrados
        .map((grupo) => `
            <div class="categoria-grupo">
                <h2>${grupo.categoria}</h2>
                <div class="grade-catalogo">
                    ${grupo.itens.map(gerarCardProduto).join('')}
                </div>
            </div>
        `)
        .join('');

    const totalProdutos = gruposFiltrados.reduce((total, grupo) => total + grupo.itens.length, 0);
    if (contadorProdutos) contadorProdutos.textContent = `${totalProdutos} produto${totalProdutos !== 1 ? 's' : ''} encontrado${totalProdutos !== 1 ? 's' : ''}`;
}

let ticking = false;

function updateParallax() {
    const value = window.scrollY;

    if (lojaNatalina) lojaNatalina.style.transform = `translateX(${value * 2}px)`;
    if (logoKroma) logoKroma.style.transform = `translateX(${value * 2}px)`;
    if (iconeKroma) iconeKroma.style.transform = `translateX(${value * -2}px)`;

    ticking = false;
}

if (listaProdutos) {
    listaProdutos.addEventListener('click', (event) => {
        const botao = event.target.closest('.btn-comprar');
        if (!botao) return;

        const nome = botao.dataset.nome;
        const preco = Number(botao.dataset.preco);

        if (nome && !Number.isNaN(preco)) {
            adicionarAoCarrinho(nome, preco);
        }
    });
}

if (btnCarrinho) {
    btnCarrinho.addEventListener('click', () => {
        if (!painelCarrinho) return;
        const aberto = painelCarrinho.classList.toggle('ativo');
        btnCarrinho.setAttribute('aria-expanded', String(aberto));
    });
}

if (btnFecharCarrinho) {
    btnFecharCarrinho.addEventListener('click', () => {
        if (!painelCarrinho) return;
        painelCarrinho.classList.remove('ativo');
        if (btnCarrinho) btnCarrinho.setAttribute('aria-expanded', 'false');
    });
}

if (buscaInput) buscaInput.addEventListener('input', renderizarCatalogo);
if (categoriaSelect) categoriaSelect.addEventListener('change', renderizarCatalogo);

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

window.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
    renderizarCatalogo();

    const btnMenu = document.querySelector('.btn-menu');
    const menu = document.querySelector('.nav-links');
    if (btnMenu && menu) {
        btnMenu.addEventListener('click', () => menu.classList.toggle('aberto'));
    }

    const btnTopo = document.getElementById('topo');
    if (btnTopo) {
        btnTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});
