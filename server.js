const express = require('express');
require('./config/config');
const cors = require('cors');
const swagger = require('./swagger'); // Import the Swagger configuration
require('dotenv').config();

const app = express();
const userRouter = require('./routers/userRouter');

app.use(cors());
app.use(express.json());

// Use the Swagger middleware
app.use('/api-docs', swagger.serveSwagger, swagger.setupSwagger);

app.use('/api/v1', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome to your API!');
  });

const port = process.env.port;

app.listen(port, () => {
  console.log(`This server is listening on port: ${port}`);
});
