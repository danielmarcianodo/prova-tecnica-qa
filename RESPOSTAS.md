# PROVA TECNICA - ANALISTA DE QUALIDADE (QA)

## DANIEL MARCIANO DE OLIVEIRA

-----

## Questao 1 - Engenharia de Testes e Analise de Cenarios 

**Feature: Vendas de roupas com grade inteligente**

	Como lojista 
	Quero vender roupas com diferentes tamanhos e cores
	Para controlar corretamente o estoque de cada variação

---

**Scenario: Exibir variações disponíveis do produto**

    Given que existe o produto "Camiseta Polo"
    And o produto possui as cores "Azul" e "Preto"
    And o produto possui os tamanhos "P", "M", "G" e "GG"
    When o cliente selecionar o produto "Camiseta Polo"
    Then o sistema deve exibir as variações de cor disponíveis
    And o sistema deve exibir as variações de tamanho disponíveis

---

**Scenario: Adicionar ao carrinho uma variação com estoque disponível**

    Given que existe o produto "Camiseta Polo"
    And a variação "Azul" tamanho "M" possui 10 unidades em estoque
    When o cliente selecionar a cor "Azul" e o tamanho "M"
    And adicionar o produto ao carrinho
    Then o produto deve ser adicionado ao carrinho com sucesso

---

**Scenario: impedir compra de variação sem estoque**

	Given que existe um produto "Camiseta polo"
	And a variação "Azul" tamanho "G" possui 0 unidades em estoque
	When o cliente selecionar a cor "Azul" e o tamanho "G"
    And adicionar o produto ao carrinho
	Then o sistema deve informar que a variação selecionada está indisponível
	And o produto não deve ser adicionado ao carrinho

---

**Scenario: permitir compra de outras variaçoes quando uma estiver sem estoque**

    Given que existe o produto "Camiseta Polo"
    And a variação "Preto" tamanho "GG" possui 0 unidades em estoque
    And a variação "Preto" tamanho "G" possui 5 unidades em estoque
    When o cliente selecionar a cor "Preto" e o tamanho "G"
    And adicionar o produto ao carrinho
    Then o produto deve ser adicionado ao carrinho com sucesso

---

**Scenario: reduzir estoque após a confirmaçao da venda**

    Given que existe o produto "Camiseta Polo"
    And a variacao "Azul" tamanho "P" possui 5 unidades em estoque
    When o cliente comprar 2 unidades da variaçao "Azul" tamanho "P"
    Then a venda deve ser concluída com sucesso
    And o estoque da variaçao "Azul" tamanho "P" deve ser atualizado para 3 unidades

---

**Scenario: impedir compra de quantidade superior ao estoque disponivel**

    Given que existe o produto "Camiseta Polo"
    And a variacao "Azul" tamanho "G" possui 3 unidades em estoque
    When o cliente tentar comprar 5 unidades da variacao "Azul" tamanho "G"
    Then o sistema deve informar que a quantidade solicitada é maior que o estoque dísponivel
    And a venda nao deve ser concluída

---

**Scenario: Impedir adição ao carrinho sem selecionar tamanho e cor**

    Given que existe o produto "Camiseta Polo"
    When o cliente tentar adicionar o produto ao carrinho sem selecionar uma cor e um tamanho
    Then o sistema deve informar que a seleção das variações é obrigatória
    And o produto não deve ser adicionado ao carrinho

---

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

**Titulo**

    Issue: Preço da variação "Preto + GG" é exibido como R$ 0,00 no carrinho e permite checkout sem cobrança

---

**Ambiente**

    - Homologaçao
    - Módulo: E-commerce / Carrinho de compras

---

**Passos para reproduzir**

    1. Acessar o produto "Camiseta Polo"
    2. Selecionar a cor "Preto"
    3. Selecionar o tamanho "GG"
    4. Adicionar o produto ao carrinho
    5. Ir para o carrinho
    6. Prosseguir para o checkout

---

**Resultado esperado**

    O produto deve manter o valor de R$ 89,90 e a compra deve ser processada com cobrança correta.

---

**Resultado atual**

    O valor do produto é exibido como R$ 0,00 no carrinho e o checkout é finalizado sem cobrança.

---

**Severidade: Critical - Financeiro e regra de negócio quebrada**

Considerando que clientes poderiam usar isso de má fé, realizando várias compras do produto de forma "gratuita", o que geraria um grande prejuízo para a empresa

---

**Prioridade: Alta / Urgente**

---

**Sugestao de Evidencias**

Um vídeo reproduzindo o comportamento do bug, realizando todos os passos necessários (desde selecionar o produto até realizar o pagamento), testando todos os meios de pagamento, seja cartão, pix ou boleto, para validar se a compra é de fato realizada com o valor R$0,00 ou no valor correto do produto (pois pode ser apenas um BUG visual no valor mostrado e não o valor real do produto)

---