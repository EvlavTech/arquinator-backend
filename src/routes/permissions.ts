import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import {
    PermissionCreate,
    PermissionUpdate,
    PermissionUpdateAndDelete,
} from '@dto/PermissionDTO';

import PermissionController from '@controllers/PermissionController';

export default function routes(app: Express) {
    app.post('/permissions', validateBodyDTO(PermissionCreate), (req, res) =>
        PermissionController.store(req, res),
    );
    app.get('/permissions', (req, res) => PermissionController.index(req, res));
    app.put(
        '/permissions/:id',
        validateParamsDTO(PermissionUpdateAndDelete),
        validateBodyDTO(PermissionUpdate),
        (req, res) => PermissionController.update(req, res),
    );
    app.get(
        '/permissions/:id',
        validateParamsDTO(PermissionUpdateAndDelete),
        (req, res) => PermissionController.index(req, res),
    );
    app.delete(
        '/permissions/:id',
        validateParamsDTO(PermissionUpdateAndDelete),
        (req, res) => PermissionController.delete(req, res),
    );
}
