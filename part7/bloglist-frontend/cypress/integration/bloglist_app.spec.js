describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'testUser',
      password: 'password',
      name: 'Test User',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testUser')
      cy.get('#password').type('password')
      cy.get('#login-btn').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testUser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-btn').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'testUser', password: 'password' })
      })

      it('a new blog can be added', function () {
        cy.contains('New blog').click()

        cy.get('#title').type('Blog title from Cypress')
        cy.get('#author').type('Cypress author')
        cy.get('#url').type('http://blogurl.com')
        cy.get('#create-blog-form').contains('Create').click()

        cy.get('.success')
          .should('contain', 'New blog created')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.should('contain', 'Blog title from Cypress')
        cy.should('contain', 'Cypress author')
      })

      describe('and one blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Another blog from Cypress',
            author: 'Cypress author',
            url: 'http://cypresstestingblogapp.nice',
          })
        })

        it('it is possible to add a like to a blog', function () {
          cy.get('.blog').contains('view').click()
          cy.get('.blog-details').should('contain', '0 likes')
          cy.addLike('Another blog from Cypress')
          cy.get('.blog-details').should('contain', '1 like')
        })

        it('it is possible to delete a blog if it was created by the same user', function () {
          cy.get('.blog').contains('view').click()
          cy.get('.blog-details').contains('delete').click()
          cy.should('not.contain', 'Another blog from Cypress')
        })
      })

      describe('and multiple blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Blog from Cypress - number 1',
            author: 'Cypress author',
            url: 'http://cypresstestingblogapp.nice',
          })
            .then(() =>
              cy.createBlog({
                title: 'Blog from Cypress - number 2',
                author: 'Cypress author',
                url: 'http://cypresstestingblogapp.nice',
                likes: 1,
              })
            )
            .then(() =>
              cy.createBlog({
                title: 'Blog from Cypress - number 3',
                author: 'Cypress author',
                url: 'http://cypresstestingblogapp.nice',
                likes: 2,
              })
            )
        })

        it('blogs are ordered by number of likes', function () {
          cy.get('.blog>span.blog-title').then((blogs) => {
            expect(blogs[0].textContent).to.equal('Blog from Cypress - number 3')
            expect(blogs[1].textContent).to.equal('Blog from Cypress - number 2')
            expect(blogs[2].textContent).to.equal('Blog from Cypress - number 1')
          })
        })
      })
    })
  })
})
