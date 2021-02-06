import { Request, Response } from 'express';

import Project, { IProject } from '@models/Project';

import BaseController from './BaseController';
import ProjectService from '../services/ProjectService';

class ProjectController extends BaseController<Project, IProject> {
    async getProjectsByCompanyId(req: Request, res: Response): Promise<Response<IProject[]>> {
        try {
            const objects = await ProjectService.getProjectsByCompanyId(
                Number(req.params.company_id),
            );
            return res.status(200).json(objects);
        } catch (error) {
            return res.status(error.statusCode).json({ message: error.message });
        }
    }
}

export default new ProjectController(ProjectService);
