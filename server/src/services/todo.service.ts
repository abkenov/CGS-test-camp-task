import Todo, { ITodo } from '../models/Todo'

export default class TodoService {
    async findAllTodo() {
        return Todo.find();
    }

    async createTodo(todo: ITodo) {
        const newTodo = new Todo({
            title: todo.title,
            content: todo.content,
        });

        return newTodo.save()
    }

    async deleteTodoById(id: String) {
        return Todo.findByIdAndDelete(id);
    }

    async updateTodoById(id: String, todo: ITodo) {
        const newTodo = new Todo({
            title: todo.title,
            content: todo.content,
        });

        return Todo.findByIdAndUpdate(id, todo)
    }
}