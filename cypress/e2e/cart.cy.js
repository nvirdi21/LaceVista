describe('Shopping Cart Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/cart'); // Update if your cart route is different
    });
  
    it('should display the Shopping Cart heading', () => {
      cy.contains('Shopping Cart').should('be.visible');
    });
  
    it('should display all cart items with details', () => {
      cy.get('.card.horizontal').should('have.length.at.least', 1); // Ensure at least 1 item
      cy.get('.card-content').each(($el) => {
        cy.wrap($el).find('h6').should('exist'); // Product name
        cy.wrap($el).contains('Price:').should('exist');
        cy.wrap($el).contains('Color:').should('exist');
      });
    });
  
    it('should allow increasing quantity of first item', () => {
      cy.get('form[action="/cart/update"]').first().within(() => {
        cy.get('button').contains('+').click();
      });
    });
  
    it('should allow decreasing quantity of first item', () => {
      cy.get('form[action="/cart/update"]').first().within(() => {
        cy.get('button').contains('-').click();
      });
    });
  
    it('should allow removing an item from the cart', () => {
      cy.get('form[action="/cart/remove"]').first().within(() => {
        cy.get('button').click();
      });
    });
  
    it('should display the summary box and total cost', () => {
      cy.get('.summary-box').within(() => {
        cy.contains('Summary').should('exist');
        cy.get('ul.collection li').should('have.length.at.least', 1);
        cy.contains('Total: $').should('exist');
      });
    });
  
    it('should have a Proceed to Checkout button', () => {
      cy.get('.checkout-btn')
        .should('be.visible')
        .and('have.attr', 'href', '/checkout');
    });
  });
  
