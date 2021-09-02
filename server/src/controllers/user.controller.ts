import { Response, Request } from "express";
import UserService from "../services/user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserController {
    constructor(private userService: UserService) {}

    async register(req: Request, res: Response) {
      try {
        await this.userService.register(req.body);
        res.json({ message: 'Registered successfuly' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }

    async login(req: Request, res: Response, next: Function) {
      try {
        const result = this.userService.login(req.body);
        result.then(
          dbUser => {
            bcrypt.compare(req.body.password, dbUser.password)
            .then(isCorrect => {
              const payload = {
                id: dbUser._id,
                username: dbUser.username,
              }
              jwt.sign(
                payload,
                'jwtSecretToken',
                {expiresIn: 360000},
                (err, token) => {
                  if (err) return res.json({message: err})
                  return res.json({
                    message: 'Success',
                    token: `Bearer ${token}`
                  })
                }
              )
            })
          })
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
}

const userController = new UserController(new UserService());
export default userController;