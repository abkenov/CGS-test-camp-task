import HttpService from './http.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserService extends HttpService {
  constructor() {
    super();
  }

  async setTokenToStorage (token: any) {
    await AsyncStorage.clear()
    await AsyncStorage.setItem('token', token)
  }

  isLogged(username: String) {
    return this.get({
      url: `getUser/${username}`,
    })
  }

  async login(user: any) {
    const response = await this.post({
      url: 'login',
      data: user,
    })
    this.setTokenToStorage(response.data.token)
  }

  register(user: any, withAuth = false) {
    return this.post({
      url: 'register',
      data: user,
    })
  }
}