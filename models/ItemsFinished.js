'use strict'

module.exports = (sequelize, Sequelize) => {
  const ItemsFinished = sequelize.define("ItemsFinished", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
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
    size: {
      type: Sequelize.INTEGER
    },
    volumeType: {
      type: Sequelize.STRING
    }
  });
  return ItemsFinished;
};
