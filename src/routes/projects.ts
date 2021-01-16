import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { ProjectCreate, ProjectupdateAndDelete, ProjectUpdate } from '@dto/ProjectDTO';

import ProjectController from '@controllers/ProjectController';

export default function routes(app: Express) {
    app.post(
        '/projects',
        validateBodyDTO(ProjectCreate),
        (req, res) => ProjectController.store(req, res),
    );
    app.put(
        '/projects/:id',
        validateParamsDTO(ProjectupdateAndDelete),
        validateBodyDTO(ProjectUpdate),
        (req, res) => ProjectController.update(req, res),
    );
    app.get(
        '/projects',
        (req, res) => ProjectController.index(req, res),
    );
    app.delete(
        '/projects/:id',
        validateParamsDTO(ProjectupdateAndDelete),
        (req, res) => ProjectController.delete(req, res),
    );
}
