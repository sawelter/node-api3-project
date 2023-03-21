const express = require('express');
const Users = require('./users-model.js')
const Posts = require('../posts/posts-model.js')

const mid = require('../middleware/middleware.js')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', mid.logger, async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try { 
    const users = await Users.get();
    res.status(200).json(users)
  } catch(err) {
    res.status(400).json({message:`Problem retrieving users data`})
  }
});


router.get('/:id', [mid.logger, mid.validateUserId] ,async (req, res) => {
  // RETURN THE USER OBJECT
  res.json(req.user);
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', [mid.logger, mid.validateUserId], (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', [mid.logger, mid.validateUserId], (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', [mid.logger, mid.validateUserId], (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', [mid.logger, mid.validateUserId], (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;