require('dotenv').config();

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // You can access config.env here if needed
    }
  },
  env: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY
  }
});
