import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param title:string
 * @param description:string
 * @param date:date
 * @param isCompleted:boolean
 * @param isPublic:boolean
 */
export interface ITodo extends Document {
  title: string,
  description: string,
  date: Date,
  isCompleted: boolean,
  isPublic: boolean,
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: new Date().getFullYear()
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: false
  },
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;
