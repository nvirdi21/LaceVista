describe('Men Info Sports Page Tests', () => {
    beforeEach(() => {
      // Use the exact route you found
      cy.visit('/menInfoSports');
    });
  
    it('should display the main heading with bold Sports Shoes', () => {
      cy.contains('h2', 'Men Info -').should('be.visible');
      cy.get('h2 b').contains('Sports Shoes').should('exist');
    });
  
    it('should display the sports shoe image with alt text', () => {
      cy.get('section.container img[alt="Sports Shoe"]').should('be.visible');
    });
  
    it('should show the list with correct bullet points', () => {
      const expectedItems = [
        'Support for your sport: running, gym, or field games',
        'Breathable and lightweight design',
        'Durable grip for all surfaces',
        'Comfort cushioning for shock absorption'
      ];
  
      cy.get('ul.browser-default li').each(($el, index) => {
        cy.wrap($el).should('contain.text', expectedItems[index]);
      });
    });
  
    it('should have a "When to Wear" section with 4 wear items', () => {
      cy.get('section.when-to-wear h4').contains('When to Wear').should('be.visible');
  
      const wearItems = ['Gym', 'Jogging', 'Sports Event', 'Casual Day'];
  
      cy.get('section.when-to-wear .wear-item').should('have.length', 4);
  
      wearItems.forEach((item, i) => {
        cy.get('section.when-to-wear .wear-item').eq(i).within(() => {
          cy.get('img').should('be.visible');
          cy.get('p').contains(item);
        });
      });
    });
  
    it('should show "Explore More from LaceVista" section with correct text', () => {
      cy.get('section.section').contains('Explore More from LaceVista').should('be.visible');
      cy.get('section.section p.grey-text').contains('Coming soon: Feature comparisons, size guides, and more!').should('be.visible');
    });
  
    it('should display customer review with quote image and blockquote text', () => {
      cy.get('section.section.center-align img[alt="Customer Review"]').should('be.visible');
      cy.get('blockquote p').should('contain.text', 'I’ve been using the LaceVista PulseRunner 3000');
      cy.get('blockquote footer').should('contain.text', '— BHAVISHYA');
    });
  });
  