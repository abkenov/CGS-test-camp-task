import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param title:string
 * @param content:string
 * @param date:date
 * @param isCompleted:boolean
 * @param isPublic:boolean
 */
export interface ITodo extends Document {
  title: string,
  content: string,
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
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type: Boolean
  },
  isPublic: {
    type: Boolean
  },
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;
