const express = require('express');
const middleware = require('./middleware/middleware.js')
const userRouter = require('./users/users-router.js')
const { 
  logger,
  validateUserId,
  validateUser,
  validatePost
} = require('./middleware/middleware.js')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use('/api/users', userRouter);
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
