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
        } else {
            db.Subcategories.findAll({
                where :  req.query , 
                // include: [{
                //     model: db.Users,
                //     as: 'userData',
                //     attributes:['firstName', 'lastName', 'email', 'id', 'hasFacilitator']
                // }],
                order:[ ['name', 'ASC'] ]
            })
            .then(categories => {
                res.status(200).send(categories)
            })
            .catch( err => {
                next(err)
                res.status(500).send(err)
            })
        }
    })
})



// @route   GET – gets list of all items
inventoryRouter.get("/items", checkForToken, (req, res, next) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err) res.sendStatus(403)
        if(isEmpty(req.query)){
            db.Items.findAll({
            //     include: [{
            //         model: db.Categories,
            //         as: 'category',
            //         attributes:['name']
            //     }],
            })
            .then(items => {
                if (isEmpty(items)) {
                    return res.status(400).send({ msg: "There are no items." })
                } else {
                    return res.status(200).send(items)
                }
            })
            .catch( err => {
                return res.status(500).send({ msg: "Something broke while getting items." })
            })
        } else {
            db.Items.findAll({
                where :  req.query , 
                // include: [{
                //     model: db.Users,
                //     as: 'userData',
                //     attributes:['firstName', 'lastName', 'email', 'id', 'hasFacilitator']
                // }],
                order:[ ['name', 'ASC'] ]
            })
            .then(items => {
                res.status(200).send(items)
            })
            .catch( err => {
                next(err)
                res.status(500).send(err)
            })
        }
    })
})



// @route   POST – Adds a new item
inventoryRouter.post("/items", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, authorizedUser) => {
        if(err){
            res.sendStatus(403);
        } else {
            if(!isEmpty(req.body)){
                let newItem = sanitizeData(req.body)
                db.Items.create(newItem)
                .then(item => res.status(201).send(item) )
                .catch( err => res.status(500).send({ msg: err}) )
            }
        }
    })
})

// @route   POST – Adds a new item
inventoryRouter.post("/items/user-items", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, authorizedUser) => {
        if(err){
            res.sendStatus(403);
        } else {
            if(!isEmpty(req.body)){
                let newItem = sanitizeData(req.body)
                db.UserItems.create(newItem)
                .then(item => res.status(201).send(item) )
                .catch( err => res.status(500).send({ msg: err}) )
            }
        }
    })
})


// @route   GET – gets list of all a users items
inventoryRouter.get("/items/user-items", checkForToken, (req, res, next) => {
    console.log('hit get user items route')
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err) res.sendStatus(403)
        if(!isEmpty(req.query)){
            db.Items.findAll({
                where :  req.query , 
                    // include: [
                    //     {
                    //         model: db.Subcategories,
                    //         as: 'subcategory',
                    //         attributes:['name'],
                            // include: [{ model: db.Categories, as: 'categories', attributes:['name'] }]
                        // }
                        // model: db.Categories,
                        // as: 'category',
                        // attributes:['name']
                        // include: [{ model: db.Subcategories, as: 'subcategory', attributes:['name'] }, 
                        // {model: User }
                    // ],
                    // ],
                    // include: [
                    //     {
                    //         model: db.Categories,
                    //         as: 'category',
                    //         attributes:['name'],
                    //         // include: [{ model: db.Categories, as: 'categories', attributes:['name'] }]
                    //     }
                        // model: db.Categories,
                        // as: 'category',
                        // attributes:['name']
                        // include: [{ model: db.Subcategories, as: 'subcategory', attributes:['name'] }, 
                        // {model: User }
                    // ],
                    // ],
                    // include: [{
                        
                    // }],
                order:[ ['name', 'ASC'] ]
            })
            .then(items => {
                res.status(200).send(items)
            })
            .catch( err => {
                next(err)
                res.status(500).send(err)
            })
        }
    })
})


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