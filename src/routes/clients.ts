import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import {
    ClientCreate,
    ClientUpdate,
    ClientUpdateAndDelete,
} from '@dto/Client/ClientDTO';
import { CompanyUpdateAndDelete } from '@dto/Company/CompanyDTO';

import ClientController from '@controllers/ClientController';

export default function routes(app: Express) {
    app.post('/clients', validateBodyDTO(ClientCreate), (req, res) =>
        ClientController.store(req, res),
    );
    app.get('/clients', (req, res) => ClientController.index(req, res));
    app.put(
        '/clients/:id',
        validateParamsDTO(ClientUpdateAndDelete),
        validateBodyDTO(ClientUpdate),
        (req, res) => ClientController.update(req, res),
    );
    app.get(
        '/clients/:id',
        validateParamsDTO(CompanyUpdateAndDelete),
        (req, res) => ClientController.index(req, res),
    );
    app.delete(
        '/clients/:id',
        validateParamsDTO(CompanyUpdateAndDelete),
        (req, res) => ClientController.delete(req, res),
    );
}
