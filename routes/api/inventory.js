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
                order:[ ['name', 'ASC'] ]
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
                order:[ ['name', 'ASC'] ]
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
                order:[ ['name', 'ASC'] ]
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
                .catch( err => err )
            }
        }
    })
})


// @route   GET – gets list of all a users items
inventoryRouter.get("/items/user-items", checkForToken, (req, res, next) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err) res.sendStatus(403)
        if(!isEmpty(req.query)){
            db.UserItems.findAll({
                where :  req.query , 
                    include: [{
                        model: db.Items,
                        attributes:['name'],
                        include: [ {
                            model: db.Subcategories,
                            attributes:['name' ],
                            include: [ {
                                model: db.Categories,
                                attributes:['name', 'id' ]
                            }],
                        }],
                    }],
                // order:[ ['name', 'ASC'] ]
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


// @route   GET – gets one users items
inventoryRouter.get("/items/user-items/:id", checkForToken, (req, res, next) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err) res.sendStatus(403)
        
            db.UserItems.findOne({
                where :  req.query , 
                    include: [{
                        model: db.Items,
                        attributes:['name', 'itemId'],
                        include: [ {
                            model: db.Subcategories,
                            attributes:['name', 'subcategoryId'],
                            include: [ {
                                model: db.Categories,
                                attributes:['name', 'id']
                            }],
                        }],
                    }],
                // order:[ ['name', 'ASC'] ]
            })
            .then(items => {
                res.status(200).send(items)
            })
            .catch( err => {
                next(err)
                res.status(500).send(err)
            })
    })
})

// @route   DELETE – Removes one specific user inventory item
inventoryRouter.delete("/items/user-items/:id", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err){ 
            res.sendStatus(403)
        } else {
            db.UserItems.destroy({where: { id: req.params.id }})
            .then(removedUserItem => {
                if (removedUserItem === 0) {
                    return res.status(400).send({ msg: "User Item was unable to be deleted." })
                } else {
                    return res.status(200).send({msg: "User Item has been successfully deleted." })
                }
            })
            .catch( err => err )
        }
    })
})


// @route PUT – updates one users item
inventoryRouter.put("/items/user-items/:id", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err){
            res.sendStatus(403)
        } else {
            db.UserItems.update(req.body, {
                where: { id: req.params.id }
            })
            .then(updatedUserItem => {
                if(updatedUserItem[0] === 0){
                    return res.status(500).send({msg: "User item was unable to be updated." })
                }
                return res.status(200).send({msg: "Item has been successfully updated." })
            })
            .catch( err => res.status(500).send({ msg: "Something broke while updating. Please try again." }) )
        }
    })
})


// @route   POST – Adds a new finished item
inventoryRouter.post("/items/user-items-finished", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, authorizedUser) => {
        if(err){
            res.sendStatus(403);
        } else {
            if(!isEmpty(req.body)){
                let newItem = sanitizeData(req.body)
                db.ItemsFinished.create(newItem)
                .then(item => res.status(201).send(item) )
                .catch( err => err )
            }
        }
    })
})



// @route   GET – gets list of all a users finished items
inventoryRouter.get("/items/user-items-finished", checkForToken, (req, res, next) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err) res.sendStatus(403)
        if(!isEmpty(req.query)){
            db.ItemsFinished.findAll({
                where :  req.query , 
                    include: [{
                        model: db.Items,
                        attributes:['name'],
                        include: [ {
                            model: db.Subcategories,
                            attributes:['name' ],
                            include: [ {
                                model: db.Categories,
                                attributes:['name', 'id' ]
                            }],
                        }],
                    }],
                // order:[ ['name', 'ASC'] ]
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



// @route   POST – Adds a new added item
inventoryRouter.post("/items/user-items-added", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, authorizedUser) => {
        if(err){
            res.sendStatus(403);
        } else {
            if(!isEmpty(req.body)){
                let newItem = sanitizeData(req.body)
                db.ItemsAdded.create(newItem)
                .then(item => res.status(201).send(item) )
                .catch( err => err )
            }
        }
    })
})



// @route   GET – gets list of all a users added items
inventoryRouter.get("/items/user-items-added", checkForToken, (req, res, next) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err) res.sendStatus(403)
        if(!isEmpty(req.query)){
            db.ItemsAdded.findAll({
                where :  req.query , 
                    include: [{
                        model: db.Items,
                        attributes:['name'],
                        include: [ {
                            model: db.Subcategories,
                            attributes:['name' ],
                            include: [ {
                                model: db.Categories,
                                attributes:['name', 'id' ]
                            }],
                        }],
                    }],
                // order:[ ['name', 'ASC'] ]
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



module.exports = inventoryRouter