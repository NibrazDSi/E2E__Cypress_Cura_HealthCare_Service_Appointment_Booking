const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity:false,
  // reporter: 'cypress-mochawesome-reporter',
  e2e: {
    // baseUrl:"https://mvc.netfacilities.com/",
    watchForFileChanges:false,
    autoRefresh:false,
    // testIsolation:false,
    // defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
      // require('cypress-mochawesome-reporter/plugin')(on);
      config.specPattern = [
        'cypress/e2e/appointmentBooking.cy.js', 
      ]
      return config;
    },
  },
});