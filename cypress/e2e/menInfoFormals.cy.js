describe('Men Info - Formal Shoes Page', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/menInfoFormals'); // Change path if needed
    });
  
    it('should load the page successfully', () => {
      cy.url().should('include', '/menInfoFormals');
    });
  
    it('should display the main heading and description', () => {
      cy.contains('Men Info - Formal Shoes').should('be.visible');
      cy.contains('Formal shoes not only complete your outfit').should('be.visible');
    });
  
    it('should display all list items under formal shoes', () => {
      cy.get('ul.browser-default li').should('have.length', 4);
      cy.contains('Polished leather or suede finish');
      cy.contains('Perfect for office, weddings, or formal events');
    });
  
    it('should render 4 "When to Wear" images with correct labels', () => {
      cy.get('.when-to-wear .wear-item').should('have.length', 4);
      const labels = ['Office/work', 'Formal events', 'Business dinners', 'Ceremonies'];
      labels.forEach(label => cy.contains(label).should('be.visible'));
      cy.get('.when-to-wear .wear-item img').each(($img) => {
        cy.wrap($img).should('have.attr', 'src').and('include', '/images/MenInfoSneakers/');
      });
    });
  
    it('should display the "Explore More" placeholder section', () => {
      cy.contains('Explore More from LaceVista').should('be.visible');
      cy.contains('Coming soon: Feature comparisons, size guides, and more!').should('be.visible');
    });
  
    it('should display the customer quote and image', () => {
      cy.get('blockquote p').should('contain', 'These LaceVista formals are pure class');
      cy.get('blockquote footer').should('contain', 'BHAVISHYA');
      cy.get('blockquote').prev('img').should('have.attr', 'alt', 'Customer Review');
    });
  
  });
  