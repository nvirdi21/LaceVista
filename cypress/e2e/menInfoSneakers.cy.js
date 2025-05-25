describe('Men Info - Sneakers Page', () => {

    beforeEach(() => {
      cy.visit('/menInfoSneakers'); // Adjust if route is different
    });
  
    it('should load the sneakers page successfully', () => {
      cy.url().should('include', '/menInfoSneakers');
      cy.title().should('not.be.empty');
    });
  
    it('should display the main hero section with image and content', () => {
      cy.get('h2').should('contain', 'Men Info - Sneakers');
      cy.contains("Sneakers are the ultimate mix of comfort and style").should('be.visible');
    });
  
    it('should list all sneaker benefits', () => {
      const features = [
        'Trendy designs that match casual wear',
        'Lightweight build for everyday use',
        'Available in various colors and materials',
        'Breathable fabric for all-day comfort'
      ];
      features.forEach(text => cy.contains('li', text).should('be.visible'));
    });
  
    it('should display 4 "When to Wear" sneaker contexts with images and labels', () => {
      cy.get('.when-to-wear h4').should('contain', 'When to Wear');
      cy.get('.when-to-wear .wear-item').should('have.length', 4);
  
      const items = [
        { alt: 'Casual hangouts', label: 'Casual hangouts' },
        { alt: 'Uni classes', label: 'Uni classes' },
        { alt: 'Travel and weekend plans', label: 'Travel and weekend plans' },
        { alt: 'Casual Day', label: 'With jeans, joggers, or even casual suits!' }
      ];
  
      items.forEach(({ alt, label }) => {
        cy.get(`img[alt="${alt}"]`).should('exist');
        cy.contains(label).should('be.visible');
      });
    });
  
    it('should show the "Explore More" placeholder section', () => {
      cy.get('.container.center-align h4').should('contain', 'Explore More from LaceVista');
      cy.contains('Coming soon: Feature comparisons, size guides, and more!').should('be.visible');
    });
  
    it('should show customer review block with quote and image', () => {
      cy.get('blockquote p').should('contain', "The LaceVista sneakers are perfect for my daily college runs and weekend hangouts");
      cy.get('blockquote footer').should('contain', 'BHAVISHYA');
      cy.get('img[alt="Customer Review"]').should('exist');
    });
  
  });
  