describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login'); // Update path if needed
    });
  
    it('should display the login form', () => {
      cy.contains('Login to').should('be.visible');
      cy.get('form[action="/loginUser"]').should('exist');
    });
  
    it('should allow user to enter email and password', () => {
      cy.get('input[name="email"]').type('test@example.com', { force: true });
      cy.get('input[name="password"]').type('securepassword', { force: true });
    });
  
    it('should submit the login form', () => {
      cy.get('input[name="email"]').type('test@example.com', { force: true });
      cy.get('input[name="password"]').type('securepassword', { force: true });
      cy.get('form[action="/loginUser"]').submit();
    });
  
    it('should have social login and signup buttons', () => {
      cy.contains('Continue with Google').should('be.visible');
      cy.contains('Sign Up').should('have.attr', 'href', '/signup');
    });
  
    it('should have forgot password link', () => {
      cy.contains('Forgot Password?').should('have.attr', 'href', '/forgot-password');
    });
  });
  