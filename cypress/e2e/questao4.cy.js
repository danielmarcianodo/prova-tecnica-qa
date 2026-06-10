const path = require('path')

describe('API de Estoque de Produto (Mock)', () => {
  it('deve validar retorno de estoque com sucesso', () => {

    cy.intercept('GET', '**/api/v1/produtos/1/estoque*', {
      statusCode: 200,
      body: {
        produto_id: 1,
        cor: 'Preto',
        tamanho: 'GG',
        quantidade_disponivel: 10
      }
    }).as('getEstoque')

    // Caminho absoluto para o arquivo local
    cy.visit('cypress/fixtures/blank.html', { failOnStatusCode: false })

    cy.window().then((win) => {
      return win.fetch('/api/v1/produtos/1/estoque?cor=Preto&tamanho=GG')
        .then((res) => res.json())
        .then((body) => {
          expect(body).to.have.property('produto_id', 1)
          expect(body).to.have.property('cor', 'Preto')
          expect(body).to.have.property('tamanho', 'GG')
          expect(body).to.have.property('quantidade_disponivel', 10)
          expect(body.quantidade_disponivel).to.be.a('number')
        })
    })

    cy.wait('@getEstoque').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })
})