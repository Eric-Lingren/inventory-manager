const express = require('express')
const authRouter = express.Router()
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const isEmpty = require('../validation/isEmpty')
const validateLoginInput = require('../validation/login')
const sanitizeData = require('../validation/sanitize')
const Sequelize = require('sequelize');
const op = Sequelize.Op;
require("dotenv").config()

const checkForToken = (req, res, next) => {
  const header = req.headers['authorization']
  if(typeof header !== 'undefined') {
      const bearer = header.split(' ')
      const token = bearer[1]
      req.token = token
      next()
  } else {
      //If header is undefined return Forbidden (403)
      res.sendStatus(403)
  }
}

// @route   GET – gets an array of all users OR all users filtered via query params
authRouter.get("/users", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
    if(err){
      // ERROR: Could not connect to the protected route
      res.sendStatus(403)
    } else {
      if(isEmpty(req.query)){
        db.Users.findAll()
          .then((users) => {
            if (isEmpty(users)) {
              return res.status(400).send({ msg: "There are no users." })
            } else {
              return res.status(200).send(users);
            }
          })
          .catch( err => {
            return res.status(500).send({ msg: "Something broke while fetching users." })
          })
      } else {
        db.Users.findAll({ 
          where: req.query
        })
          .then((users) => {
            if (isEmpty(users)) {
              return res.status(400).send({ msg: "There are no users who match that criteria." })
            } else {
              return res.status(200).send(users);
            }
          })
          .catch( err => {
            return res.status(500).send({ msg: "Something broke while fetching users." })
          })
      }
    }
  })
})


// @route GET – gets one user by id
authRouter.get("/user/:id", (req, res) => {
  db.Users.findOne({
    where: { id: req.params.id}
  })
  .then(user => {
    if (isEmpty(user)) {
      return res.status(400).send({ msg: "There is no user found." })
    } else {
      return res.status(200).send(user)
    }
  })
  .catch( err => {
    console.error(err);
    return res.status(500).send({ msg: "Something broke while fetching users." });
  })
});


// @route POST – creates a new user
authRouter.post("/register", async (req, res) => {
  // Check to see if the user inputs are valid/not empty
  let validatedData = validateLoginInput(req.body)

  //  If data is valid, sanitize it to prevent XSS & SQL Injection
  if (validatedData.isValid){
    let email = sanitizeData(req.body.email)
    let password = sanitizeData(req.body.password)
    let firstName = sanitizeData(req.body.firstName)
    let lastName = sanitizeData(req.body.lastName)
    

    //  Submit the cleaned users email to SQL for query to check for duplicates
    db.Users.findOne({
      where: {
        email: email,
      }
    })
    .then(user => {
      if (user) {
        //  User already exists
        return res.status(200).send(user);
      } else {
        // No user exists
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          // Creates a default user with no access rights becasue they arent a campaign member in Salesforce or went through a nondirect registration url
          let newUser = {
            email : email,
            firstName : firstName,
            lastName : lastName,
            password : hash,
          }
          
          
          //Save the newly created user in the db
          db.Users.create(newUser)
            .then(user => {
              const payload = {
                user_id: user.dataValues.user_id
              }
              jwt.sign( payload, keys.secretOrKey,{ expiresIn: 3600 * 24 }, (err, token) => {
                if (err){
                  return res.status(500).send(err)
                }
                delete user.dataValues['password']
                });
            }).catch( err => {
              return res.status(500).send({ msg: "Something broke while creating user." });
            })
        })
      }
    })
    .catch( err => {
      return res.status(500).send({ msg: "Something broke while creating user." });
    })
  } else {
    return res.status(403).send({ msg: "Please enter valid data" });
  }
});


// @route POST — user login
authRouter.post("/login", (req, res) => {
  // Check to see if the user inputs are valid/not empty
  let validatedData = validateLoginInput(req.body)
  //  Sanitize user input to prevent XSS & SQL Injection
  if (validatedData.isValid){
    let email = sanitizeData(req.body.email)
    let password = sanitizeData(req.body.password)
  //  Submit the cleaned data for SQL query
  db.Users.findOne({
    where: {
      email : email
    }
  })
  .then(user => {
    if (isEmpty(user) ) {
      return res.status(500).send({ msg: "Incorrect email or password" });
    }
    // Decrypts and compares the hash
    bcrypt
      .compare(password, user.dataValues.password)
      .then(isMatch => {
        //  Password and username matched
        if (isMatch) {

          //  Begin authentication process - Remove sensitive data
          delete user.dataValues['password']

          //  Build token payload
          const payload = { user: user.dataValues }
          jwt.sign( payload, keys.secretOrKey,{ expiresIn: 3600 * 24 }, (err, token) => {
            if (err){
              return res.status(500).send(err)
            }
              // Send JWT and grant access
              res.status(201).send({
                success: true,
                inventoryToken: token,
                user: user
              })
            })
        } else {
          return res.status(403).send({ msg: "Email or password are incorrect" })
        }
      })
      .catch(err => {
        return res.status(500).send({ msg: "Something broke while authenticating the user. Please try again" });
      });
    })
    .catch(err => {
      return res.status(500).send({ msg: "Something broke while authenticating the user." });
    })
  } else {
    return res.status(403).send({ msg: "username or password are incorrect" });
  }
})


// @route DELETE – deletes an user
authRouter.delete("/user/:id", (req, res, next) => {
  db.Users.destroy({
    where: {
      id: req.params.id
    }
  }).then(removedUser => {
    if(removedUser === 0){
      return res.status(500).send({ msg: "That user was not found or could not be deleted. Please try again." });
    } else {
      res.status(200).send({ msg: "user has been successfully deleted." });
    }
  })
  .catch(next)
});


   // @route PUT – updates a user
authRouter.put("/user/:id", (req, res, next) => {
  if(!req.body.password){
    db.Users.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(updatedUser => {
      if(updatedUser.includes(0)){
        return res.status(500).send({ msg: "Incorrect email or password" });
      } else {
        return res.status(201).send({ msg: "User has been successfully updated." });
      }
    })
    .catch(next)
  } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) throw err;
      let newPassword = {password: hash}
      db.Users.update(newPassword, {
        where: {
          id: req.params.id
        }
      })
        .then(updatedUser => {
          if(updatedUser.includes(0)){
            return res.status(500).send({ msg: "The requested user was not found." });
          } else {
            return res.status(201).send({ msg: "Password has been successfully updated." });
          }
        }).catch( err => {
          return res.status(500).send({ msg: "Something broke while changing password." });
        })
    })
  }
});



module.exports = authRouter