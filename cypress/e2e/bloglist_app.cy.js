describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'FirstName LastName',
      username: 'Username',
      password: 'Password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
  })
})