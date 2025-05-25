describe('Heels Collection Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/heels');
    });
  
    it('should load the page and display the hero section', () => {
      cy.contains('Elegance in Every Step');
      cy.contains("Women's Heels Collection");
      cy.contains('Shop Now');
    });
  
    it('should scroll to guide section on "Shop Now" click', () => {
      cy.get('a.btn-large').click();
      cy.url().should('include', '#guide');
    });
  
    it('should display all 4 heel category cards with images and names', () => {
      const categories = ['Classic Pumps', 'Block Heels', 'Stilettos', 'Kitten Heels'];
  
      categories.forEach((category) => {
        cy.contains(category).should('be.visible');
      });
  
      cy.get('.card-image img').should('have.length', 4);
    });
  
    const modals = [
      { id: '#modal1', name: 'Classic Pumps' },
      { id: '#modal2', name: 'Block Heels' },
      { id: '#modal3', name: 'Stilettos' },
      { id: '#modal4', name: 'Kitten Heels' }
    ];
  
    modals.forEach(({ id, name }) => {
      it(`should open and close modal for ${name}`, () => {
        cy.contains(name).parent().find('a.modal-trigger').click();
        cy.get(id).should('be.visible');
        cy.get(`${id} .modal-close`).click();
        cy.get(id).should('not.be.visible');
      });
  
      it(`should show "Style Guide" text inside ${name} modal`, () => {
        cy.contains(name).parent().find('a.modal-trigger').click();
        cy.get(id).contains('Style Guide');
        cy.get(`${id} .modal-close`).click();
      });
  
      it(`should show an image in ${name} modal`, () => {
        cy.contains(name).parent().find('a.modal-trigger').click();
        cy.get(`${id} img`).should('have.class', 'responsive-img');
        cy.get(`${id} .modal-close`).click();
      });
    });
  
    it('should initialize modals and materialboxed images', () => {
      cy.window().then((win) => {
        expect(win.M).to.exist;
        expect(win.M.Modal).to.exist;
        expect(win.M.Materialbox).to.exist;
      });
    });
  });
  