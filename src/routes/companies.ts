import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { CompanyCreate, CompanyUpdate, CompanyUpdateAndDelete } from '@dto/Company/CompanyDTO';

import CompanyController from '@controllers/CompanyController';

export default function routes(app: Express) {
    app.post('/companies', validateBodyDTO(CompanyCreate), (req, res) => CompanyController.store(req, res));
    app.put('/companies/:id', validateParamsDTO(CompanyUpdateAndDelete), validateBodyDTO(CompanyUpdate), (req, res) => CompanyController.update(req, res));
    app.get('/companies', (req, res) => CompanyController.index(req, res));
    app.get('/companies/:id', validateParamsDTO(CompanyUpdateAndDelete), (req, res) => CompanyController.get(req, res));
    app.delete('/companies/:id', validateParamsDTO(CompanyUpdateAndDelete), (req, res) => CompanyController.delete(req, res));
}
