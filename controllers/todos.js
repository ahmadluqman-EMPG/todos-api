const db = require("../models");
const Todo = db.Todo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Todo Item
  const todoItem = {
    description: req.body.description,
    createdBy: req.body.createdBy ? req.body.createdBy : null,
    due: req.body.due ? req.body.due : null,
    completed: req.body.completed ? req.body.completed : false
  };

  //console.log(db);
  //console.log(db.todo);
  // Save Tutorial in the database
  Todo.create(todoItem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    });
};

exports.findAll = (_, res) => {
  Todo.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Todo with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id
      });
    });
};