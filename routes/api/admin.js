const express = require('express')
const adminRouter = express.Router()
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")
const db = require("../../models")
const isEmpty = require('../../validation/isEmpty')
const sanitizeData = require('../../validation/sanitize')


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


// @route   POST – Adds a new category
adminRouter.post("/category", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, authorizedUser) => {
        if(err){
            res.sendStatus(403);
        } else {
            if(!isEmpty(req.body)){
                db.Categories.findAll({ where: { name : req.body.name} })
                .then(category => {
                    if (isEmpty(category)) {
                        let newCategory = sanitizeData(req.body)
                        db.Categories.create(newCategory)
                        .then(category => res.status(201).send(category) )
                        .catch( err => res.status(500).send({ msg: err}) )
                    } else {
                        return res.status(400).send(err)
                    }
                })
                .catch( err => {
                    return res.status(500).send(err)
                })
            }
        }
    })
})

// @route   POST – Adds a new subcategory
adminRouter.post("/subcategory", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, authorizedUser) => {
        if(err){
            res.sendStatus(403);
        } else {
            if(!isEmpty(req.body)){
                db.Subcategories.findAll({ where: { name : req.body.name} })
                .then(subcategory => {
                    if (isEmpty(subcategory)) {
                        let newSubcategory = sanitizeData(req.body)
                        db.Subcategories.create(newSubcategory)
                        .then(subcategory => res.status(201).send(subcategory) )
                        .catch( err => res.status(500).send({ msg: err}) )
                    } else {
                        return res.status(400).send(err)
                    }
                })
                .catch( err => {
                    return res.status(500).send(err)
                })
            }
        }
    })
})

// @route   DELETE – Removes one specific category
adminRouter.delete("/category/:id", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err){
            res.sendStatus(403)
        } else {
            db.Categories.destroy({where: { id: req.params.id }})
            .then(removedCategory => {
                if (removedCategory === 0) {
                    return res.status(400).send({ msg: "Category was unable to be deleted." })
                } else {
                    return res.status(200).send({msg: "Category has been successfully deleted." })
                }
            })
            .catch( err => res.status(500).send({ msg: "Something broke while deleting that category." }) )
        }
    })
})

// @route   DELETE – Removes one specific subcategory
adminRouter.delete("/subcategory/:id", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err){
            res.sendStatus(403)
        } else {
            db.Subcategories.destroy({where: { id: req.params.id }})
            .then(removedsubcategory => {
                if (removedsubcategory === 0) {
                    return res.status(400).send({ msg: "subcategory was unable to be deleted." })
                } else {
                    return res.status(200).send({msg: "subcategory has been successfully deleted." })
                }
            })
            .catch( err => res.status(500).send({ msg: "Something broke while deleting that subcategory." }) )
        }
    })
})

// // @route PUT – updates one facilitator
// adminRouter.put("/:id", checkForToken, (req, res) => {
//     jwt.verify(req.token, keys.secretOrKey, (err) => {
//         if(err){
//             // ERROR: Could not connect to the protected route
//             res.sendStatus(403)
//         } else {
//             db.Facilitators.update(req.body, {
//                 where: { id: req.params.id }
//             })
//             .then(updatedFacilitator => {
//                 if(updatedFacilitator[0] === 0){
//                     return res.status(500).send({msg: "Facilitator was unable to be updated." })
//                 }
//                 return res.status(200).send({msg: "Facilitator has been successfully updated." })
//             })
//             .catch( err => res.status(500).send({ msg: "Something broke while updating the bug report." }) )
//         }
//     })
// })


module.exports = adminRouter