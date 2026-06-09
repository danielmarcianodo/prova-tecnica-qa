Cypress.Commands.add('login', (user, pass) => {
  cy.get('#user-name').type(user)
  cy.get('#password').type(pass)
  cy.get('#login-button').click()
})