import HttpService from './http.service';

export default class TodoService extends HttpService {
  constructor() {
    super();
  }
  
  getTodos(isPublic: any, isCompleted: any, withAuth = false) {
    return this.get({
      url: `todos/${''+isPublic}/${''+isCompleted}`,
    })
  }

  createNewTodo(todo: any, withAuth = false) {
    return this.post({
      url: 'todos/new-todo',
      data: todo,
    })
  }

  deleteTodoById(id: String, withAuth = false) {
    return this.delete({
        url: `todos/delete/${id}`,
      })
  }

  updateTodoById(todo: any, id: String, withAuth = false) {
    return this.put({
      url: `todos/update/${id}`,
      data: todo,
    })
  }
}