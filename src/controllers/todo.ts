import  {Request,Response, NextFunction } from 'express';
import {Todo, TodoInput} from '../models/todo';
import catchAsyncErrors from '../utils';



exports.getTodo = catchAsyncErrors( async(req: Request, res:Response, next:NextFunction) => {
  const { id } = req.params;

  const todo = await Todo.findOne({ _id: id });
  if (!todo) {
    return res.status(404).json({ message: `Todo with id "${id}" not found.` });
  }

  return res.status(200).json({ data: todo });
});
exports.getAllTodos = catchAsyncErrors( async(req:Request, res:Response) => {
    const todos = await Todo.find().sort('-createdAt').exec();
    return res.status(200).json({ data: todos });
});


exports.createTodo = catchAsyncErrors( async(req:Request, res:Response) => {
  const { description, name } = req.body;

  if (!name || !description) {
    return res.status(422).json({
      message: 'The fields name and description are required',
    });
  }

  const todoInput: TodoInput = {
    name,
    description,
  };

  const todoCreated = await Todo.create(todoInput);

  return res.status(201).json({ data: todoCreated });
});

  exports.updateTodo = catchAsyncErrors( async(req: Request, res:Response) => {
    const { id } = req.params;
  const { description, name } = req.body;

  const todo = await Todo.findOne({ _id: id });

  if (!todo) {
    return res.status(404).json({ message: `Todo with id "${id}" not found.` });
  }

  if (!name || !description) {
    return res.status(422).json({ message: 'The fields name and description are required' });
  }

   await Todo.updateOne({ _id: id }, { name, description });
  const todoUpdated = await Todo.findById(id, { name, description });
  return res.status(200).json({ data: todoUpdated});
});

exports.deleteTodo = catchAsyncErrors(async (req:Request, res:Response) => {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);
  
    return res.status(200).json({ message: 'Todo deleted successfully.' });
});