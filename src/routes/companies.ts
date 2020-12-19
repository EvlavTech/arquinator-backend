import { Express } from 'express';

import CompanyController from '../app/controllers/CompanyController';

export default function routes(app: Express) {
    app.post('/companies', CompanyController.store);
    app.get('/companies', CompanyController.index);
    app.delete('/companies/:id', CompanyController.delete);
}
