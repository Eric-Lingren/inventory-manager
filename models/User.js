'use strict'

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false
    },
  });
  return User;
};
