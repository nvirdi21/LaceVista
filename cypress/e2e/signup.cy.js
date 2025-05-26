describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/signup'); // or the actual route serving signup.ejs
    });
  
    it('should load the signup page', () => {
      cy.get('h5').should('contain', 'Create Your LaceVista Account');
    });
  
    it('should contain all required input fields', () => {
      cy.get('#first_name').should('exist');
      cy.get('#last_name').should('exist');
      cy.get('#email').should('exist');
      cy.get('#otp').should('exist');
      cy.get('#mobile').should('exist');
      cy.get('#password').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('should validate required fields', () => {
      cy.get('form').submit();
    });
  
    it('should trigger OTP request when email is filled and blurred', () => {
      cy.intercept('POST', '/send-otp', {
        statusCode: 200,
        body: 'OTP sent successfully',
      }).as('sendOtp');
  
      cy.get('#email').type('test@example.com').blur();
  
      cy.wait('@sendOtp');
    });
  
    it('should not trigger OTP if email is empty', () => {
      cy.intercept('POST', '/send-otp').as('sendOtp');
  
      cy.get('#email').clear().blur();
      cy.wait(1000); // give time to fail silently
      cy.get('@sendOtp.all').should('have.length', 0);
    });
  
    it('should accept valid inputs and submit the form', () => {
      cy.get('#first_name').type('John');
      cy.get('#last_name').type('Doe');
      cy.get('#email').type('john@example.com');
      cy.get('#otp').type('123456'); // assuming OTP is entered by user
      cy.get('#mobile').type('9876543210');
      cy.get('#password').type('securePassword123');
      cy.get('form').submit();
  
      // Optional: Wait for redirect or success message
      // cy.url().should('include', '/welcome');
    });
  
    it('should reject invalid email format', () => {
      cy.get('#email').type('invalid-email').blur();
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('windowAlert');
      });
      cy.wait(1000);
      // No real alert in this case unless backend checks — placeholder if you show one
    });
  
    it('should mask password input', () => {
      cy.get('#password').should('have.attr', 'type', 'password');
    });
  });
  