'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      eview.hasMany(models.ReviewImage, {foreignKey:"reviewId"}),
      Review.belongsTo(models.User, {foreignKey:"userId"}),
      Review.belongsTo(models.Spot, {foreignKey:"spotId"})
    }
  }
  Review.init({
    spotId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {model: 'spotsId'}
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
    },
    review: {
      type: Sequelize.STRING
    },
    stars: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};