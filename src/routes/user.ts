import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user';

export const routes = () => {
  const router = Router();

  router.post('/users', createUser);

  router.get('/users', getAllUsers);

  router.get('/users/:id', getUser);

  router.patch('/users/:id', updateUser);

  router.delete('/users/:id', deleteUser);

  return router;
};

module.exports = routes();