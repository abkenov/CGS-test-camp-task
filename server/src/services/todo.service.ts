import Todo, { ITodo } from '../models/Todo'

export default class TodoService {
    async findAllTodo(isPublic: any, isCompleted: any) {

        const isFiltering = isPublic !== 'null' && isCompleted !== 'null'

        return isFiltering ? Todo.find({ isPublic: isPublic, isCompleted: isCompleted }) : Todo.find();
    }

    async createTodo(todo: ITodo) {
        const newTodo = new Todo({
            title: todo.title,
            description: todo.description,
            date: todo.date,
            isCompleted: todo.isCompleted,
            isPublic: todo.isPublic,
        });

        return newTodo.save()
    }

    async deleteTodoById(id: String) {
        return Todo.findByIdAndDelete(id);
    }

    async updateTodoById(id: String, todo: ITodo) {
        const newTodo = new Todo({
            title: todo.title,
            description: todo.description,
            date: todo.date,
            isCompleted: todo.isCompleted,
            isPublic: todo.isPublic,
        });

        return Todo.findByIdAndUpdate(id, todo)
    }
}