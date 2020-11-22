import { Request, Response } from 'express';

import Project from '@models/Project';

class ProjectController {
    async store(req: Request, res: Response) {
        const project = await Project.create(req.body);

        return res.json(project);
    }

    async index(req: Request, res: Response) {
        const projects = await Project.findAll();

        return res.json(projects);
    }

    async delete(req: Request, res: Response) {
        const project = await Project.destroy({ where: { id: req.params.id } });

        return res.json(project);
    }
}

export default new ProjectController();
