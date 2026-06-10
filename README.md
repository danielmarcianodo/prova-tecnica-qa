# Prova técnica - Analista de Qualidade (QA)

---

## Por onde começar?

    Para analise das partes conceituais e escritas basta acessar o arquivo RESPOSTAS.md
        Conteúdos da pasta:
            Questao 1;
            Questao 2;
            Questao 4;
            Questao 5;
            Questao 6;
            Questao 7.

    Caso queira analisar o projeto de automaçao, continue nesse arquivo
        Conteúdos da pasta:
            Questao 3;
            Questao 4.

---

# Questão 3: Automação de Testes de Interface - E2E (Prática)

    Projeto de automação E2E utilizando Cypress para validação de fluxo de compra no site Sauce Demo
    

## Estrutura do projeto

/TESTE-QA
│
└── cypress/
    └── e2e/
        └── questao3.cy.js


## Cenario automatizado

    Login com usuário standard_user
    Adição do produto "Sauce Labs Backpack"
    Validação no carrinho

---

# Questão 4: Automação de Testes de Interface - E2E (Prática)

    Teste de API com Cypress (Estoque de Produto)


## Estrutura do projeto

/TESTE-QA
│
└── cypress/
    └── e2e/
        └── questao4.cy.js


## Cenario de teste

    Validar retorno de estoque para uma combinação válida de cor e tamanho
    Garantir integridade do contrato da API
    Validar tipo de dado retornado


## Endpoint testado

GET /api/v1/produtos/{id}/estoque?cor={cor}&tamanho={tamanho}


## Endpoint utilizado no teste

/api/v1/produtos/1/estoque?cor=Preto&tamanho=GG


## Validacoes relizadas

    Status HTTP 200 OK
    Presença do campo quantidade_disponivel
    Tipo numérico do campo
    Consistência da resposta da API


## IMPORTANTE

Como o backend não está disponível, foi utilizada a técnica de mock com cy.intercept para simular o comportamento da API e validar o contrato de resposta

---

# INSTALAÇAO


## Tecnologias utilizadas

    Cypress
    Node.js
    API REST
    JavaScript

## Instalar dependências:

    npm install


## Execução dos testes

    npx cypress open
    npx cypress run

---

## Feito por

    Daniel Marciano de Oliveira

