const userA = {
  name: 'FirstNameA LastNameA',
  username: 'UsernameA',
  password: 'PasswordA',
}

describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', userA)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name=Username]').type(userA.username)
      cy.get('input[name=Password]').type(userA.password)
      cy.contains('login').click()

      cy.contains(`${userA.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name=Username]').type(userA.username)
      cy.get('input[name=Password]').type('wrong password')
      cy.contains('login').click()

      cy.contains('Wrong credentials')
      cy.contains(`${userA.name} logged in`).should('not.exist')
    })
  })
})
