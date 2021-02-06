/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import '../../src/app';
import TaskTemplateRepository from '../../src/app/repository/TaskTemplateRepository';
import CompanyRepository from '../../src/app/repository/CompanyRepository';
import ClientRepository from '../../src/app/repository/ClientRepository';
import ProjectTemplateRepository from '../../src/app/repository/ProjectTemplateRepository';
import UserRepository from '../../src/app/repository/UserRepository';
import { ICompany } from '../../src/app/models/Company';
import { IUser } from '../../src/app/models/User';
import { IClient } from '../../src/app/models/Client';
import { IProjectTemplate } from '../../src/app/models/ProjectTemplate';
import { ITaskTemplate } from '../../src/app/models/TaskTemplate';

let company_created_1: ICompany;
let user_created_1: IUser;
let client_created_1: IClient;
let project_template_1: IProjectTemplate;
let created_task_template_1: ITaskTemplate;
let created_task_template_2: ITaskTemplate;

describe('Tests task template repository', () => {
    it('test create task template', async () => {
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

        project_template_1 = await ProjectTemplateRepository.create({
            name: 'Project_Template_1',
            client_id: client_created_1.id,
            description: 'Confia no pai',
            duration: 10,
        });

        created_task_template_1 = await TaskTemplateRepository.create({
            name: 'Template_1',
            duration: 10,
            project_template_id: project_template_1.id,
            owner_id: user_created_1.id,
        });

        created_task_template_2 = await TaskTemplateRepository.create({
            name: 'Template_2',
            duration: 12,
            project_template_id: project_template_1.id,
            owner_id: user_created_1.id,
        });

        expect(created_task_template_1).toMatchObject({
            name: 'Template_1',
            duration: 10,
            project_template_id: project_template_1.id,
            owner_id: user_created_1.id,
        });

        expect(created_task_template_2).toMatchObject({
            name: 'Template_2',
            duration: 12,
            project_template_id: project_template_1.id,
            owner_id: user_created_1.id,
        });
    });

    it('Test get all tasks Templates', async () => {
        const tasks_templates = await TaskTemplateRepository.findAll();

        expect(tasks_templates).toMatchObject([
            {
                name: 'Template_1',
                duration: 10,
                project_template_id: project_template_1.id,
                owner_id: user_created_1.id,
            },
            {
                name: 'Template_2',
                duration: 12,
                project_template_id: project_template_1.id,
                owner_id: user_created_1.id,
            },
        ]);
    });

    it('Tasks template get all with error', async () => {
        const tasks_templates = await TaskTemplateRepository.findAll();

        expect(tasks_templates).not.toMatchObject([
            {
                name: 'Template_1',
                duration: 10,
                project_template_id: project_template_1.id,
                owner_id: user_created_1.id,
            },
        ]);
    });

    it('Test get tasks with filters', async () => {
        const tasks_templates = await TaskTemplateRepository
            .findByFilters({ name: 'Template_1' });

        expect(tasks_templates).toMatchObject([
            { name: 'Template_1' },
        ]);

        expect(tasks_templates.length).toEqual(1);
    });

    it('Test get tasks templates with filters with name is not exists', async () => {
        const tasks_templates = await TaskTemplateRepository
            .findByFilters({ name: 'Nothing' });

        expect(tasks_templates).toMatchObject([]);
    });

    it('Test get tasks templates with filters with id is equal 2', async () => {
        const task_template = await TaskTemplateRepository
            .findByFilters({ id: created_task_template_2.id });

        expect(task_template).toMatchObject([
            { name: 'Template_2', id: created_task_template_2.id },
        ]);
        expect(task_template.length).toEqual(1);
    });

    it('Test get by id task templates with id not exists', async () => {
        const task_template = await TaskTemplateRepository.findById(10);

        expect(task_template).toEqual(null);
    });

    it('Test update tasks', async () => {
        const task_template_update = await TaskTemplateRepository
            .update(created_task_template_2.id, { name: 'Template_2 Update' });
        const task = await TaskTemplateRepository
            .findById(created_task_template_2.id);

        expect(task_template_update[0]).toEqual(1);
        expect(task).toMatchObject({
            name: 'Template_2 Update',
            duration: 12,
            project_template_id: project_template_1.id,
            owner_id: user_created_1.id,
        });
    });

    it('Test update tasks templates with id not exists', async () => {
        const task_template = await TaskTemplateRepository
            .update(100, { name: 'Template_2 Test Update' });

        expect(task_template[0]).toEqual(0);
    });

    it('Test delete tasks templates', async () => {
        const task_template = await TaskTemplateRepository
            .delete(created_task_template_1.id);
        const task_deleted = await TaskTemplateRepository
            .findById(created_task_template_1.id);

        expect(task_template).toMatchObject({
            name: 'Template_1',
            duration: 10,
            project_template_id: project_template_1.id,
            owner_id: user_created_1.id,
        });
        expect(task_deleted).toEqual(null);
    });

    it('Test delete task template with id not exists', async () => {
        const task_template = await TaskTemplateRepository.delete(100);

        expect(task_template).toEqual(null);
    });

    afterAll(async () => {
        await CompanyRepository.delete(company_created_1.id);
    });
});
