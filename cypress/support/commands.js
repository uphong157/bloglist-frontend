Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username: username, password: password
  }).then(response => {
    localStorage.setItem('loggedInUser', JSON.stringify(response.body))
    cy.visit('')
  })
}) 