'use strict'

module.exports = (sequelize, Sequelize) => {
  const Subcategory = sequelize.define("Subcategories", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    categoryId: {
      type: Sequelize.UUID,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false
    }
  });
  return Subcategory;
};
