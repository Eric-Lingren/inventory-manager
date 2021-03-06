'use strict'

module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("Categories", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    userId: {
      type: Sequelize.UUID
    },
    name: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false
    }
  });
  return Category;
};
