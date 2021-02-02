/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import '../../src/app';
import CompanyRepository from '../../src/app/repository/CompanyRepository';
import ClientRepository from '../../src/app/repository/ClientRepository';
import { ICompany } from '../../src/app/models/Company';
import { IClient } from '../../src/app/models/Client';

let company_created: ICompany;
let created_client_1: IClient;
let created_client_2: IClient;

describe('Tests client repository', () => {
    it('Test create client', async () => {
        company_created = await CompanyRepository.create({
            name: 'Company Test',
        });

        created_client_1 = await ClientRepository.create({
            name: 'Client 1 Test',
            company_id: company_created.id,
        });

        created_client_2 = await ClientRepository.create({
            name: 'Client 2 Test',
            company_id: company_created.id,
        });

        expect(created_client_1.name).toBe('Client 1 Test');
        expect(created_client_1.company_id).toBe(company_created.id);

        expect(created_client_2.name).toBe('Client 2 Test');
        expect(created_client_2.company_id).toBe(company_created.id);
    });

    it('Test get all clients', async () => {
        const clients = await ClientRepository.findAll();

        expect(clients).toMatchObject([
            { name: 'Client 1 Test' },
            { name: 'Client 2 Test' },
        ]);
    });

    it('Test get all clients with error', async () => {
        const clients = await ClientRepository.findAll();

        expect(clients).not.toMatchObject([
            { name: 'Client 1 Test' },
        ]);
    });

    it('Test get clients with filters', async () => {
        const clients = await ClientRepository.findByFilters({ name: 'Client 1 Test' });

        expect(clients).toMatchObject([
            { name: 'Client 1 Test' },
        ]);

        expect(clients.length).toEqual(1);
    });

    it('Test get clients with filters with name is not exists', async () => {
        const clients = await ClientRepository.findByFilters({ name: 'Client' });

        expect(clients).toMatchObject([]);
    });

    it('Test get clients with filters with company_id is not exists', async () => {
        const clients = await ClientRepository.findByFilters({ company_id: 150 });

        expect(clients).toMatchObject([]);
    });

    it('Test get by id clients', async () => {
        const clients = await ClientRepository.findById(created_client_1.id);

        expect(clients).toMatchObject({ name: 'Client 1 Test' });
    });

    it('Test get by id clients with id not exists', async () => {
        const clients = await ClientRepository.findById(150);

        expect(clients).toEqual(null);
    });

    it('Test update clients', async () => {
        const clients = await ClientRepository.update(created_client_1.id, { name: 'Client 1 Test Update' });
        const client = await ClientRepository.findById(created_client_1.id);

        expect(clients[0]).toEqual(1);
        expect(client).toMatchObject({ name: 'Client 1 Test Update' });
    });

    it('Test update clients with id not exists', async () => {
        const clients = await ClientRepository.update(150, { name: 'Client 3 Test Update' });

        expect(clients[0]).toEqual(0);
    });

    it('Test delete clients', async () => {
        const client = await ClientRepository.delete(created_client_1.id);
        const client_deleted = await ClientRepository.findById(created_client_1.id);

        expect(client).toMatchObject({ name: 'Client 1 Test Update' });
        expect(client_deleted).toEqual(null);
    });

    it('Test delete clients with id not exists', async () => {
        const client = await ClientRepository.delete(150);

        expect(client).toEqual(null);
    });

    afterAll(async () => {
        await CompanyRepository.delete(company_created.id);
    });
});
