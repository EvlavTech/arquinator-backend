import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { TaskCreate, TaskUpdate, TaskUpdateAndDelete } from '@dto/TaskDTO';

import TaskController from '@controllers/TaskController';

export default function routes(app: Express) {
    app.post(
        '/tasks',
        validateBodyDTO(TaskCreate),
        (req, res) => TaskController.store(req, res),
    );
    app.put(
        '/tasks/:id',
        validateParamsDTO(TaskUpdateAndDelete),
        validateBodyDTO(TaskUpdate),
        (req, res) => TaskController.update(req, res),
    );
    app.get(
        '/tasks',
        (req, res) => TaskController.index(req, res),
    );
    app.delete(
        '/tasks/:id',
        validateParamsDTO(TaskUpdateAndDelete),
        (req, res) => TaskController.delete(req, res),
    );
}
