/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import '../../src/app';
import CompanyRepository from '@repositories/CompanyRepository';

import ClientRepository from '../../src/app/repository/ClientRepository';

describe('Tests client repository', () => {
    it('Test create client', async () => {
        const company_created = await CompanyRepository.create({
            name: 'Company Test',
        });

        const created_client_1 = await ClientRepository.create({
            name: 'Client 1 Test',
            company_id: company_created.id,
        });

        const created_client_2 = await ClientRepository.create({
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
            { name: 'Client 1 Test', company_id: 3 },
            { name: 'Client 2 Test', company_id: 3 },
        ]);
    });

    it('Test get all clients with error', async () => {
        const clients = await ClientRepository.findAll();

        expect(clients).not.toMatchObject([
            { name: 'Client 1 Test', company_id: 3 },
        ]);
    });

    it('Test get clients with filters', async () => {
        const clients = await ClientRepository.findByFilters({ name: 'Client 1 Test' });

        expect(clients).toMatchObject([
            { name: 'Client 1 Test', company_id: 3 },
        ]);

        expect(clients.length).toEqual(1);
    });

    it('Test get clients with filters with name is not exists', async () => {
        const clients = await ClientRepository.findByFilters({ name: 'Client' });

        expect(clients).toMatchObject([]);
    });

    it('Test get clients with filters with company_id is equal 1', async () => {
        const clients = await ClientRepository.findByFilters({ company_id: 3 });

        expect(clients).toMatchObject([
            { name: 'Client 1 Test', company_id: 3 },
            { name: 'Client 2 Test', company_id: 3 },
        ]);
        expect(clients.length).toEqual(2);
    });

    it('Test get clients with filters with company_id is not exists', async () => {
        const clients = await ClientRepository.findByFilters({ company_id: 2 });

        expect(clients).toMatchObject([]);
    });

    it('Test get by id clients', async () => {
        const clients = await ClientRepository.findById(1);

        expect(clients).toMatchObject({ name: 'Client 1 Test', company_id: 3 });
    });

    it('Test get by id clients with id not exists', async () => {
        const clients = await ClientRepository.findById(3);

        expect(clients).toEqual(null);
    });

    it('Test update clients', async () => {
        const clients = await ClientRepository.update(1, { name: 'Client 1 Test Update' });
        const client = await ClientRepository.findById(1);

        expect(clients[0]).toEqual(1);
        expect(client).toMatchObject({ name: 'Client 1 Test Update', company_id: 3 });
    });

    it('Test update clients with id not exists', async () => {
        const clients = await ClientRepository.update(3, { name: 'Client 3 Test Update' });

        expect(clients[0]).toEqual(0);
    });

    it('Test delete clients', async () => {
        const client = await ClientRepository.delete(1);
        const client_deleted = await ClientRepository.findById(1);

        expect(client).toMatchObject({ name: 'Client 1 Test Update', company_id: 3 });
        expect(client_deleted).toEqual(null);
    });

    it('Test delete clients with id not exists', async () => {
        const client = await ClientRepository.delete(3);

        expect(client).toEqual(null);
    });
});
