/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import '../../src/app';
import CompanyRepository from '../../src/app/repository/CompanyRepository';
import { ICompany } from '../../src/app/models/Company';

let company_created_1: ICompany;
let company_created_2: ICompany;

describe('Tests company repository', () => {
    it('Test create company', async () => {
        company_created_1 = await CompanyRepository.create({
            name: 'Company Test 1',
        });

        company_created_2 = await CompanyRepository.create({
            name: 'Company Test 2',
        });

        expect(company_created_1.name).toBe('Company Test 1');
        expect(company_created_2.name).toBe('Company Test 2');
    });

    it('Test get all companies', async () => {
        const companies = await CompanyRepository.findAll();

        expect(companies).toMatchObject([
            { name: 'Company Test 1' },
            { name: 'Company Test 2' },
        ]);
    });

    it('Test get all companies with error', async () => {
        const companies = await CompanyRepository.findAll();

        expect(companies).not.toMatchObject([
            { name: 'Company Test 1' },
        ]);
    });

    it('Test get companies with filters', async () => {
        const companies = await CompanyRepository.findByFilters({ name: 'Company Test 1' });

        expect(companies).toMatchObject([
            { name: 'Company Test 1' },
        ]);

        expect(companies.length).toEqual(1);
    });

    it('Test get companies with filters with name is not exists', async () => {
        const companies = await CompanyRepository.findByFilters({ name: 'Company' });

        expect(companies).toMatchObject([]);
    });

    it('Test get companies with filters with id is equal 1', async () => {
        const companies = await CompanyRepository.findByFilters({ id: company_created_1.id });

        expect(companies).toMatchObject([
            { name: 'Company Test 1', id: company_created_1.id },
        ]);
        expect(companies.length).toEqual(1);
    });

    it('Test get companies with filters with id is not exists', async () => {
        const companies = await CompanyRepository.findByFilters({ id: 150 });

        expect(companies).toMatchObject([]);
    });

    it('Test get by id companies', async () => {
        const companies = await CompanyRepository.findById(company_created_2.id);

        expect(companies).toMatchObject({ name: 'Company Test 2', id: company_created_2.id });
    });

    it('Test get by id companies with id not exists', async () => {
        const companies = await CompanyRepository.findById(150);

        expect(companies).toEqual(null);
    });

    it('Test update companies', async () => {
        const companies = await CompanyRepository.update(company_created_2.id, { name: 'Company Test 2 Update' });
        const company = await CompanyRepository.findById(company_created_2.id);

        expect(companies[0]).toEqual(1);
        expect(company).toMatchObject({ name: 'Company Test 2 Update', id: company_created_2.id });
    });

    it('Test update companies with id not exists', async () => {
        const companies = await CompanyRepository.update(150, { name: 'Company 3 Test Update' });

        expect(companies[0]).toEqual(0);
    });

    it('Test delete companies', async () => {
        const company = await CompanyRepository.delete(company_created_2.id);
        const company_deleted = await CompanyRepository.findById(company_created_2.id);

        expect(company).toMatchObject({ name: 'Company Test 2 Update', id: company_created_2.id });
        expect(company_deleted).toEqual(null);
    });

    it('Test delete companies with id not exists', async () => {
        const company = await CompanyRepository.delete(150);

        expect(company).toEqual(null);
    });

    afterAll(async () => {
        await CompanyRepository.delete(company_created_1.id);
    });
});
