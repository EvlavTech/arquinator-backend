import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = Router();

// Users
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.delete('/users/:id', UserController.delete);

export default routes;
