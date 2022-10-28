import mongoose, { Schema, Model, Document } from 'mongoose';

type TodoDocument = Document & {
  name: string;
  description: string | null;
};

type TodoInput = {
  name: TodoDocument['name'];
  description: TodoDocument['description'];
};

const todoSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    description: {
      type: Schema.Types.String,
      default: null,
    },
  },
  {
    collection: 'todos',
    timestamps: true,
  },
);

const Todo: Model<TodoDocument> = mongoose.model<TodoDocument>('Todo', todoSchema);
export { Todo, TodoInput, TodoDocument };

