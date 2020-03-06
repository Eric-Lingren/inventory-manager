'use strict'

module.exports = (sequelize, Sequelize) => {
  const UserItem = sequelize.define("UserItems", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    categoryId: {
      type: Sequelize.UUID,
    },
    subcategoryId: {
      type: Sequelize.UUID,
    },
    itemId: {
      type: Sequelize.UUID,
    },
    userId: {
      type: Sequelize.UUID,
    },
    expirationDate: {
      type: Sequelize.DATE,
    },
  });
  return UserItem;
};
