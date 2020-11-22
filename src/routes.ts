import { Router } from 'express';

import CompanyController from '@controllers/CompanyController';
import ClientController from '@controllers/ClientController';
import ProjectController from '@controllers/ProjectController';

import UserController from './app/controllers/UserController';

const routes = Router();

// Users
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.delete('/users/:id', UserController.delete);

// Companies
routes.post('/companies', CompanyController.store);
routes.get('/companies', CompanyController.index);
routes.delete('/companies/:id', CompanyController.delete);

// Clients
routes.post('/clients', ClientController.store);
routes.get('/clients', ClientController.index);
routes.delete('/clients/:id', ClientController.delete);

// Projects
routes.post('/projects', ProjectController.store);
routes.get('/projects', ProjectController.index);
routes.delete('/projects/:id', ProjectController.delete);

export default routes;
