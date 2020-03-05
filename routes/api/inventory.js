const express = require('express')
const inventoryRouter = express.Router()
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

// @route   GET – gets list of all categories
inventoryRouter.get("/categories", checkForToken, (req, res, next) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err) res.sendStatus(403)
        if(isEmpty(req.query)){
            db.Categories.findAll({
                // include: [{
                //     model: db.Users,
                //     as: 'userData',
                //     attributes:['firstName', 'lastName', 'email', 'id', 'hasFacilitator']
                // }],
            })
            .then(categories => {
                if (isEmpty(categories)) {
                    return res.status(400).send({ msg: "There are no categories." })
                } else {
                    return res.status(200).send(categories)
                }
            })
            .catch( err => {
                return res.status(500).send({ msg: "Something broke while getting categories." })
            })
        }
        // else {
        //     let parsedQuery = changeStringToFalsy(req.query)

        //     db.Facilitators.findAll({
        //         where :  parsedQuery , 
        //         include: [{
        //             model: db.Users,
        //             as: 'userData',
        //             attributes:['firstName', 'lastName', 'email', 'id', 'hasFacilitator']
        //         }],
        //         order:[ ['FirstName', 'ASC'] ]
        //     })
        //     .then(facilitators => {
        //         res.status(200).send(facilitators)
        //     })
        //     .catch( err => {
        //         console.log('Route Hit Error');
        //         next(err)
        //         res.status(500).send(err)
        //     })
        // }
    })
})


// @route   GET – gets list of all subcategories
inventoryRouter.get("/subcategories", checkForToken, (req, res, next) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err) res.sendStatus(403)
        if(isEmpty(req.query)){
            db.Subcategories.findAll({
                // include: [{
                //     model: db.Users,
                //     as: 'userData',
                //     attributes:['firstName', 'lastName', 'email', 'id', 'hasFacilitator']
                // }],
            })
            .then(subcategories => {
                if (isEmpty(subcategories)) {
                    return res.status(400).send({ msg: "There are no subcategories." })
                } else {
                    return res.status(200).send(subcategories)
                }
            })
            .catch( err => {
                return res.status(500).send({ msg: "Something broke while getting subcategories." })
            })
        }
        // else {
        //     let parsedQuery = changeStringToFalsy(req.query)

        //     db.Facilitators.findAll({
        //         where :  parsedQuery , 
        //         include: [{
        //             model: db.Users,
        //             as: 'userData',
        //             attributes:['firstName', 'lastName', 'email', 'id', 'hasFacilitator']
        //         }],
        //         order:[ ['FirstName', 'ASC'] ]
        //     })
        //     .then(facilitators => {
        //         res.status(200).send(facilitators)
        //     })
        //     .catch( err => {
        //         console.log('Route Hit Error');
        //         next(err)
        //         res.status(500).send(err)
        //     })
        // }
    })
})


// // @route   POST – Adds a new category
// inventoryRouter.post("/category", checkForToken, (req, res) => {
//     console.log('hit');
//     jwt.verify(req.token, keys.secretOrKey, (err, authorizedUser) => {
//         if(err){
//             res.sendStatus(403);
//         } else {
//             if(!isEmpty(req.body)){
//                 let newCategory = sanitizeData(req.body)
//                 console.log(newCategory);
//                 db.Categories.create(newCategory)
//                 .then(category => res.status(201).send(category) )
//                 .catch( err => res.status(500).send({ msg: err}) )
//             }
//         }
//     })
// })


// // @route   DELETE – Removes one specific facilitator
// adminRouter.delete("/:id", checkForToken, (req, res) => {
//     jwt.verify(req.token, keys.secretOrKey, (err) => {
//         if(err){
//             // ERROR: Could not connect to the protected route
//             res.sendStatus(403)
//         } else {
//             db.Facilitators.destroy({where: { id: req.params.id }})
//             .then(removedFacilitator => {
//                 if (removedFacilitator === 0) {
//                     return res.status(400).send({ msg: "Facilitator was unable to be deleted." })
//                 } else {
//                     return res.status(200).send({msg: "Facilitator has been successfully deleted." })
//                 }
//             })
//             .catch( err => res.status(500).send({ msg: "Something broke while deleting that Facilitator report." }) )
//         }
//     })
// })

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


module.exports = inventoryRouter