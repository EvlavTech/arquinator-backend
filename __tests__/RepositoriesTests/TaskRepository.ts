/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import '../../src/app';
import TaskRepository from '../../src/app/repository/TaskRepository';
import CompanyRepository from '../../src/app/repository/CompanyRepository';
import ClientRepository from '../../src/app/repository/ClientRepository';
import ProjectRepository from '../../src/app/repository/ProjectRepository';
import UserRepository from '../../src/app/repository/UserRepository';
import { ICompany } from '../../src/app/models/Company';
import { IUser } from '../../src/app/models/User';
import { IClient } from '../../src/app/models/Client';
import { IProject } from '../../src/app/models/Project';
import { ITask } from '../../src/app/models/Task';

let company_created_1: ICompany;
let user_created_1: IUser;
let client_created_1: IClient;
let project_1: IProject;
let created_task_1: ITask;
let created_task_2: ITask;

describe('Test task repository', () => {
    it('test task create', async () => {
        company_created_1 = await CompanyRepository.create({
            name: 'Company Test 1',
        });

        user_created_1 = await UserRepository.create({
            name: 'Richer',
            email: 'richer14@gmail.com',
            password: 'test14',
            company_id: company_created_1.id,
        });

        client_created_1 = await ClientRepository.create({
            name: 'Seu João',
            company_id: company_created_1.id,
        });

        project_1 = await ProjectRepository.create({
            name: 'Project_Template_1',
            client_id: client_created_1.id,
            description: 'Confia no pai',
            start_date: new Date(),
            end_date: new Date(),
            duration: 10,
        });

        const date = new Date();

        created_task_1 = await TaskRepository.create({
            name: 'Template_1',
            project_id: project_1.id,
            owner_id: user_created_1.id,
            responsible_id: user_created_1.id,
            start_date: date,
            end_date: date.setDate(date.getDate() + 10),
            done: false,
        });

        created_task_2 = await TaskRepository.create({
            name: 'Template_2',
            project_id: project_1.id,
            start_date: date,
            end_date: date.setDate(date.getDate() + 12),
            owner_id: user_created_1.id,
            responsible_id: user_created_1.id,
            done: false,
        });

        expect(created_task_1).toMatchObject({
            name: 'Template_1',
            project_id: project_1.id,
            owner_id: user_created_1.id,
            responsible_id: user_created_1.id,
        });

        expect(created_task_2).toMatchObject({
            name: 'Template_2',
            project_id: project_1.id,
            owner_id: user_created_1.id,
            responsible_id: user_created_1.id,
        });
    });

    it('Test get all tasks', async () => {
        const tasks = await TaskRepository.findAll();

        expect(tasks).toMatchObject([{
            name: 'Template_1',
            project_id: project_1.id,
            owner_id: user_created_1.id,
            responsible_id: user_created_1.id,
        },
        {
            name: 'Template_2',
            project_id: project_1.id,
            owner_id: user_created_1.id,
            responsible_id: user_created_1.id,
        },
        ]);
    });

    it('Tasks get all with error', async () => {
        const tasks_templates = await TaskRepository.findAll();

        expect(tasks_templates).not.toMatchObject([
            created_task_1,
        ]);
    });

    it('Test get tasks with filters', async () => {
        const tasks = await TaskRepository
            .findByFilters({ name: 'Template_1' });

        expect(tasks).toMatchObject([
            { name: 'Template_1' },
        ]);

        expect(tasks.length).toEqual(1);
    });

    it('Test get tasks with filters with name is not exists', async () => {
        const tasks_templates = await TaskRepository
            .findByFilters({ name: 'Nothing' });

        expect(tasks_templates).toMatchObject([]);
    });

    it('Test get tasks with filters with id is equal created 2',
        async () => {
            const task_template = await TaskRepository
                .findByFilters({ id: created_task_2.id });

            expect(task_template).toMatchObject([
                { name: 'Template_2', id: created_task_2.id },
            ]);
            expect(task_template.length).toEqual(1);
        });

    it('Test get by id task with id not exists', async () => {
        const task_template = await TaskRepository.findById(100);

        expect(task_template).toEqual(null);
    });

    it('Test update tasks', async () => {
        const task_template_update = await TaskRepository
            .update(created_task_2.id, { name: 'Template_2 Update' });
        const task = await TaskRepository
            .findById(created_task_2.id);

        expect(task_template_update[0]).toEqual(1);
        expect(task).toMatchObject({
            name: 'Template_2 Update',
            project_id: project_1.id,
            owner_id: user_created_1.id,
        });
    });

    it('Test update tasks with id not exists', async () => {
        const task_template = await TaskRepository
            .update(100, { name: 'Template_2 Test Update' });

        expect(task_template[0]).toEqual(0);
    });

    it('Test delete tasks', async () => {
        const task = await TaskRepository
            .delete(created_task_1.id);
        const task_deleted = await TaskRepository
            .findById(created_task_1.id);

        expect(task).toMatchObject({
            name: 'Template_1',
            project_id: project_1.id,
            owner_id: user_created_1.id,
        });
        expect(task_deleted).toEqual(null);
    });

    it('Test delete task with id not exists', async () => {
        const task_template = await TaskRepository.delete(100);

        expect(task_template).toEqual(null);
    });

    afterAll(async () => {
        await CompanyRepository.delete(company_created_1.id);
    });
});
