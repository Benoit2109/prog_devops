import { create, update, deleteOne, deleteAll, findAll, findOne, findAllPublished } from '../controllers/task.controller.js'
import { Router } from 'express';

const routes = (app) => {
  
    let router = Router();
  
    // Create a new Task
    router.post("/", create);
  
    // Retrieve all Tasks
    router.get("/", findAll);
  
    // Retrieve all published Tasks
    router.get("/published", findAllPublished);
  
    // Retrieve a single Task with id
    router.get("/:id", findOne);
  
    // Update a Task with id
    router.put("/:id", update);
  
    // Delete a Task with id
    router.delete("/:id", deleteOne);
  
    // Delete all Tasks
    router.delete("/", deleteAll);
  
    app.use('/api/tasks', router);
  };

  export { routes };