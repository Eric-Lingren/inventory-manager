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
db.ItemsFinished = require('./ItemsFinished.js')(sequelize, Sequelize) 
db.ItemsAdded = require('./ItemsAdded.js')(sequelize, Sequelize) 
db.List = require('./List.js')(sequelize, Sequelize) 
db.Feedback = require('./Feedback.js')(sequelize, Sequelize) 

// Relations
db.ItemsFinished.belongsTo(db.Items, { foreignKey: "itemId", targetKey: "id", onDelete: "cascade" } );
db.Items.hasMany(db.ItemsFinished, { foreignKey: "itemId", targetKey: "id", onDelete: "cascade" } );
db.ItemsAdded.belongsTo(db.Items, { foreignKey: "itemId", targetKey: "id", onDelete: "cascade" } );
db.Items.hasMany(db.ItemsAdded, { foreignKey: "itemId", targetKey: "id", onDelete: "cascade" } );
db.UserItems.belongsTo(db.Items, { foreignKey: "itemId", targetKey: "id", onDelete: "cascade" } );
db.Items.hasMany(db.UserItems, { foreignKey: "itemId", targetKey: "id", onDelete: "cascade" } );
db.Items.belongsTo(db.Subcategories, { foreignKey: "subcategoryId", targetKey: "id", onDelete: "cascade" } );
db.Subcategories.hasMany(db.Items, { foreignKey: "id", foreignKey: "subcategoryId", onDelete: "cascade" } );
db.Subcategories.belongsTo(db.Categories, { foreignKey: "categoryId", foerignKey: "id", onDelete: "cascade" } );
// db.Categories.hasMany(db.Subcategories, { foreignKey: "id", foreignKey: "subcategoryId" } );


module.exports = db