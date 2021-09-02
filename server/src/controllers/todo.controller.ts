import { Response, Request } from "express";
import TodoService from "../services/todo.service";

export class TodoController {
    constructor(private todoService: TodoService) {}

    async getAllTodo(req: Request, res: Response) {
        const todos = await this.todoService.findAllTodo();
        res.json(todos);
    }

    async createTodo(req: Request, res: Response) {
        try {
            const todo = await this.todoService.createTodo(req.body);
            res.json(todo);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }

    async deleteTodoById(req: Request, res: Response) {
        const todo = await this.todoService.deleteTodoById(req.params.id);
        res.json(todo)
    }

    async updateTodoById(req: Request, res: Response) {
        try {
            const todo = await this.todoService.updateTodoById(req.params.id, req.body);
            res.json(todo);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
    
}

const todoController = new TodoController(new TodoService());
export default todoController;