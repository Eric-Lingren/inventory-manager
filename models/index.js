"use strict"

const path = require("path");
const Sequelize = require("sequelize")
const env = process.env.NODE_ENV
const config = require(path.join(__dirname, "..", "config", "config.json"))[env]

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: "mysql",
      logging: false
    },{
      dialectOptions: {
        multipleStatements: true
      }
    }
  )

const db = {};

db.sequelize = sequelize
db.Sequelize = Sequelize

// Models
db.Users = require('./User.js')(sequelize, Sequelize) 
db.Categories = require('./Category.js')(sequelize, Sequelize) 
db.Subcategories = require('./Subcategory.js')(sequelize, Sequelize) 
db.Items = require('./Item.js')(sequelize, Sequelize) 
db.UserItems = require('./UserItem.js')(sequelize, Sequelize) 

module.exports = db