import { Express } from 'express';

import CompanyController from '@controllers/CompanyController';

export default function routes(app: Express) {
    app.post('/companies', (req, res) => CompanyController.store(req, res));
    app.put('/companies/:id', (req, res) => CompanyController.update(req, res));
    app.get('/companies', (req, res) => CompanyController.index(req, res));
    app.delete('/companies/:id', (req, res) => CompanyController.delete(req, res));
}
