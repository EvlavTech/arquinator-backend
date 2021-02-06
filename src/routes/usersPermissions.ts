import { Express } from 'express';

import UserPermissionController from '@controllers/UserPermissionController';

export default function routes(app: Express) {
    app.post('/users_permissions', (req, res) =>
        UserPermissionController.store(req, res),
    );
    app.put('/users_permissions/:id', (req, res) =>
        UserPermissionController.update(req, res),
    );
    app.get('/users_permissions', (req, res) =>
        UserPermissionController.index(req, res),
    );
    app.delete('/users_permissions/:id', (req, res) =>
        UserPermissionController.delete(req, res),
    );
}
