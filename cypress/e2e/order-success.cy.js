// cypress/e2e/signup.cy.js

describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/signup'); // Adjust if your signup URL is different
    });
  
    it('should load signup page correctly', () => {
      cy.contains('Create Your LaceVista Account').should('be.visible');
    });
  
    it('should allow user to fill and submit signup form', () => {
      // Click inputs first to remove label covering, then type
      cy.get('#first_name').click().type('John');
      cy.get('#last_name').click().type('Doe');
      cy.get('#email').click().type('john.doe@example.com');
      cy.get('#mobile').click().type('1234567890');
      cy.get('#password').click().type('Password123!');
  
      // OTP is optional, so you can leave it blank or test it separately
  
      cy.get('form').submit();
  
      // You can add assertions here based on expected behavior after submit,
      // e.g., URL change, success message, redirect, etc.
    });
  });
  