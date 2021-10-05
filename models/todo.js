'use strict';
const todoOpenSearch = require("../opensearch/todo")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    description: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    due: DataTypes.DATE,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.addHook('afterCreate', function(todoItem, options) {
    console.log('afterCreate') 
    console.log(todoItem.dataValues)
    todoOpenSearch.createIndex(todoItem);
  })
  return Todo;
};
