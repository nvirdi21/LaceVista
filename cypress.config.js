const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: (on, config) => {
      // you can leave this empty or add plugins later
      return config;
    },
  },
});
