'use strict'

module.exports = (sequelize, Sequelize) => {
  const List = sequelize.define("List", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
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
  return List;
};
