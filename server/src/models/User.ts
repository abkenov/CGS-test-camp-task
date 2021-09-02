import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param username:string
 */
export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User: Model<IUser> = model("User", userSchema);

export default User;
