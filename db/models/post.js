'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Tag, {
        through: 'Post_tags',
        foreignKey: 'post_id',
        otherKey: 'tag_id',
      });
      models.Tag.belongsToMany(this, {
        through: 'Post_tags',
        foreignKey: 'tag_id',
        otherKey: 'post_id',
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};