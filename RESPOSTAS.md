# PROVA TECNICA - ANALISTA DE QUALIDADE (QA)

## DANIEL MARCIANO DE OLIVEIRA

-----

## Questao 1 - Engenharia de Testes e Analise de Cenarios 

**Feature: Vendas de roupas com grade inteligente**

	Como lojista 
	Quero vender roupas com diferentes tamanhos e cores
	Para controlar corretamente o estoque de cada variação


**Scenario: Exibir variações disponíveis do produto**

    Given que existe o produto "Camiseta Polo"
    And o produto possui as cores "Azul" e "Preto"
    And o produto possui os tamanhos "P", "M", "G" e "GG"
    When o cliente selecionar o produto "Camiseta Polo"
    Then o sistema deve exibir as variações de cor disponíveis
    And o sistema deve exibir as variações de tamanho disponíveis


**Scenario: Adicionar ao carrinho uma variação com estoque disponível**

    Given que existe o produto "Camiseta Polo"
    And a variação "Azul" tamanho "M" possui 10 unidades em estoque
    When o cliente selecionar a cor "Azul" e o tamanho "M"
    And adicionar o produto ao carrinho
    Then o produto deve ser adicionado ao carrinho com sucesso


**Scenario: impedir compra de variação sem estoque**

	Given que existe um produto "Camiseta polo"
	And a variação "Azul" tamanho "G" possui 0 unidades em estoque
	When o cliente selecionar a cor "Azul" e o tamanho "G"
    And adicionar o produto ao carrinho
	Then o sistema deve informar que a variação selecionada está indisponível
	And o produto não deve ser adicionado ao carrinho


**Scenario: permitir compra de outras variaçoes quando uma estiver sem estoque**

    Given que existe o produto "Camiseta Polo"
    And a variação "Preto" tamanho "GG" possui 0 unidades em estoque
    And a variação "Preto" tamanho "G" possui 5 unidades em estoque
    When o cliente selecionar a cor "Preto" e o tamanho "G"
    And adicionar o produto ao carrinho
    Then o produto deve ser adicionado ao carrinho com sucesso


**Scenario: reduzir estoque após a confirmaçao da venda**

    Given que existe o produto "Camiseta Polo"
    And a variacao "Azul" tamanho "P" possui 5 unidades em estoque
    When o cliente comprar 2 unidades da variaçao "Azul" tamanho "P"
    Then a venda deve ser concluída com sucesso
    And o estoque da variaçao "Azul" tamanho "P" deve ser atualizado para 3 unidades


**Scenario: impedir compra de quantidade superior ao estoque disponivel**

    Given que existe o produto "Camiseta Polo"
    And a variacao "Azul" tamanho "G" possui 3 unidades em estoque
    When o cliente tentar comprar 5 unidades da variacao "Azul" tamanho "G"
    Then o sistema deve informar que a quantidade solicitada é maior que o estoque dísponivel
    And a venda nao deve ser concluída


**Scenario: Impedir adição ao carrinho sem selecionar tamanho e cor**

    Given que existe o produto "Camiseta Polo"
    When o cliente tentar adicionar o produto ao carrinho sem selecionar uma cor e um tamanho
    Then o sistema deve informar que a seleção das variações é obrigatória
    And o produto não deve ser adicionado ao carrinho


**Scenario: Bloquear venda quando o estoque for esgotado**

    Given que existe o produto "Camiseta Polo"
    And a variação "Preto" tamanho "M" possui 1 unidade em estoque
    When o cliente comprar 1 unidade da variação "Preto" tamanho "M"
    Then o estoque da variação "Preto" tamanho "M" deve ser atualizado para 0 unidades
    When outro cliente tentar comprar a mesma variação
    Then o sistema deve informar indisponibilidade de estoque
    And a venda não deve ser concluída

---

## Questao 2 - Documentaçao e Report de Bug

**Titulo:**
Preço da variação "Preto + GG" é exibido como R$ 0,00 no carrinho e permite checkout sem cobrança

**Resumo do problema:**
Ao selecionar a 'Camiseta Polo' na cor 'Preto' e tamanho 'GG', o preço unitário do produto no carrinho muda de R$ 89,90 para R$ 0,00. Se o usuário prosseguir para o checkout, ele consegue fechar a compra sem pagar pelo produto. Isso só acontece especificamente na combinação Preto + GG.


**Ambiente**

    - Homologaçao
    - Módulo: E-commerce / Carrinho de compras


**Passos para reproduzir**

    1. Acessar o produto "Camiseta Polo"
    2. Selecionar a cor "Preto"
    3. Selecionar o tamanho "GG"
    4. Adicionar o produto ao carrinho
    5. Ir para o carrinho
    6. Prosseguir para o checkout

**Resultado atual**

O valor do produto é exibido como R$ 0,00 no carrinho e o checkout é finalizado sem cobrança.

**Resultado esperado**

O produto deve manter o valor de R$ 89,90 e a compra deve ser processada com cobrança correta.

**Severidade: Critica - Financeiro e regra de negócio quebrada:**
Considerando que clientes poderiam usar isso de má fé, realizando várias compras do produto de forma "gratuita", o que geraria um grande prejuízo para a empresa


**Prioridade: Alta / Urgente**


**Sugestao de Evidencias:**
Um vídeo reproduzindo o comportamento do bug, realizando todos os passos necessários (desde selecionar o produto até realizar o pagamento), testando todos os meios de pagamento, seja cartão, pix ou boleto, para validar se a compra é de fato realizada com o valor R$0,00 ou no valor correto do produto (pois pode ser apenas um BUG visual no valor mostrado e não o valor real do produto)

---

## Questao 4 - Testes de API e Integração (Conceitual + Prática)

Consiedrando o endpoint
GET /api/v1/produtos/{id}/estoque?cor={cor}&tamanho={tamanho}


**Validacao de Status Code**

    200 OK - Sucesso na requisicao
    400 Bad Request - Parametros invalidos(cor/tamanho inexistente ou vaziom)
    404 Not Found - Produto nao existe (o URL incorreta)
    500 Internal Server Error - Erros internos no servidor, inesperado mas deve ser monitorado sempre


**Tipos de dados**

Correto:

    produto_id: int
    quantidade_disponivel: int
    cor: string
    tamanho: string


Incorreto:

    Retornos como 'null' ou string no lugar do número


Response de exemplo:
```json
    {
        "produto_id": 1,
        "quantidade_disponivel": 10,
        "cor": "Preto",
        "tamanho": "GG"
    }
```

**Caminhos de exceção**

    Produto sem estoque
    Parâmetros inexistentes
    Latência alta da API
    Timeout
    Respostas inconsistentes entre chamadas repetidas

---

## Questao 5 - Estratégia de Testes para Inteligência Artificial (Conceitual)

**Caminho feliz**

Fluxo de teste:

    Cliente envia saudaçao ("Ola")
    IA responde solicitando o nome
    Cliente informa nome
    IA coleta interesse corretamente
    Dados sao salvos no sistema
    Cliente segue a conversa com suas dúvidas
    IA responde as dúvidas
    Ciente solicita transferencia a X setor
    IA direciona cliente ao setor correto

Validaçoes:

    Fluxo completo sem quebra
    Consistência das intenções
    Persistência correta dos dados
    Ordem correta das mensagens

**Cenário de fallback**


Entradas de exemplo:

    Mensagens aleatórias
    Emojis
    Mensagens ofensivas
    Texto vazio
    Múltiplas mensagens seguidas
    IA do cliente interagindo com nossa IA (causando conversas sem sentido e repetidas)

Esperado:

    IA não quebrar fluxo
    IA pedir reescrita da mensagem
    Fallback para humano ou mensagem padrão
    Não travar o estado da conversa
    Possivel identificaçao de outro bot/IA interagindo

---

## Questao 6 - Documentação e Reporte de Bug de Integração

**Titulo:**
Webhook de mensagens de áudio e imagem retorna HTTP 500 e interrompe fluxo do agente de IA

**Resumo do problema:**
Ao enviar mensagens do tipo áudio ou imagem via WhatsApp, o webhook da plataforma não consegue processar o payload corretamente e retorna erro HTTP 500, interrompendo completamente o fluxo do cliente no agente de IA


**Passos para reproduzir**

    Iniciar conversa com o bot via WhatsApp
    Enviar mensagem de texto → fluxo funciona corretamente
    Enviar mensagem de áudio OU imagem
    Observar resposta do webhook

**Resultado atual**

    Webhook retorna HTTP 500
    Fluxo do cliente é interrompido
    Bot não responde mais mensagens seguintes
    Usuário fica preso no estado atual da conversa

**Resultado esperado**

    Webhook deve processar mídia corretamente
    Caso não suportado:
        retornar fallback (ex: 200 OK + aviso)
        ou ignorar mensagem sem quebrar fluxo
    Fluxo do agente deve continuar ativo

**Severidade: Critica - Impacta diretamente conversão e atendimento ao cliente**

**Prioridade: Alta / Urgente**

**Sugestao de Evidencias:**
Necessário anexar os logs do backend no momento do erro, o payload recebido do WhatsApp para mensagens de áudio e imagem, o erro HTTP 500 completo (quando disponível) e evidências do impacto no fluxo, como prints de tela do chatbot travado. Também é importante incluir os dados da requisição e resposta do webhook para facilitar a reprodução e análise da falha

---

## Questao 7 - Testes de Regressão em Fluxos Dinâmicos (Conceitual)

**O que são Testes de Regressão**

Testes de regressão garantem que alterações no sistema não quebrem funcionalidades que já funcionavam anteriormente


**Aplicação no caso da IA**

Ao alterar o “prompt base” da IA para um tom mais formal, podem ocorrer impactos em:
    entendimento de intenção
    coleta de dados do cliente
    fluxo de conversa
    salvamento no banco


**Aplicação da regressão:**

    1. Reexecução de fluxos críticos
        iniciar conversa (“Olá”)
        capturar nome do cliente
        capturar interesse
        salvar dados
        encaminhar setor correto

    2. Comparação de comportamento
        antes vs depois do prompt
        verificar se a IA ainda:
            pergunta nome corretamente
            não pula etapas
            não muda lógica de fluxo

    3. Testes automatizados
        scripts simulando conversas completas
        validação de estado do fluxo
        validação de dados no banco

    4. Testes exploratórios
        mensagens fora do padrão
        variações de linguagem
        erros de digitação

**Objetivo:**

    Garantir que a mudança de linguagem:
        Não quebre o fluxo de negócio
        Não afete captura de dados
        Não altere regras funcionais