describe('Login Page', function () {
  it('logged in user should create course', function () {
    cy.visit('/login');

    cy.get('#username input').type('user1');
    cy.get('#password input').type('wikonnect');

    cy.get('.submit').click();
    cy.visit('/cms-desktop');

  });

});