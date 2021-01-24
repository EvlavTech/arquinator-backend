import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { TaskTemplateCreate, TaskTemplateUpdate, TaskTemplateUpdateAndDelete } from '@dto/TaskTemplateDTO';

import TaskTemplateController from '@controllers/TaskTemplateController';

export default function routes(app: Express) {
    app.post(
        '/tasks_templates',
        validateBodyDTO(TaskTemplateCreate),
        (req, res) => TaskTemplateController.store(req, res),
    );
    app.put(
        '/tasks_templates/:id',
        validateParamsDTO(TaskTemplateUpdateAndDelete),
        validateBodyDTO(TaskTemplateUpdate),
        (req, res) => TaskTemplateController.update(req, res),
    );
    app.get(
        '/tasks_templates',
        (req, res) => TaskTemplateController.index(req, res),
    );
    app.delete(
        '/tasks_templates/:id',
        validateParamsDTO(TaskTemplateUpdateAndDelete),
        (req, res) => TaskTemplateController.delete(req, res),
    );
}
