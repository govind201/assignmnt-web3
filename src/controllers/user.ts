import { Request, Response } from 'express';
import crypto from 'crypto';
import catchAsyncErrors from '../utils';

import { User, UserInput } from '../models/user';
import { Todo } from '../models/todo';

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');

  return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
};

const createUser = catchAsyncErrors( async (req: Request, res: Response) => {
  const { email, fullName, password, todo } = req.body;

  if (!email || !fullName || !password || !todo) {
    return res.status(422).json({ message: 'The fields email, fullName, password and todo are required' });
  }

  const userInput: UserInput = {
    fullName,
    email,
    password: hashPassword(password),
    todo,
  }
  const todo_db = await Todo.findOne({ _id: todo});

  if (todo_db) {
    return res.status(404).json({ message: `Todo with id "${todo}" alredy exists.` });
  }

  let userCreated = await User.create(userInput);

  return res.status(201).json({ data: userCreated });
});

const getAllUsers = catchAsyncErrors( async (req: Request, res: Response) => {
  const users = await User.find().populate('todo').sort('-createdAt').exec();

  return res.status(200).json({ data: users });
});

const getUser = catchAsyncErrors( async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).populate('todo').exec();

  if (!user) {
    return res.status(404).json({ message: `User with id "${id}" not found.` });
  }

  return res.status(200).json({ data: user });
});

const updateUser = catchAsyncErrors( async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, todo } = req.body;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ message: `User with id "${id}" not found.` });
  }

  if (!fullName || !todo) {
    return res.status(422).json({ message: 'The fields fullName and todo are required' });
  }

  await User.updateOne({ _id: id }, { fullName, todo });

  const userUpdated = await User.findById(id);

  return res.status(200).json({ data: userUpdated });
});

const deleteUser =  catchAsyncErrors( async (req: Request, res: Response) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  return res.status(200).json({ message: 'User deleted successfully.' });
});

export { createUser, deleteUser, getAllUsers, getUser, updateUser };