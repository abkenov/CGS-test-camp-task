import { Response, Request } from "express";
import TodoService from "../services/todo.service";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";

interface IResponse {
    status(status: number): any;
    send(data: any): any;
}
  
class ResponseError {
    error = {
        status: 0,
        message: 'not-seted',
    }

    constructor(private response: IResponse) {}
    
    buildInternalServerError() {
        this.error = {
            status: 500,
            message: 'Server Error',
        }
        return this;
    };

    buildBadRequestError() {
        this.error = {
            status: 400,
            message: 'Bad request',
        }
        return this;
    }

    execute() {
        return this.response.send(this.error.status).send(this.error.message);
    }
}
  

export class TodoController {
    constructor(private todoService: TodoService) {}

    async getAllTodo(req: Request, res: Response) {
        const todos = await this.todoService.findAllTodo();
        res.json(todos);
    }

    async createTodo(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const response_error = new ResponseError(res);
            response_error.buildBadRequestError();
            const response = response_error.execute();
            return response.json({ errors: errors.array() });
        }

        try {
            const todo = await this.todoService.createTodo(req.body);
            res.json(todo);
        } catch (err) {
            const response_error = new ResponseError(res);
            response_error.buildInternalServerError();
            response_error.execute();
        }
    }

    async deleteTodoById(req: Request, res: Response) {
        const todo = await this.todoService.deleteTodoById(req.params.id);
        res.json(todo)
    }

    async updateTodoById(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const response_error = new ResponseError(res);
            response_error.buildBadRequestError();
            const response = response_error.execute();
            return response.json({ errors: errors.array() });
        }

        try {
            const todo = await this.todoService.updateTodoById(req.params.id, req.body);
            res.json(todo);
        } catch (err) {
            const response_error = new ResponseError(err);
            response_error.buildInternalServerError();
            response_error.execute();
        }
    }
    
}

const todoController = new TodoController(new TodoService());
export default todoController;