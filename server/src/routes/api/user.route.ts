import bcrypt from "bcryptjs";
import config from "config";
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import gravatar from "gravatar";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import User, { IUser } from "../../models/User";
import { assertScalarType } from "graphql";
import userController from "../../controllers/user.controller";

const usersRouter: Router = Router();

function verifyJWT(req: Request, res: Response, next: Function) {
  const token  = req.headers.authorization.split(' ')[1]

  if(token) {
    jwt.verify(token , 'jwtSecretToken', (err: any, decoded: any) => {
      console.log(err)
      if(err) return res.json({
        isLoggedIn: false,
        message: 'Failed to authenticate'
      })
      req.body.user = {}
      req.body.user.id = decoded.id
      req.body.user.username = decoded.username
      next()
    })
  } else {
    res.json({message: 'Incorrect token given', isLoggedIn: false})
  }
}

const checkIfTaken = () => {
  return async (req: Request, res: Response, next: Function) => {
    const user = req.body
    const takenUsername = await User.findOne({username: user.username})
    const takenEmail = await User.findOne({email: user.email})

    if(takenUsername || takenEmail) {
      res.json({message: 'Taken username or email'})
    } else {
      user.password = await bcrypt.hash(req.body.password, 5)
      next()
    }
  }
}

const registrationValidationRules = [
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 })
]

const loginValidationRules = [
  check("username", "username can not be empty!").isLength({ min: 1 }),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 })
]

const validation = () => {
  return(req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    } else {
      next()
    }
  }
}

const correctLoginValidation = () => {
  return(req: Request, res: Response, next: Function) => {
    const userLoggingIn = req.body
      
    User.findOne({
      username: userLoggingIn.username
    })
    .then(
      dbUser => {
        if(!dbUser) {
          return res.json({message: 'There is no such user'})
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then(isCorrect => {
          if(isCorrect) {
            next()
          } else {
            return res.json({
              message: 'Invalid Username or Password'
            })
          }
        })
      }
    )
  }
}

usersRouter.get(
  '/getUser/:username',
  verifyJWT,
  (req: Request, res: Response) => {
    res.json({isLoggedIn: true, username: req.body.user.username})
  }
)

usersRouter.post(
  "/register",
  registrationValidationRules,
  validation(),
  checkIfTaken(),
  userController.register.bind(userController),
);

usersRouter.post(
  '/login',
  loginValidationRules,
  validation(),
  correctLoginValidation(),
  userController.login.bind(userController),
)

export default usersRouter;