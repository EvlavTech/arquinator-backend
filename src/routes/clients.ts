import { Express } from 'express';

import ClientController from '@controllers/ClientController';

export default function routes(app: Express) {
    app.post('/clients', (req, res) => ClientController.store(req, res));
    app.put('/clients/:id', (req, res) => ClientController.update(req, res));
    app.get('/clients', (req, res) => ClientController.index(req, res));
    app.delete('/clients/:id', (req, res) => ClientController.delete(req, res));
}
