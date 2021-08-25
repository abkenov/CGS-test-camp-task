import { Router } from "express";
import { check } from "express-validator/check";
import todoController from "../../controllers/todo.controller";

const todosRouter: Router = Router();

class Validation {
  createMutationValidator() {
    return [
      check("title", "Title should not be empty").isLength({ min: 1 }),
      check("content", "Content should not be empty").isLength({ min: 1 })
    ];
  }
}

const todoValidation = new Validation;


todosRouter.get("/", todoController.getAllTodo.bind(todoController));
todosRouter.post("/new-todo", todoValidation.createMutationValidator(), todoController.createTodo.bind(todoController));
todosRouter.delete("/delete/:id", todoController.deleteTodoById.bind(todoController));
todosRouter.put("/update/:id", todoValidation.createMutationValidator(), todoController.updateTodoById.bind(todoController));

export default todosRouter;
