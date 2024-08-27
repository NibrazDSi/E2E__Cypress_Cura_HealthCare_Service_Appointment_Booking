

describe('CURA Healthcare Service Appointment Booking', () => {
  const baseUrl = 'https://katalon-demo-cura.herokuapp.com/';
  const username = 'John Doe'; // Replace with valid credentials if necessary
  const password = 'ThisIsNotAPassword'; // Replace with valid credentials if necessary

  // Hooks
  before(() => {
    // Before all tests, visit the base URL
    cy.visit(baseUrl);
    cy.get('#menu-toggle').click(); // Open the side menu
    cy.get('a[href="profile.php#login"]').click(); // Click on the login link
    cy.waitForElementVisible('#txt-username'); // Use custom command to wait for the username input
  });

  it('Validate that user is able to book appointment', () => {

    cy.get('#txt-username').type(username); // Enter username
    cy.get('#txt-password').type(password); // Enter password
    cy.get('#btn-login').click(); // Click login button

    // Assert successful login by checking for "Make Appointment" heading
    cy.waitForElementVisible('h2'); 
    cy.get('h2').should('contain', 'Make Appointment');


    // Select Facility
    cy.get('#combo_facility').select('Seoul CURA Healthcare Center');

    // Check "Apply for hospital readmission"
    cy.get('#chk_hospotal_readmission').check();

    // Select Healthcare Program as Medicaid
    cy.get('#radio_program_medicaid').check();

    // Select a visiting date
    cy.get('#txt_visit_date').click();
    cy.get('.day').contains('15').click(); // Selecting 15th of the month as an example

    // Add a comment
    cy.get('#txt_comment').type('This is a test appointment.');

    // Book an appointment
    cy.get('#btn-book-appointment').click();

    // Assert the appointment confirmation page is displayed
    cy.waitForElementVisible('h2');
    cy.get('h2').should('contain', 'Appointment Confirmation');

        // Verify the appointment details on the confirmation page
    cy.get('#facility').should('contain', 'Seoul CURA Healthcare Center');
    cy.get('#hospital_readmission').should('contain', 'Yes');
    cy.get('#program').should('contain', 'Medicaid');
    cy.get('#visit_date').should('contain', '15');
    cy.get('#comment').should('contain', 'This is a test appointment.');
  });

  after(() => {
    // After each test, logout if logged in
    cy.get('#menu-toggle').click(); // Open the side menu
    cy.get('a[href="authenticate.php?logout"]').click(); // Click on the logout link
    // cy.window().then((win) => {
    //   cy.stub(win, 'alert').as('alertStub');
    // });    
    // cy.on('window:alert', (alertText) => {
    //   // This will automatically accept the alert
    //   // If you want, you can check the alertText here
    //   expect(alertText).to.contains('Change Your Password');
    //   return true; // Simulates clicking "Ok"
    // });
  });
});
