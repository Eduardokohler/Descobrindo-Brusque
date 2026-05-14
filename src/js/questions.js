// Array contendo o banco de perguntas sobre Brusque
const questionBank = [
    {
        id: 1,
        question: "QUAL ANIMAL DÁ NOME À FESTA FENARRECO?",
        alternatives: [
            "MARRECO",
            "LEÃO",
            "CACHORRO",
            "PEIXE"
        ],
        correctAnswer: "MARRECO",
        curiosity: "O marreco é tão importante para Brusque que tem uma festa só dele — a Fenarreco!",
        bgImage: "src/assets/images/bg_q3.png"
    },
    {
        id: 2,
        question: "QUAL ROUPA É USADA PARA DANÇAR NA FENARRECO?",
        alternatives: [
            "TRAJE TÍPICO ALEMÃO",
            "PIJAMA",
            "ROUPA DE PRAIA",
            "FANTASIA DE SUPER-HERÓI"
        ],
        correctAnswer: "TRAJE TÍPICO ALEMÃO",
        curiosity: "Os trajes típicos alemães, como o dirndl e o lederhosen, são usados nas danças folclóricas da Fenarreco.",
        bgImage: "src/assets/images/bg_q5.png"
    },
    {
        id: 3,
        question: "QUAL COMIDA É TRADICIONAL NA FENARRECO?",
        alternatives: [
            "MARRECO COM REPOLHO ROXO",
            "SUSHI",
            "PIZZA",
            "ACARAJÉ"
        ],
        correctAnswer: "MARRECO COM REPOLHO ROXO",
        curiosity: "O marreco recheado é servido com chucrute, batatas e o famoso repolho roxo, herança da culinária alemã.",
        bgImage: "src/assets/images/bg_q7.png"
    },
    {
        id: 4,
        question: "QUAIS SÃO AS CORES DA BANDEIRA DE BRUSQUE?",
        alternatives: [
            "AMARELO E VERMELHO",
            "AZUL E VERDE",
            "PRETO E BRANCO",
            "ROXO E LARANJA"
        ],
        correctAnswer: "AMARELO E VERMELHO",
        curiosity: "As cores amarelo e vermelho da bandeira de Brusque representam a história e a cultura da cidade.",
        bgImage: "src/assets/images/bg_q1.png"
    },
    {
        id: 5,
        question: "COMO SE CHAMA O RIO QUE PASSA POR BRUSQUE?",
        alternatives: [
            "ITAJAÍ-MIRIM",
            "AMAZONAS",
            "SÃO FRANCISCO",
            "PARANÁ"
        ],
        correctAnswer: "ITAJAÍ-MIRIM",
        curiosity: "O Rio Itajaí-Mirim corta toda a cidade e é parte fundamental da história de Brusque.",
        bgImage: "src/assets/images/bg_q4.png"
    },
    {
        id: 6,
        question: "COMO SE CHAMA A CIDADE ONDE MORAMOS?",
        alternatives: [
            "BRUSQUE",
            "BLUMENAU",
            "ITAJAÍ",
            "JOINVILLE"
        ],
        correctAnswer: "BRUSQUE",
        curiosity: "Brusque foi fundada em 4 de agosto de 1860 e fica no Vale do Itajaí, em Santa Catarina.",
        bgImage: "src/assets/images/bg_q1.png"
    },
    {
        id: 7,
        question: "QUEM VEIO MORAR EM BRUSQUE HÁ MUITO TEMPO?",
        alternatives: [
            "ALEMÃES",
            "PIRATAS",
            "DINOSSAUROS",
            "ASTRONAUTAS"
        ],
        correctAnswer: "ALEMÃES",
        curiosity: "Os primeiros colonos alemães chegaram em 1860, liderados pelo Barão Maximiliano von Schneeburg.",
        bgImage: "src/assets/images/bg_q6.png"
    },
    {
        id: 8,
        question: "DE ONDE VIERAM ESSAS PESSOAS?",
        alternatives: [
            "ALEMANHA",
            "LUA",
            "DESERTO",
            "JAPÃO"
        ],
        correctAnswer: "ALEMANHA",
        curiosity: "Os imigrantes vieram principalmente da Alemanha e trouxeram sua cultura, língua e tradições para Brusque.",
        bgImage: "src/assets/images/bg_q6.png"
    },
    {
        id: 9,
        question: "O QUE ESSAS PESSOAS TROUXERAM PARA BRUSQUE?",
        alternatives: [
            "COSTUMES E COMIDAS",
            "ROBÔS",
            "AVIÕES",
            "SUBMARINOS"
        ],
        correctAnswer: "COSTUMES E COMIDAS",
        curiosity: "Os imigrantes trouxeram festas, danças, receitas e a arquitetura enxaimel que ainda vemos em Brusque.",
        bgImage: "src/assets/images/bg_q8.png"
    },
    {
        id: 10,
        question: "COMO ERAM AS PRIMEIRAS CASAS DE BRUSQUE?",
        alternatives: [
            "DE MADEIRA",
            "DE GELO",
            "DE METAL",
            "DE PLÁSTICO"
        ],
        correctAnswer: "DE MADEIRA",
        curiosity: "As primeiras casas eram de madeira no estilo enxaimel, técnica trazida pelos imigrantes alemães.",
        bgImage: "src/assets/images/bg_q8.png"
    },
    {
        id: 11,
        question: "POR QUE BRUSQUE É CONHECIDA COMO CIDADE DOS TECIDOS?",
        alternatives: [
            "PORQUE FAZ MUITAS ROUPAS",
            "PORQUE FAZ CARROS",
            "PORQUE FAZ BARCOS",
            "PORQUE FAZ AVIÕES"
        ],
        correctAnswer: "PORQUE FAZ MUITAS ROUPAS",
        curiosity: "Brusque é chamada de 'Berço da Fiação Catarinense' e 'Cidade da Moda' por sua forte indústria têxtil.",
        bgImage: "src/assets/images/bg_q2.png"
    },
    {
        id: 12,
        question: "QUEM FAZ AS ROUPAS NAS FÁBRICAS DE TECIDO?",
        alternatives: [
            "COSTUREIRA",
            "PILOTO",
            "MÉDICO",
            "BOMBEIRO"
        ],
        correctAnswer: "COSTUREIRA",
        curiosity: "As costureiras e tecelões são profissionais muito importantes para a indústria têxtil de Brusque.",
        bgImage: "src/assets/images/bg_q2.png"
    },
    {
        id: 13,
        question: "ONDE PODEMOS VER ANIMAIS EM BRUSQUE?",
        alternatives: [
            "ZOO-BOTÂNICO",
            "CINEMA",
            "MERCADO",
            "BIBLIOTECA"
        ],
        correctAnswer: "ZOO-BOTÂNICO",
        curiosity: "O Zoobotânico de Brusque abriga animais nativos da Mata Atlântica e plantas raras.",
        bgImage: "src/assets/images/bg_q15.png"
    },
    {
        id: 14,
        question: "ONDE FICA O AVIÃO HISTÓRICO DE BRUSQUE?",
        alternatives: [
            "PARQUE LEOPOLDO MORITZ",
            "RODOVIÁRIA",
            "ESCOLA",
            "SHOPPING"
        ],
        correctAnswer: "PARQUE LEOPOLDO MORITZ",
        curiosity: "O avião é um Douglas DC-3 instalado no Parque Leopoldo Moritz e tornou-se símbolo turístico da cidade.",
        bgImage: "src/assets/images/bg_q13.png"
    },
    {
        id: 15,
        question: "QUAL ANIMAL FAZ O SOM \"QUACK QUACK\" E REPRESENTA A FENARRECO?",
        alternatives: [
            "MARRECO",
            "GALINHA",
            "PORCO",
            "VACA"
        ],
        correctAnswer: "MARRECO",
        curiosity: "O marreco é o mascote da Fenarreco e o símbolo mais querido de Brusque!",
        bgImage: "src/assets/images/bg_q3.png"
    },
];
