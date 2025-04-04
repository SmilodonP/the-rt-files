
describe('Main Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies', {
      statusCode: 200,
      fixture: 'movie_posters'
    })
    cy.visit('http://localhost:3000/')
  })
  
  it('displays complete header on page load', () => {  
    cy.get('h1').contains('The RT Files')
    cy.get('h3').contains('Movies Exist')
    cy.get('[data-cy="plainLogo"]').should('have.attr', 'src', '/static/media/RT_logo.ef99034c404c91578cb9.png')
  })

  it('displays the movie cards with appropriate data on page load', () =>{
    cy.get('.movie-card').first().should('exist')
    cy.get('.movie-card').first().find('.movieImage').should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg')
    cy.get('.movie-card').first().find('.vote-count').contains(32544)
    cy.get('.movie-card').first().find('.upvote').should('be.visible').and('not.be.disabled')
    cy.get('.movie-card').first().find('.downvote').should('be.visible').and('not.be.disabled')

    cy.get('.movie-card').eq(3).should('exist')
    cy.get('.movie-card').eq(3).find('.movieImage').should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg')
    cy.get('.movie-card').eq(3).find('.vote-count').contains(27642)
    cy.get('.movie-card').eq(3).find('.upvote').should('be.visible').and('not.be.disabled')
    cy.get('.movie-card').eq(3).find('.downvote').should('be.visible').and('not.be.disabled')
  })

  it('the first movie card downvote button updates the vote count', ()=>{
    cy.intercept('PATCH', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/155', {
      statusCode: 200,
      fixture: 'dark_knight'
    }).as('interception')
    cy.get('.movie-card').first().find('.vote-count').contains(32544)
    cy.get('.movie-card').first().find('.downvote').click()
      .wait('@interception')
    cy.get('.movie-card').first().find('.vote-count').should('contain', 32543)
  })

  it('the first movie card upvote button updates the vote count', ()=>{
    cy.intercept('PATCH', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/155', {
      statusCode: 200,
      fixture: 'dark_knight_up'
    }).as('interception')
    cy.get('.movie-card').first().find('.vote-count').contains(32544)
    cy.get('.movie-card').first().find('.upvote').click()
      .wait('@interception')
    cy.get('.movie-card').first().find('.vote-count').contains(32545)
  })
  
  it('the last movie card has vote buttons that change the vote count', ()=>{
    cy.intercept('PATCH', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/680', {
      statusCode: 200,
      fixture: "pulp_fiction"
    }).as('interception2')
    cy.get('.movie-card').eq(3).find('.vote-count').contains(27642)
    cy.get('.movie-card').eq(3).find('.downvote').click()
      .wait('@interception2')
    cy.get('.movie-card').eq(3).find('.vote-count').should('contain', 27641)
  })
    
  it('the last movie card has vote buttons that change the vote count', ()=>{
    cy.intercept('PATCH', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/680', {
      statusCode: 200,
      fixture: "pulp_fiction_up"
    }).as('interception2')
    cy.get('.movie-card').eq(3).find('.vote-count').contains(27642)
    cy.get('.movie-card').eq(3).find('.upvote').click()
      .wait('@interception2')
    cy.get('.movie-card').eq(3).find('.vote-count').should('contain', 27643)
  })

  it('takes the user to a movie details page when poster is clicked', ()=>{
    cy.intercept('GET', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/155', {
      statusCode: 200,
      fixture: 'movie_details'
    })
    cy.get('.movie-card').first().find('.movieImage').click()
    cy.url().should('include', '/155')
  })
})