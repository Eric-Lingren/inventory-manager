const express = require('express')
const feedbackRouter = express.Router()
const db = require("../models")
const isEmpty = require('../validation/isEmpty')
const sanitizeData = require('../validation/sanitize')
require("dotenv").config()



// @route   GET – gets an array of all feedback
feedbackRouter.get("/", (req, res) => {
  db.Feedback.findAll()
    .then((feedback) => {
      if (isEmpty(feedback)) {
        return res.status(400).send({ msg: "There is no feedback." })
      } else {
        return res.status(200).send(feedback);
      }
    })
    .catch( err => {
      return res.status(500).send({ msg: "Something broke while fetching feedback." })
    })
})


// @route POST – creates a new feedback record
feedbackRouter.post("/", (req, res) => {
  let newFeedback = sanitizeData(req.body)
  db.Feedback.create(newFeedback)
  .then(feedback => res.status(201).send(feedback) )
  .catch( err => res.status(500).send({ msg: err}) )
})


module.exports = feedbackRouter