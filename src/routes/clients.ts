import { Express } from 'express';

import ClientController from '../app/controllers/ClientController';

export default function routes(app: Express) {
    app.post('/clients', ClientController.store);
    app.get('/clients', ClientController.index);
    app.delete('/clients/:id', ClientController.delete);
}
