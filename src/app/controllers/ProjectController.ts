import { Request, Response } from 'express';

import { IProject } from '@models/Project';

import ProjectRepository from '../repository/ProjectRepository';

class ProjectController {
    async store(req: Request, res: Response): Promise<Response<IProject>> {
        const project = await ProjectRepository.create(req.body);

        return res.status(201).json(project);
    }

    async index(req: Request, res: Response): Promise<Response<IProject[]>> {
        const projects = await ProjectRepository.findAll();

        return res.status(200).json(projects);
    }

    async delete(req: Request, res: Response): Promise<Response<IProject>> {
        const project = await ProjectRepository.delete(Number(req.params.id));

        return res.status(200).json(project);
    }

    async update(req: Request, res: Response): Promise<Response<IProject>> {
        const hasUpdated = await ProjectRepository.update(Number(req.params.id), req.body);
        if (hasUpdated[0]) {
            const project = await ProjectRepository.findById(Number(req.params.id));
            return res.status(200).json(project);
        }

        return res.status(404).json({ message: `User with id = ${req.params.id} not found!` });
    }
}

export default new ProjectController();
