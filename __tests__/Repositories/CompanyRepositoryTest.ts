/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import '../../src/app';
import CompanyRepository from '@repositories/CompanyRepository';

describe('Tests company repository', () => {
    it('Test create company', async () => {
        const company_created_1 = await CompanyRepository.create({
            name: 'Company Test 1',
        });

        const company_created_2 = await CompanyRepository.create({
            name: 'Company Test 2',
        });

        expect(company_created_1.name).toBe('Company Test 1');
        expect(company_created_1.id).toBe(1);

        expect(company_created_2.name).toBe('Company Test 2');
        expect(company_created_2.id).toBe(2);
    });

    it('Test get all companies', async () => {
        const companies = await CompanyRepository.findAll();

        expect(companies).toMatchObject([
            { name: 'Company Test 1', id: 1 },
            { name: 'Company Test 2', id: 2 },
        ]);
    });

    it('Test get all companies with error', async () => {
        const companies = await CompanyRepository.findAll();

        expect(companies).not.toMatchObject([
            { name: 'Company Test 1', id: 1 },
        ]);
    });

    it('Test get companies with filters', async () => {
        const companies = await CompanyRepository.findByFilters({ name: 'Company Test 1' });

        expect(companies).toMatchObject([
            { name: 'Company Test 1', id: 1 },
        ]);

        expect(companies.length).toEqual(1);
    });

    it('Test get companies with filters with name is not exists', async () => {
        const companies = await CompanyRepository.findByFilters({ name: 'Company' });

        expect(companies).toMatchObject([]);
    });

    it('Test get companies with filters with id is equal 1', async () => {
        const companies = await CompanyRepository.findByFilters({ id: 2 });

        expect(companies).toMatchObject([
            { name: 'Company Test 2', id: 2 },
        ]);
        expect(companies.length).toEqual(1);
    });

    it('Test get companies with filters with id is not exists', async () => {
        const companies = await CompanyRepository.findByFilters({ id: 4 });

        expect(companies).toMatchObject([]);
    });

    it('Test get by id companies', async () => {
        const companies = await CompanyRepository.findById(1);

        expect(companies).toMatchObject({ name: 'Company Test 1', id: 1 });
    });

    it('Test get by id companies with id not exists', async () => {
        const companies = await CompanyRepository.findById(4);

        expect(companies).toEqual(null);
    });

    it('Test update companies', async () => {
        const companies = await CompanyRepository.update(2, { name: 'Company Test 1 Update' });
        const company = await CompanyRepository.findById(2);

        expect(companies[0]).toEqual(1);
        expect(company).toMatchObject({ name: 'Company Test 1 Update', id: 2 });
    });

    it('Test update companies with id not exists', async () => {
        const companies = await CompanyRepository.update(4, { name: 'Company 3 Test Update' });

        expect(companies[0]).toEqual(0);
    });

    it('Test delete companies', async () => {
        const company = await CompanyRepository.delete(2);
        const company_deleted = await CompanyRepository.findById(2);

        expect(company).toMatchObject({ name: 'Company Test 1 Update', id: 2 });
        expect(company_deleted).toEqual(null);
    });

    it('Test delete companies with id not exists', async () => {
        const company = await CompanyRepository.delete(4);

        expect(company).toEqual(null);
    });
});
