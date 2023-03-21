const Users = require('../users/users-model.js')


function logger(req, res, next) {
  console.log(`${req.method} call made to ${req.url} at ${new Date().toISOString()}`)
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({message: `user not found`})
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId
}