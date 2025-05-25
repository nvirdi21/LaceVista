describe('Flats Collection Page', () => {
    beforeEach(() => {
      cy.visit('/flats'); // Make sure baseUrl is set in cypress.config.js
    });
  
    it('should load the hero section with correct text', () => {
      cy.get('.flats-hero').should('exist');
      cy.get('.hero-content-flats h1').should('contain', 'Walk Your Way');
      cy.get('.hero-content-flats p').should('contain', 'Minimal, chic, and comfortable');
      cy.get('.hero-content-flats a').should('contain', 'Shop Now').click();
      cy.url().should('include', '#collection');
    });
  
    it('should display all flats in the product grid', () => {
      cy.get('.grid-layout .product-card').should('have.length', 3); // Update if more flats are added
    });
  
    it('each product should have image, name, description, and price', () => {
      cy.get('.product-card').each(($card) => {
        cy.wrap($card).find('img').should('exist');
        cy.wrap($card).find('h6').should('not.be.empty');
        cy.wrap($card).find('p').first().should('not.be.empty');
        cy.wrap($card).find('.price').should('contain', '$');
      });
    });
  
    it('should open and close product modals correctly', () => {
      cy.get('.modal-trigger').each(($btn, index) => {
        cy.wrap($btn).click();
        cy.get(`#modal${index}`).should('be.visible');
        cy.get(`#modal${index} .modal-close`).click();
      });
    });
  
    it('should load the style guide section with all 3 columns', () => {
      cy.get('.style-guide').should('exist');
      cy.get('.style-guide .col').should('have.length', 3);
      cy.get('.style-guide h6').eq(0).should('contain', 'How');
      cy.get('.style-guide h6').eq(1).should('contain', 'When');
      cy.get('.style-guide h6').eq(2).should('contain', 'Where');
    });
  });
  