const BACKEND = Cypress.env('BACKEND')

const userA = {
  name: 'FirstNameA LastNameA',
  username: 'UsernameA',
  password: 'PasswordA',
}

describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', `${BACKEND}/testing/reset`)
    cy.request('POST', `${BACKEND}/users/`, userA)

    cy.visit('')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: userA.username, password: userA.password })
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()

      const newBlog = {
        title: 'Title',
        author: 'Author',
        url: 'Url',
      }
      cy.get('input[name=Title]').type(newBlog.title)
      cy.get('input[name=Author]').type(newBlog.author)
      cy.get('input[name=Url]').type(newBlog.url)
      cy.get('button').contains('create').click()

      cy.get('.blog').contains(`${newBlog.title} ${newBlog.author}`)
    })
  })
})
