// https://docs.cypress.io/api/introduction/api.html

describe('App', () => {
  it('Visits the login view', () => {
    cy.visit('/');
    cy.get('[data-testid="login-email"]').clear().type('');
    cy.get('[data-testid="login-password"]').clear().type('');
    cy.get('[data-testid="login-submit"]').click();
    cy.contains('Home');
  });

  it('Visits the register view', () => {
    cy.visit('/');
    cy.get('[data-testid="login-register"]').click();
    cy.contains('Registrarse');
  });

  it('Visits the reset password view', () => {
    cy.visit('/');
    cy.get('[data-testid="login-reset-password"]').click();
    cy.contains('Recuperar contraseña');
  });
});
