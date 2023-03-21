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

async function validateUser(req, res, next) {
  const { name } = req.body;

  if(!name) {
    res.status(400).json({ message: "missing required name field" });
  }

  try {
    const users = await Users.get();
    for(let i = 0; i < users.length; i++) {
      if(users[i].name === name) {
        res.status(400).json({message: "user already exists"});
      }
    }
    next();
  } catch(err) {
    next(err);
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}



module.exports = {
  logger, 
  validateUserId, 
  validateUser,
  validatePost
}