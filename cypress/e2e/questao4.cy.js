describe('API de Estoque de Produto (Mock)', () => {
  it('deve validar retorno de estoque com sucesso', () => {

    // Mock da API
    cy.intercept('GET', '/api/v1/produtos/1/estoque?cor=Preto&tamanho=GG', {
      statusCode: 200,
      body: {
        produto_id: 1,
        cor: 'Preto',
        tamanho: 'GG',
        quantidade_disponivel: 10
      }
    }).as('getEstoque')

    // Request simulada
    cy.request('/api/v1/produtos/1/estoque?cor=Preto&tamanho=GG')
      .then((response) => {

        expect(response.status).to.eq(200)

        expect(response.body).to.have.property('quantidade_disponivel')

        expect(response.body.quantidade_disponivel)
          .to.be.a('number')

      })
  })
})