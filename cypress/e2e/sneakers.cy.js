describe('Sneakers Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sneakers')
  })

  it('should display the hero section with correct headings and button', () => {
    cy.get('.hero-section-sneakers h1').should('contain', 'Step Up in Style');
    cy.get('.hero-section-sneakers h4').should('contain', 'Explore our top picks');
    cy.get('.hero-section-sneakers a.btn').should('contain', 'Sneaker Guide').and('have.attr', 'href', '#guide');
  });

  it('should render 3 sneaker cards with correct content', () => {
    cy.get('.card').should('have.length', 3);

    const sneakers = [
      'Nike Air Max Bliss',
      'Adidas Ultraboost Pulse',
      'Puma Nova Glow'
    ];

    sneakers.forEach(name => {
      cy.contains('.card-title', name).should('exist');
    });
  });

  it('should open and close modals when "View Details" is clicked', () => {
    cy.get('.card-action .modal-trigger').each(($btn, index) => {
      cy.wrap($btn).click();
      cy.get(`#modal${index}`).should('be.visible');
      cy.get(`#modal${index} .modal-footer .modal-close`).click();
    });
  });

  it('should display the sneaker style guide with correct tips', () => {
    cy.get('#guide h4').should('contain', 'How to Style Your Sneakers');

    const tips = [
      'Pair white sneakers with dresses for a chic day look.',
      'Wear colorful sneakers to brighten up monochrome outfits.',
      'Choose sleek, low-cut sneakers for a minimalist style.'
    ];

    tips.forEach(tip => {
      cy.contains('.collection-item', tip).should('exist');
    });
  });
})