const express = require('express');
const Users = require('./users-model.js')
const Posts = require('../posts/posts-model.js')
const mid = require('../middleware/middleware.js')

const router = express.Router();


// RETURN AN ARRAY WITH ALL THE USERS
router.get('/', mid.logger, async (req, res) => {
  try { 
    const users = await Users.get();
    res.status(200).json(users)
  } catch(err) {
    res.status(400).json({message:`Problem retrieving users data`})
  }
});

// RETURN THE USER OBJECT
router.get('/:id', [mid.logger, mid.validateUserId], async (req, res) => {
  res.json(req.user);
});

// RETURN THE NEWLY CREATED USER OBJECT
router.post('/', [mid.logger, mid.validateUser], (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next)
});


// RETURN THE FRESHLY UPDATED USER OBJECT
router.put('/:id', [mid.logger, mid.validateUserId, mid.validateUser], (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  Users.update(id, {name: name})
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});


// RETURN THE FRESHLY DELETED USER OBJECT
router.delete('/:id', [mid.logger, mid.validateUserId], async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.getById(id);
  Users.remove(id)
    .then(() => {
      res.status(200).json(user);
    })
    .catch(next);
});


// RETURN THE ARRAY OF USER POSTS
router.get('/:id/posts', [mid.logger, mid.validateUserId], async (req, res, next) => {
  const { id } = req.params;
  Posts.get()
    .then(posts => {
      res.status(200).json(posts.filter(post => {
        return Number(post.user_id) === Number(id);
      }))
    })
    .catch(next);
});


// RETURN THE NEWLY CREATED USER POST
router.post('/:id/posts', [mid.logger, mid.validateUserId, mid.validatePost], (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  Posts.insert({ user_id: id, text: text})
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});


module.exports = router;