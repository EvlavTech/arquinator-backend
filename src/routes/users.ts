import { Express } from 'express';

import UserController from '../app/controllers/UserController';

export default function routes(app: Express) {
    app.post('/users', UserController.store);
    app.put('/users/:id', UserController.update);
    app.get('/users', UserController.index);
    app.delete('/users/:id', UserController.delete);
}
