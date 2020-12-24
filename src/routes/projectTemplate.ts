import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import {
    ProjectTemplateCreate,
    ProjectTemplateUpdate,
    ProjectTemplateUpdateAndDelete,
} from '@dto/ProjectTemplateDTO';

import ProjectTemplateController from '@controllers/ProjectTemplateController';

export default function routes(app: Express) {
    app.post(
        '/projects_templates',
        validateBodyDTO(ProjectTemplateCreate),
        (req, res) => ProjectTemplateController.store(req, res),
    );
    app.put(
        '/projects_templates/:id',
        validateParamsDTO(ProjectTemplateUpdateAndDelete),
        validateBodyDTO(ProjectTemplateUpdate),
        (req, res) => ProjectTemplateController.update(req, res),
    );
    app.get(
        '/projects_templates',
        (req, res) => ProjectTemplateController.index(req, res),
    );
    app.get(
        '/projects_templates/:id',
        validateParamsDTO(ProjectTemplateUpdateAndDelete),
        (req, res) => ProjectTemplateController.get(req, res),
    );
    app.delete(
        '/projects_templates/:id',
        validateParamsDTO(ProjectTemplateUpdateAndDelete),
        (req, res) => ProjectTemplateController.delete(req, res),
    );
}
