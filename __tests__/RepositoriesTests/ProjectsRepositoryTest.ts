/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import '../../src/app';
import sequelize from 'sequelize';

import CompanyRepository from '../../src/app/repository/CompanyRepository';
import ClientRepository from '../../src/app/repository/ClientRepository';
import ProjectRepository from '../../src/app/repository/ProjectRepository';
import { ICompany } from '../../src/app/models/Company';
import { IProject } from '../../src/app/models/Project';

let company_created_1: ICompany;
let project_created_1: IProject;
let project_created_2: IProject;

describe('Tests project repository', () => {
    it('Test create project', async () => {
        company_created_1 = await CompanyRepository.create({
            name: 'Company Test 1',
        });

        const client_created_1 = await ClientRepository.create({
            name: 'Client Test 1',
            company_id: company_created_1.id,
        });

        project_created_1 = await ProjectRepository.create({
            name: 'Project Test 1',
            description: 'Description project 1',
            client_id: client_created_1.id,
            company_id: company_created_1.id,
            start_date: '2020-12-17T03:00:00.000Z',
            end_date: '2020-12-25T03:00:00.000Z',
            value: 2500,
        });

        project_created_2 = await ProjectRepository.create({
            name: 'Project Test 2',
            description: 'Description project 2',
            client_id: client_created_1.id,
            company_id: company_created_1.id,
            start_date: '2020-12-20T03:00:00.000Z',
            end_date: '2020-12-30T03:00:00.000Z',
            value: 3500,
        });

        expect(project_created_1.name).toBe('Project Test 1');
        expect(project_created_1.description).toBe('Description project 1');
        expect(project_created_1.start_date).toStrictEqual(new Date('2020-12-17T03:00:00.000Z'));
        expect(project_created_1.end_date).toStrictEqual(new Date('2020-12-25T03:00:00.000Z'));
        expect(project_created_1.value).toStrictEqual(2500);

        expect(project_created_2.name).toBe('Project Test 2');
        expect(project_created_2.description).toBe('Description project 2');
        expect(project_created_2.start_date).toStrictEqual(new Date('2020-12-20T03:00:00.000Z'));
        expect(project_created_2.end_date).toStrictEqual(new Date('2020-12-30T03:00:00.000Z'));
        expect(project_created_2.value).toStrictEqual(3500);
    });

    it('Test get all projects', async () => {
        const projects = await ProjectRepository.findAll();

        expect(projects).toMatchObject([
            {
                name: 'Project Test 1',
                description: 'Description project 1',
                start_date: new Date('2020-12-17T03:00:00.000Z'),
                end_date: new Date('2020-12-25T03:00:00.000Z'),
            },
            {
                name: 'Project Test 2',
                description: 'Description project 2',
                start_date: new Date('2020-12-20T03:00:00.000Z'),
                end_date: new Date('2020-12-30T03:00:00.000Z'),
            },
        ]);
    });

    it('Test get all projects with error', async () => {
        const projects = await ProjectRepository.findAll();

        expect(projects).not.toMatchObject([
            { name: 'Company Test 1' },
        ]);
    });

    it('Test get projects with filters', async () => {
        const projects = await ProjectRepository
            .findByFilters({ name: 'Project Test 1' });

        expect(projects).toMatchObject([
            {
                name: 'Project Test 1',
                description: 'Description project 1',
                start_date: new Date('2020-12-17T03:00:00.000Z'),
                end_date: new Date('2020-12-25T03:00:00.000Z'),
            },
        ]);

        expect(projects.length).toEqual(1);
    });

    it('Test get projects with filters with name is not exists', async () => {
        const projects = await ProjectRepository
            .findByFilters({ name: 'Project Test' });

        expect(projects).toMatchObject([]);
    });

    it('Test get projects with filters with id is equal 1', async () => {
        const projects = await ProjectRepository
            .findByFilters({ id: project_created_1.id });

        expect(projects).toMatchObject([
            {
                name: 'Project Test 1',
                description: 'Description project 1',
                start_date: new Date('2020-12-17T03:00:00.000Z'),
                end_date: new Date('2020-12-25T03:00:00.000Z'),
            },
        ]);
        expect(projects.length).toEqual(1);
    });

    it('Test get projects with filters with id is not exists', async () => {
        const projects = await ProjectRepository.findByFilters({ id: 150 });

        expect(projects).toMatchObject([]);
    });

    it('Test get by id projects', async () => {
        const projects = await ProjectRepository.findById(project_created_2.id);

        expect(projects).toMatchObject({
            name: 'Project Test 2',
            description: 'Description project 2',
            start_date: new Date('2020-12-20T03:00:00.000Z'),
            end_date: new Date('2020-12-30T03:00:00.000Z'),
        });
    });

    it('Test get by id projects with id not exists', async () => {
        const projects = await ProjectRepository.findById(7);

        expect(projects).toEqual(null);
    });

    it('Test update projects', async () => {
        const projects = await ProjectRepository.update(project_created_2.id, { name: 'Project Test 2 Update' });
        const project = await ProjectRepository.findById(project_created_2.id);

        expect(projects[0]).toEqual(1);
        expect(project).toMatchObject({
            name: 'Project Test 2 Update',
            description: 'Description project 2',
            start_date: new Date('2020-12-20T03:00:00.000Z'),
            end_date: new Date('2020-12-30T03:00:00.000Z'),
        });
    });

    it('Test update projects with id not exists', async () => {
        const projects = await ProjectRepository.update(150, { name: 'Company 3 Test Update' });

        expect(projects[0]).toEqual(0);
    });

    it('Test finances of projects', async () => {
        const projects = await ProjectRepository.find({
            attributes: [
                [sequelize.fn('sum', sequelize.col('value')), 'value'],
                [sequelize.fn('date_trunc', 'month', sequelize.col('start_date')), 'start_date'],
            ],
            where: { client_id: 1 },
            group: [sequelize.fn('date_trunc', 'month', sequelize.col('start_date'))],
        });

        expect(projects).toMatchObject([
            { value: '6000', start_date: new Date('2020-12-01T00:00:00.000Z') },
        ]);
    });

    it('Test delete projects', async () => {
        const project = await ProjectRepository.delete(project_created_2.id);
        const project_deleted = await ProjectRepository.findById(project_created_2.id);

        expect(project).toMatchObject({
            name: 'Project Test 2 Update',
            description: 'Description project 2',
            start_date: new Date('2020-12-20T03:00:00.000Z'),
            end_date: new Date('2020-12-30T03:00:00.000Z'),
        });
        expect(project_deleted).toEqual(null);
    });

    it('Test delete projects with id not exists', async () => {
        const project = await ProjectRepository.delete(150);

        expect(project).toEqual(null);
    });

    afterAll(async () => {
        await CompanyRepository.delete(company_created_1.id);
    });
});
