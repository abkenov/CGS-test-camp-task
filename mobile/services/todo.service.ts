import HttpService from './http.service';

export default class TodoService extends HttpService {
  constructor() {
    super();
  }
  getTodos() {
    return this.get({
      url: 'todos',
    })
  }

  createNewTodo(todo: any) {
    return this.post({
      url: 'todos/new-todo',
      data: todo,
    })
  }

  deleteTodoById(id: String) {
    return this.delete({
        url: `todos/delete/${id}`,
      })
  }

  updateTodoById(todo: any, id: String) {
    return this.put({
      url: `todos/update/${id}`,
      data: todo,
    })
  }
}