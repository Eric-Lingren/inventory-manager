'use strict'

module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("Items", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    subcategoryId: {
      type: Sequelize.UUID,
    },
    userId: {
      type: Sequelize.UUID,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false
    }
  });
  return Item;
};
