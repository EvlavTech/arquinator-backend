/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import '../../src/app';
import CompanyRepository from '../../src/app/repository/CompanyRepository';
import ClientRepository from '../../src/app/repository/ClientRepository';
import ProjectTemplateRepository from '../../src/app/repository/ProjectTemplateRepository';
import { ICompany } from '../../src/app/models/Company';
import { IProjectTemplate } from '../../src/app/models/ProjectTemplate';

let company_created_1: ICompany;
let project_template_created_1: IProjectTemplate;
let project_template_created_2: IProjectTemplate;

describe('Tests project repository', () => {
    it('Test create project', async () => {
        company_created_1 = await CompanyRepository.create({
            name: 'Company Test 1',
        });

        const client_created_1 = await ClientRepository.create({
            name: 'Client Test 1',
            company_id: company_created_1.id,
        });

        project_template_created_1 = await ProjectTemplateRepository.create({
            name: 'Project Template Test 1',
            description: 'Description project template 1',
            client_id: client_created_1.id,
            company_id: company_created_1.id,
            duration: 10,
        });

        project_template_created_2 = await ProjectTemplateRepository.create({
            name: 'Project Template Test 2',
            description: 'Description project template 2',
            client_id: client_created_1.id,
            company_id: company_created_1.id,
            duration: 25,
        });

        expect(project_template_created_1.name).toBe('Project Template Test 1');
        expect(project_template_created_1.description).toBe('Description project template 1');
        expect(project_template_created_1.duration).toBe(10);
        expect(project_template_created_1.client_id).toBe(client_created_1.id);

        expect(project_template_created_2.name).toBe('Project Template Test 2');
        expect(project_template_created_2.description).toBe('Description project template 2');
        expect(project_template_created_2.duration).toBe(25);
        expect(project_template_created_2.client_id).toBe(client_created_1.id);
    });

    it('Test get all projects templates', async () => {
        const projects = await ProjectTemplateRepository.findAll();

        expect(projects).toMatchObject([
            {
                name: 'Project Template Test 1',
                description: 'Description project template 1',
                duration: 10,
            },
            {
                name: 'Project Template Test 2',
                description: 'Description project template 2',
                duration: 25,
            },
        ]);
    });

    it('Test get all projects templates with error', async () => {
        const projects = await ProjectTemplateRepository.findAll();

        expect(projects).not.toMatchObject([
            { name: 'Project Template Test 1' },
        ]);
    });

    it('Test get projects templates with filters', async () => {
        const projects_templates = await ProjectTemplateRepository
            .findByFilters({ name: 'Project Template Test 1' });

        expect(projects_templates).toMatchObject([
            {
                name: 'Project Template Test 1',
                description: 'Description project template 1',
                duration: 10,
            },
        ]);

        expect(projects_templates.length).toEqual(1);
    });

    it('Test get projects templates with filters with name is not exists', async () => {
        const projects_templates = await ProjectTemplateRepository
            .findByFilters({ name: 'Project Template Test' });

        expect(projects_templates).toMatchObject([]);
    });

    it('Test get projects templates with filters with id is equal 1', async () => {
        const projects_templates = await ProjectTemplateRepository
            .findByFilters({ id: project_template_created_1.id });

        expect(projects_templates).toMatchObject([
            {
                name: 'Project Template Test 1',
                description: 'Description project template 1',
                duration: 10,
            },
        ]);
        expect(projects_templates.length).toEqual(1);
    });

    it('Test get projects templates with filters with id is not exists', async () => {
        const projects = await ProjectTemplateRepository
            .findByFilters({ id: 150 });

        expect(projects).toMatchObject([]);
    });

    it('Test get by id projects templates', async () => {
        const projects = await ProjectTemplateRepository
            .findById(project_template_created_2.id);

        expect(projects).toMatchObject({
            name: 'Project Template Test 2',
            description: 'Description project template 2',
            duration: 25,
        });
    });

    it('Test get by id projects with id not exists', async () => {
        const projects = await ProjectTemplateRepository.findById(150);

        expect(projects).toEqual(null);
    });

    it('Test update projects', async () => {
        const projects = await ProjectTemplateRepository.update(
            project_template_created_2.id,
            { name: 'Project Template Test 2 Update' },
        );
        const project = await ProjectTemplateRepository
            .findById(project_template_created_2.id);

        expect(projects[0]).toEqual(1);
        expect(project).toMatchObject({
            name: 'Project Template Test 2 Update',
            description: 'Description project template 2',
            duration: 25,
        });
    });

    it('Test update projects with id not exists', async () => {
        const projects = await ProjectTemplateRepository.update(150,
            { name: 'Company 3 Test Update' });

        expect(projects[0]).toEqual(0);
    });

    it('Test delete projects', async () => {
        const project = await ProjectTemplateRepository.delete(
            project_template_created_2.id,
        );
        const project_deleted = await ProjectTemplateRepository.findById(
            project_template_created_2.id,
        );

        expect(project).toMatchObject({
            name: 'Project Template Test 2 Update',
            description: 'Description project template 2',
            duration: 25,
        });
        expect(project_deleted).toEqual(null);
    });

    it('Test delete projects with id not exists', async () => {
        const project = await ProjectTemplateRepository.delete(150);

        expect(project).toEqual(null);
    });

    afterAll(async () => {
        await CompanyRepository.delete(company_created_1.id);
    });
});
