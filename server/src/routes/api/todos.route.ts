import { Router } from "express";
import { check } from "express-validator/check";
import todoController from "../../controllers/todo.controller";

const todosRouter: Router = Router();

const todoValidation = [
  check("title", "Title should not be empty").isLength({ min: 1 }),
  check("content", "Content should not be empty").isLength({ min: 1 })
]

todosRouter.get("/", todoController.getAllTodo.bind(todoController));
todosRouter.post("/new-todo", todoValidation, todoController.createTodo.bind(todoController));
todosRouter.delete("/delete/:id", todoController.deleteTodoById.bind(todoController));
todosRouter.put("/update/:id", todoValidation, todoController.updateTodoById.bind(todoController));

export default todosRouter;
