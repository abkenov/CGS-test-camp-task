import { Router, Response, Request  } from "express";
import { check, validationResult } from "express-validator/check";
import todoController from "../../controllers/todo.controller";

const todosRouter: Router = Router();

const validationRules = [
  check("title", "Title should not be empty").isLength({ min: 1 }),
  check("description", "Content should not be empty").isLength({ min: 1 })
]

const validation = () => {
  return(req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    } else {
      next()
    }
  }
}

todosRouter.get("/", todoController.getAllTodo.bind(todoController));

todosRouter.post(
  "/new-todo", 
  validationRules,
  validation(),
  todoController.createTodo.bind(todoController),
);

todosRouter.delete("/delete/:id", todoController.deleteTodoById.bind(todoController));

todosRouter.put(
  "/update/:id", 
  validationRules,
  validation(),
  todoController.updateTodoById.bind(todoController),
);

export default todosRouter;
