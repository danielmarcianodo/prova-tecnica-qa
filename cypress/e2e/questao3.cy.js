    describe('Sauce Demo - Fluxo de compra básico', () => {

  it('deve fazer login, adicionar produto ao carrinho e validar no carrinho', () => {

    // Acessar o site
    cy.visit('https://www.saucedemo.com')

    // Fazer login
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // Validar que entrou na área de produtos
    cy.url().should('include', '/inventory')
    cy.contains('Products').should('be.visible')

    // Adicionar produto ao carrinho
    cy.contains('Sauce Labs Backpack')
      .parents('.inventory_item')
      .within(() => {
        cy.contains('Add to cart').click()
      })

    // Ir para o carrinho
    cy.get('.shopping_cart_link').click()

    // Validar que o produto está no carrinho
    cy.contains('Sauce Labs Backpack').should('be.visible')

  })
  
})
