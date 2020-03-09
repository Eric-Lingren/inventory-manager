const express = require('express')
const listRouter = express.Router()
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


// @route   GET – gets list of all a users lists
listRouter.get("/", checkForToken, (req, res, next) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err) res.sendStatus(403)
        if(!isEmpty(req.query)){
            db.List.findAll({
                where :  req.query ,
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


// @route   POST – Adds a new list
listRouter.post("/", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, authorizedUser) => {
        if(err){
            res.sendStatus(403);
        } else {
            if(!isEmpty(req.body)){
                let newList = sanitizeData(req.body)
                db.List.create(newList)
                .then(list => res.status(201).send(list) )
                .catch( err => res.status(500).send({ msg: err}) )
            }
        }
    })
})


// @route   DELETE – Removes one specific category
listRouter.delete("/:id", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err){
            res.sendStatus(403)
        } else {
            db.Lists.destroy({where: { id: req.params.id }})
            .then(removedList => {
                if (removedList === 0) {
                    return res.status(400).send({ msg: "List was unable to be deleted." })
                } else {
                    return res.status(200).send({msg: "List has been successfully deleted." })
                }
            })
            .catch( err => res.status(500).send({ msg: "Something broke while deleting that list." }) )
        }
    })
})


// @route PUT – updates one list
listRouter.put("/:id", checkForToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err) => {
        if(err){
            res.sendStatus(403)
        } else {
            db.Lists.update(req.body, {
                where: { id: req.params.id }
            })
            .then(updatedList => {
                if(updatedList[0] === 0){
                    return res.status(500).send({msg: "List was unable to be updated." })
                }
                return res.status(200).send({msg: "List has been successfully updated." })
            })
            .catch( err => res.status(500).send({ msg: "Something broke while updating the list." }) )
        }
    })
})


module.exports = listRouter