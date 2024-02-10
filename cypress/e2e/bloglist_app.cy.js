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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name=Username]').type('Username')
      cy.get('input[name=Password]').type('Password')
      cy.contains('login').click()

      cy.contains('FirstName LastName logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name=Username]').type('Username')
      cy.get('input[name=Password]').type('wrong password')
      cy.contains('login').click()

      cy.contains('Wrong credentials')
      cy.contains('FirstName LastName logged in').should('not.exist')
    })
  })
})