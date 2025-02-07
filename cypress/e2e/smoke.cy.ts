describe('Smoke Test', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.get('main').should('exist');
  });

  it('should have correct meta title', () => {
    cy.visit('/');
    cy.title().should('include', 'Portfolio');
  });
}); 