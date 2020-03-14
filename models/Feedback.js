'use strict'

module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define("Feedbacks", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    feedback: {
      type: Sequelize.STRING(2000),
      required: true,
      allowNull: false
    }
  });
  return Feedback;
};
