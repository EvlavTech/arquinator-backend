import { Express } from 'express';

import UserController from '@controllers/UserController';

export default function routes(app: Express) {
    app.post('/users', (req, res) => UserController.store(req, res));
    app.put('/users/:id', (req, res) => UserController.update(req, res));
    app.get('/users', (req, res) => UserController.index(req, res));
    app.delete('/users/:id', (req, res) => UserController.delete(req, res));
}
