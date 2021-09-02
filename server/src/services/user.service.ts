import User, { IUser } from '../models/User'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class TodoService {

  async register(user: IUser) {
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password
    });

    return newUser.save()
  }

  async login(user: IUser) {
    return User.findOne({
      username: user.username
    })
  }
}