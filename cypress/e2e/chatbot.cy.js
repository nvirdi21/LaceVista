describe('Chatbot Widget UI Tests', () => {
    beforeEach(() => {
      // Visit the page where the chatbot exists
      cy.visit('/your-chatbot-page'); // Replace with actual route
    });
  
    it('should display the chatbot widget on load', () => {
      cy.get('#chat-widget').should('be.visible');
      cy.get('.chat-header').should('exist');
      cy.get('.chatbot-logo').should('be.visible');
      cy.contains('Chatbot');
    });
  
    it('should toggle chat main container when clicking the toggle button', () => {
      // Initially hidden
      cy.get('#chat-main-container').should('not.be.visible');
  
      // Click to open
      cy.get('#close-chatbot').click();
      cy.get('#chat-main-container').should('be.visible');
  
      // Click again to hide
      cy.get('#close-chatbot').click();
      cy.get('#chat-main-container').should('not.be.visible');
    });
  
    it('should display initial bot message when opened', () => {
      cy.get('#close-chatbot').click();
      cy.get('.bot-message .message-text')
        .should('contain', 'Hey there')
        .and('contain', 'How can I help you today?');
    });
  
    it('should allow user to type a message', () => {
      cy.get('#close-chatbot').click();
      cy.get('#message-input-id').type('Hello, bot!');
      cy.get('#message-input-id').should('have.value', 'Hello, bot!');
    });
  
    it('should submit user message and clear input', () => {
      cy.get('#close-chatbot').click();
      cy.get('#message-input-id').type('Is anyone there?');
      cy.get('#send-message').click();
  
      // Input should be cleared after submission
      cy.get('#message-input-id').should('have.value', '');
    });
  
    it('should have file upload input and trigger on button click', () => {
      cy.get('#close-chatbot').click();
  
      // Stub the file input click
      cy.get('#file-upload').click();
      cy.get('#file-input').should('exist');
    });
  
    it('should cancel file upload when file cancel button is clicked', () => {
      cy.get('#close-chatbot').click();
      cy.get('#file-cancel').click();
      // You can add behavior here to confirm file selection is cleared
    });
  });
  
  