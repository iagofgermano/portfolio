'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsToMany(models.Tag, {
        through: 'Post_tags',
        foreignKey: 'post_id',
        otherKey: 'tag_id',
      });
      models.Tag.belongsToMany(models.Post, {
        through: 'Post_tags',
        foreignKey: 'tag_id',
        otherKey: 'post_id',
      });
    }
  }
  Post_tag.init({
    post_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post_tag',
  });
  return Post_tag;
};