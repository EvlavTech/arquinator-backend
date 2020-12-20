import { Express } from 'express';

import ProjectController from '../app/controllers/ProjectController';

export default function routes(app: Express) {
    app.post('/projects', (req, res) => ProjectController.store(req, res));
    app.put('/projects/:id', (req, res) => ProjectController.update(req, res));
    app.get('/projects', (req, res) => ProjectController.index(req, res));
    app.delete('/projects/:id', (req, res) => ProjectController.delete(req, res));
}
