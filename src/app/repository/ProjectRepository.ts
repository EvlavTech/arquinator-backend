import Project, { IProject } from '@models/Project';

class ProjectRepository {
    async create(project: IProject): Promise<Project> {
        const res = await Project.create(project);
        return res;
    }

    async findAll(): Promise<Project[]> {
        const res = await Project.findAll();
        return res;
    }

    async findById(idProject: number): Promise<Project | null> {
        const project = await Project.findByPk(idProject);
        return project;
    }

    async delete(idProject: number): Promise<Project | null> {
        const project = await this.findById(idProject);
        if (project) {
            await Project.destroy({ where: { id: idProject } });
        }

        return project;
    }

    async update(idProject: number, project: IProject): Promise<[number, Project[]]> {
        const projectUpdated = await Project.update(project, { where: { id: idProject } });
        return projectUpdated;
    }
}

export default new ProjectRepository();
