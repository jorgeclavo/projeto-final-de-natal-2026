/* ==========================================================
   KROMA STORE | js/produtos.js
   Lista de produtos (array de objetos). Carregue ANTES do script.js.

   Campos: id (único), nome, categoria (sempre com a mesma grafia),
   preco (número com ponto), imagem, descricao, destaque (true/false).
   destaque: true  -> o produto aparece na Home (Lançamentos em Destaque).

   Para adicionar um produto: copie um bloco, mude o id (próximo número
   livre) e preencha os campos. Não esqueça a vírgula entre os objetos.
   ========================================================== */

const produtos = [
    {
        id: 1,
        nome: "Vestido Midi Vermelho",
        categoria: "Vestidos",
        preco: 489.90,
        imagem: "img/roupas/VestidoMidiVermelhoQueimadocomTraçosLinearesFinosdoPapaiNoel.jpg",
        descricao: "Silhueta midi com linhas minimalistas e acabamento refinado para festas de fim de ano.",
        destaque: true
    },
    {
        id: 2,
        nome: "Slip Dress Vermelho",
        categoria: "Vestidos",
        preco: 529.90,
        imagem: "img/roupas/VestidoModSlipDressVermelhoFechadocomDecoteReto.jpg",
        descricao: "Modelo elegante com caimento sofisticado, ideal para eventos mais formais e noites especiais.",
        destaque: false
    },
    {
        id: 3,
        nome: "Vestido Festivo de Cetim",
        categoria: "Vestidos",
        preco: 559.90,
        imagem: "img/roupas/RegatadeCetimVerdeMilitarcomPontoLuzemFormatodeEstrelaGuia.jpg",
        descricao: "Peça de luxo em tom verde militar com brilho sutil e acabamento elegante para festas.",
        destaque: false
    },
    {
        id: 4,
        nome: "Blusa Gola Alta Vermelha",
        categoria: "Camisas e Blusas",
        preco: 259.90,
        imagem: "img/roupas/BlusaGolaAltaVermelhaMutedemMalhaRibana.jpg",
        descricao: "Malha premium com gola alta e delicado acabamento em ponto que valoriza o visual natalino.",
        destaque: false
    },
    {
        id: 5,
        nome: "Camisa Marfim com Bordado",
        categoria: "Camisas e Blusas",
        preco: 279.90,
        imagem: "img/roupas/Camisa Marfim com Bordado de Árvore.png",
        descricao: "Peça leve e moderna com bordado discreto inspirando a árvore de Natal em uma paleta clássica.",
        destaque: false
    },
    {
        id: 6,
        nome: "Camisa Verde Minimalista",
        categoria: "Camisas e Blusas",
        preco: 299.90,
        imagem: "img/roupas/Camisa Verde em Vistas Frontal e Traseira.png",
        descricao: "Corte clean em verde profundo, com visual elegante e versátil para compor tanto looks casuais quanto formais.",
        destaque: false
    },
    {
        id: 7,
        nome: "Cropped Oversized Natalino",
        categoria: "Camisas e Blusas",
        preco: 239.90,
        imagem: "img/roupas/CroppedOversizedcomArteVetorialSilhuetadadaArvoredeNatal.jpg",
        descricao: "Estampa geométrica inspirada em árvores de Natal com leve volume e peso de luxo contemporâneo.",
        destaque: false
    },
    {
        id: 8,
        nome: "Camisa Social de Linho",
        categoria: "Camisas e Blusas",
        preco: 319.90,
        imagem: "img/roupas/CamisaSocialdeLinhoBrancacomBordadoMonocromáticodeRenanaGola.jpg",
        descricao: "Linha sofisticada com bordado monocromático e modelagem refinada para looks de fim de ano.",
        destaque: true
    },
    {
        id: 9,
        nome: "Camiseta Boxy Off White",
        categoria: "Camisas e Blusas",
        preco: 229.90,
        imagem: "img/roupas/CamisetaBoxyOffWhitecomMicrobordadoHoHoHoMinimonoPeito.jpg",
        descricao: "Corte oversized com micro bordado em “Ho Ho Ho”, ideal para dias leves e celebrativos.",
        destaque: false
    },
    {
        id: 10,
        nome: "Camiseta Cinza Papai Noel",
        categoria: "Camisas e Blusas",
        preco: 219.90,
        imagem: "img/roupas/Camisetas Cinza com Arte de Papai Noel.png",
        descricao: "Visual descontraído com arte de Papai Noel em vibe minimalista e urbana.",
        destaque: false
    },
    {
        id: 11,
        nome: "Camiseta Polo Norte",
        categoria: "Camisas e Blusas",
        preco: 239.90,
        imagem: "img/roupas/Camisetas Polo Norte Frente e Verso.png",
        descricao: "Estampa vintage com referências nórdicas, perfeita para compor um visual natalino moderno.",
        destaque: false
    },
    {
        id: 12,
        nome: "Cardigan de Tricô Cru",
        categoria: "Camisas e Blusas",
        preco: 349.90,
        imagem: "img/roupas/CardigandeTricôCrucomBotoamentoDiscretoemFormatodePinheiro.jpg",
        descricao: "Modelagem leve e sofisticada com botão discreto em formato de pinheiro.",
        destaque: false
    },
    {
        id: 13,
        nome: "Suéter Bordô",
        categoria: "Camisas e Blusas",
        preco: 379.90,
        imagem: "img/roupas/Suéter Bordô em Vista Frontal e Traseira.png",
        descricao: "Suéter de malha encorpada em bordô com visual acolhedor e refinado.",
        destaque: true
    },
    {
        id: 14,
        nome: "Top Camisete Estrela",
        categoria: "Camisas e Blusas",
        preco: 199.90,
        imagem: "img/roupas/TopCamisetecomPequenoSimbolodeFlocodeNeveGeometrico.jpg",
        descricao: "Peça leve com símbolo delicado de floco de neve em um corte clean e contemporâneo.",
        destaque: false
    },
    {
        id: 15,
        nome: "T-Shirt Preta Minimalista",
        categoria: "Camisas e Blusas",
        preco: 209.90,
        imagem: "img/roupas/TShirtPretacomTipografiaMinimalista2512emDourado.jpg",
        descricao: "Tipografia minimalista em dourado que entrega contraste e sofisticação ao visual.",
        destaque: false
    },
    {
        id: 16,
        nome: "Blazer Alfaiataria Marsala",
        categoria: "Casacos e Blazers",
        preco: 649.90,
        imagem: "img/roupas/BlazerAlfaiatariaMarsalacomForroInternoEstampadoemPadronagemNatalina.jpg",
        descricao: "Blazer estruturado com forro interno e estampa natalina em detalhe para um visual sofisticado.",
        destaque: true
    },
    {
        id: 17,
        nome: "Jaqueta Bomber Verde",
        categoria: "Casacos e Blazers",
        preco: 579.90,
        imagem: "img/roupas/Jaqueta bomber verde oliva_ frente e costas.png",
        descricao: "Jaqueta funcional e elegante, com acabamento impecável e vibe urbana para o clima festivo.",
        destaque: false
    },
    {
        id: 18,
        nome: "Colete Alfaiataria Off White",
        categoria: "Casacos e Blazers",
        preco: 419.90,
        imagem: "img/roupas/ColeteAlfaiatariaOffWhitecomAbotoamentoDuploeMicrodetalheVermelho.jpg",
        descricao: "Colete discreto com botões duplos e microdetalhes em vermelho, ideal para sobreposições elegantes.",
        destaque: false
    },
    {
        id: 19,
        nome: "Kimono Neutro",
        categoria: "Casacos e Blazers",
        preco: 469.90,
        imagem: "img/roupas/KimonoNeutrocomArteAbstrataInspiradaemLuzesdeNatal.jpg",
        descricao: "Modelagem fluida inspirada em luzes de Natal, com arte abstrata e toque leve.",
        destaque: false
    },
    {
        id: 20,
        nome: "Blazer Xadrez Festivo",
        categoria: "Casacos e Blazers",
        preco: 629.90,
        imagem: "img/roupas/Blazer Xadrez Natalino em Manequins.png",
        descricao: "Blazer xadrez com visual festivo e acabamento de alfaiataria para compor looks elegantes.",
        destaque: false
    },
    {
        id: 21,
        nome: "Calça Pantalona Verde",
        categoria: "Saias e Calças",
        preco: 359.90,
        imagem: "img/roupas/CalcaPantalonaVerdeFlorestadeCosAltocomBarraMinimalista.jpg",
        descricao: "Calça ampla com barra minimalista e equilíbrio entre conforto, luxo e caimento impecável.",
        destaque: false
    },
    {
        id: 22,
        nome: "Saia Plissada Dourada",
        categoria: "Saias e Calças",
        preco: 329.90,
        imagem: "img/roupas/SaiaPlissadaMidicomLinhasGeométricasemDouradoFosco.jpg",
        descricao: "Modelagem de movimento com linhas geométricas em dourado fosco para um visual festivo.",
        destaque: false
    },
    {
        id: 23,
        nome: "Shorts de Linho",
        categoria: "Saias e Calças",
        preco: 249.90,
        imagem: "img/roupas/Shorts de linho_ frente e costas.png",
        descricao: "Versão leve e fresca do linho com cortes precisos, uma escolha contemporânea para o verão natalino.",
        destaque: false
    },
    {
        id: 24,
        nome: "Calça Relax de Linho",
        categoria: "Saias e Calças",
        preco: 289.90,
        imagem: "img/roupas/Calças de Linho Natalinas Frente e Verso.png",
        descricao: "Corte confortável e elegante, pensado para compor looks com movimento e sobriedade.",
        destaque: false
    },
    {
        id: 25,
        nome: "Saia Midi com Abertura",
        categoria: "Saias e Calças",
        preco: 339.90,
        imagem: "img/roupas/Saia Natalina Burgundy Frente e Verso.png",
        descricao: "Silhueta feminina com acabamento refinado, ideal para ocasiões especiais e festas.",
        destaque: false
    },
    {
        id: 26,
        nome: "Calça de Alfaiataria Vermelha",
        categoria: "Saias e Calças",
        preco: 399.90,
        imagem: "img/roupas/Calças sociais vermelhas frente e verso.png",
        descricao: "Calça de alfaiataria vermelha com corte elegante para produções festivas.",
        destaque: false
    },
    {
        id: 27,
        nome: "Camiseta Merry Christmas",
        categoria: "Camisas e Blusas",
        preco: 189.90,
        imagem: "img/roupas/Camiseta Natalina Frente e Verso.png",
        descricao: "Camiseta natalina com estampa festiva para compor looks descontraídos de fim de ano.",
        destaque: false
    },
    {
        id: 28,
        nome: "Camiseta Winter Vibes",
        categoria: "Camisas e Blusas",
        preco: 199.90,
        imagem: "img/roupas/Mockup de Camiseta Winter Vibes.png",
        descricao: "Camiseta de inspiração invernal com estampa natalina para um visual casual.",
        destaque: false
    },
    {
        id: 29,
        nome: "Camiseta Preta Rena Nórdica",
        categoria: "Camisas e Blusas",
        preco: 179.90,
        imagem: "img/roupas/Camiseta Natalina Minimalista.png",
        descricao: "Camiseta preta com estampa natalina em estilo nórdico para um visual urbano.",
        destaque: false
    },
    {
        id: 30,
        nome: "Moletom Bordô Natalino",
        categoria: "Casacos e Blazers",
        preco: 399.90,
        imagem: "img/roupas/Moletom Natalino Minimalista Frente e Verso.png",
        descricao: "Moletom bordô com detalhes natalinos, confortável para os dias mais frios.",
        destaque: false
    },
    {
        id: 31,
        nome: "Suéter Preto Gorro de Natal",
        categoria: "Camisas e Blusas",
        preco: 389.90,
        imagem: "img/roupas/Suéter Natalino Minimalista Frente e Verso.png",
        descricao: "Suéter de tricô com detalhes natalinos para aquecer e completar o visual.",
        destaque: false
    },
    {
        id: 32,
        nome: "Suéter Nórdico Cru",
        categoria: "Camisas e Blusas",
        preco: 419.90,
        imagem: "img/roupas/Suéter Natalino Nórdico Frente e Verso.png",
        descricao: "Tricô de inspiração nórdica com detalhes natalinos em uma paleta clara.",
        destaque: false
    },
    {
        id: 33,
        nome: "Camisa Verde Estrela Dourada",
        categoria: "Camisas e Blusas",
        preco: 329.90,
        imagem: "img/roupas/Camisa Verde Natalina Frente e Verso.png",
        descricao: "Camisa verde com detalhes natalinos para compor um visual festivo e elegante.",
        destaque: false
    },
    {
        id: 34,
        nome: "Camisa Bordô Pinheiro",
        categoria: "Camisas e Blusas",
        preco: 309.90,
        imagem: "img/roupas/Camisa Natalina Bordô Minimalista em Manequins.png",
        descricao: "Camisa bordô com inspiração natalina para looks elegantes de fim de ano.",
        destaque: false
    },
    {
        id: 35,
        nome: "Sobretudo Verde Floresta",
        categoria: "Casacos e Blazers",
        preco: 799.90,
        imagem: "img/roupas/Sobretudo Verde Natalino Frente e Verso.png",
        descricao: "Sobretudo verde de caimento elegante, ideal para compor looks natalinos nos dias frios.",
        destaque: false
    },
    {
        id: 36,
        nome: "Cardigan Longo Creme",
        categoria: "Casacos e Blazers",
        preco: 499.90,
        imagem: "img/roupas/Cardigã Natalino em Tricô, Frente e Costas.png",
        descricao: "Cardigan de tricô em tom creme, confortável e versátil para sobreposições de inverno.",
        destaque: false
    },
    {
        id: 37,
        nome: "Casaco de Tricô Neve",
        categoria: "Casacos e Blazers",
        preco: 459.90,
        imagem: "img/roupas/Cardigã Nórdico Natalino Frente e Verso.png",
        descricao: "Tricô com inspiração nórdica e detalhes natalinos para aquecer os dias de inverno.",
        destaque: false
    },
    {
        id: 38,
        nome: "Blazer de Veludo Negro",
        categoria: "Casacos e Blazers",
        preco: 699.90,
        imagem: "img/roupas/Blazer de Veludo Preto Frente e Verso.png",
        descricao: "Blazer de veludo preto com acabamento sofisticado para ocasiões especiais.",
        destaque: false
    },
    {
        id: 39,
        nome: "Jaqueta Corta-Vento Natalina",
        categoria: "Casacos e Blazers",
        preco: 549.90,
        imagem: "img/roupas/Mockup de Jaqueta Natalina Frente e Verso.png",
        descricao: "Jaqueta leve com estampa natalina, prática para completar looks casuais.",
        destaque: false
    },
    {
        id: 40,
        nome: "Saia Lápis Marsala",
        categoria: "Saias e Calças",
        preco: 349.90,
        imagem: "img/roupas/Saia lápis vinho_ frente e costas.png",
        descricao: "Saia lápis em tom vinho, com modelagem clássica para produções elegantes.",
        destaque: false
    },
    {
        id: 41,
        nome: "Calça Wide Leg Neve",
        categoria: "Saias e Calças",
        preco: 429.90,
        imagem: "img/roupas/Calças de alfaiataria creme frente e verso.png",
        descricao: "Calça wide leg de alfaiataria em tom claro, com caimento amplo e contemporâneo.",
        destaque: false
    },
    {
        id: 42,
        nome: "Shorts de Alfaiataria Verde",
        categoria: "Saias e Calças",
        preco: 279.90,
        imagem: "img/roupas/Shorts Verdes de Alfaiataria Frente e Costas.png",
        descricao: "Shorts verde de alfaiataria, leve e elegante para os dias mais quentes.",
        destaque: false
    },
    {
        id: 43,
        nome: "Saia Mini Dourada",
        categoria: "Saias e Calças",
        preco: 299.90,
        imagem: "img/roupas/Manequins com saia dourada metálica.png",
        descricao: "Saia mini com acabamento dourado metálico para trazer brilho às produções festivas.",
        destaque: false
    },
    {
        id: 44,
        nome: "Kit Cachecol e Touca Natalinos",
        categoria: "Kits e Acessórios",
        preco: 229.90,
        imagem: "img/roupas/Conjunto natalino de gorro e cachecol tricotados.png",
        descricao: "Conjunto de gorro e cachecol em tricô para completar o visual e aquecer no inverno.",
        destaque: false
    },
    {
        id: 45,
        nome: "Kit de Meias Temáticas",
        categoria: "Kits e Acessórios",
        preco: 89.90,
        imagem: "img/roupas/Meias Natalinas em Vista Frontal e Traseira.png",
        descricao: "Meias com tema natalino, confortáveis para presentear ou usar durante as festas.",
        destaque: false
    },
    {
        id: 46,
        nome: "Presilha Estrela-Guia",
        categoria: "Kits e Acessórios",
        preco: 69.90,
        imagem: "img/roupas/Presilha Estrela Dourada com Fitas Festivas.png",
        descricao: "Presilha dourada com detalhes festivos para dar um toque especial ao penteado.",
        destaque: false
    },
    {
        id: 47,
        nome: "Bolsa Clutch Dourada",
        categoria: "Kits e Acessórios",
        preco: 259.90,
        imagem: "img/roupas/Clutches Douradas com Laço Festivo.png",
        descricao: "Clutch dourada com laço festivo, ideal para acompanhar produções de celebração.",
        destaque: false
    },
    {
        id: 48,
        nome: "Lenço de Seda Estampado",
        categoria: "Kits e Acessórios",
        preco: 179.90,
        imagem: "img/roupas/Cachecol Natalino de Seda em Duas Formas.png",
        descricao: "Acessório de seda com estampa natalina para usar no pescoço ou como complemento do look.",
        destaque: false
    },
    {
        id: 49,
        nome: "Broche Pinheiro Dourado",
        categoria: "Kits e Acessórios",
        preco: 79.90,
        imagem: "img/roupas/Alfinete de Árvore Natalina Dourada.png",
        descricao: "Broche dourado em formato de árvore de Natal para personalizar casacos e acessórios.",
        destaque: false
    },
    {
        id: 50,
        nome: "Kit Gravata-Borboleta Natalino",
        categoria: "Kits e Acessórios",
        preco: 159.90,
        imagem: "img/roupas/Kit Formal Borgonha com Suspensórios.png",
        descricao: "Kit formal em tom borgonha para completar o visual das celebrações de fim de ano.",
        destaque: false
    },
    {
        id: 51,
        nome: "Tiara de Veludo Vermelha",
        categoria: "Kits e Acessórios",
        preco: 89.90,
        imagem: "img/roupas/Tiara de Veludo Vermelho em Manequim.png",
        descricao: "Tiara de veludo vermelho com acabamento elegante para complementar o visual festivo.",
        destaque: false
    },
    {
        id: 52,
        nome: "Conjunto de Brincos Floco de Neve",
        categoria: "Kits e Acessórios",
        preco: 119.90,
        imagem: "img/roupas/Brincos de floco de neve em vários ângulos.png",
        descricao: "Conjunto de brincos inspirado em flocos de neve para dar um toque delicado ao look.",
        destaque: false
    },
    {
        id: 53,
        nome: "Cinto de Couro com Fivela Dourada",
        categoria: "Kits e Acessórios",
        preco: 149.90,
        imagem: "img/roupas/Cinto Preto com Fivela Dourada.png",
        descricao: "Cinto preto com fivela dourada, um acessório versátil para completar produções elegantes.",
        destaque: false
    }
];
