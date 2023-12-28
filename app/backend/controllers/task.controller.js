import { db } from "../models/index.js";
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
export const create = (req, res) => {
    // Validate request
    if (!req.body.description) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Task
    const task = {
      id: req.body.id,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Task in the database
    Task.create(task)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the task."
        });
      });
  };

// Retrieve all Tasks from the database.
export const findAll = (req, res) => {
    const id = req.query.description;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    Task.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      });
  };

// Find a single Task with an id
export const findOne = (req, res) => {
    const id = req.params.id;
  
    Task.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find task with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving task with id=" + id
        });
      });
  };
  

// Update a Task by the id in the request
export const update = (req, res) => {
    const id = req.params.id;
  
    Task.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating task with id=" + id
        });
      });
  };

// Delete a Task with the specified id in the request
export const deleteOne = (req, res) => {
    const id = req.params.id;
  
    Task.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete task with id=${id}. Maybe task was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete task with id=" + id
        });
      });
  };

// Delete all Tasks from the database.
export const deleteAll = (req, res) => {
    Task.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tasks were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tasks."
        });
      });
  };

// Find all published Tasks
export const findAllPublished = (req, res) => {
    Task.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      });
  };
