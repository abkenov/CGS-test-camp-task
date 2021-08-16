import { Response } from "express";
import TodoService from "../services/todo.service";


export class TodoController {
    constructor(private todoService: TodoService) {}
    async getAllTodo(req: Request, res: Response) {
        const todos = await this.todoService.findAll();
        res.send(todos);
    }
}

const todoController = new TodoController(new TodoService());
export default todoController;