const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const glob = require('glob');
const path = require('path');
const { User } = require('./schema');
const responses = require('./response');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: 'https://task-management-luay.onrender.com', // Change this to your API base URL
      },
    ],
    components: {
      schemas: {
        User,
      },
    },
    responses,
  },
  apis: glob.sync(path.resolve(__dirname, './routers/*.js')), // Use glob to find all router files
};

const specs = swaggerJsdoc(options);

module.exports = {
  serveSwagger: swaggerUi.serve,
  setupSwagger: swaggerUi.setup(specs),
};
