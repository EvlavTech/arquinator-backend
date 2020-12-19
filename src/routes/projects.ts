import { Express } from 'express';

import ProjectController from '../app/controllers/ProjectController';

export default function routes(app: Express) {
    app.post('/projects', ProjectController.store);
    app.get('/projects', ProjectController.index);
    app.delete('/projects/:id', ProjectController.delete);
}
