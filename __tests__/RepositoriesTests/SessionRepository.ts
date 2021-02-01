/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import bcryptjs from 'bcryptjs';

import '../../src/app';
import UserSessionRepository from '../../src/app/repository/UserSessionRepository';
import CompanyRepository from '../../src/app/repository/CompanyRepository';
import UserRepository from '../../src/app/repository/UserRepository';
import { ICompany } from '../../src/app/models/Company';
import { IUser } from '../../src/app/models/User';

let company_created_1: ICompany;
let user_created_1: IUser;

describe('User session repository', () => {
    it('test if session repository get same user', async () => {
        company_created_1 = await CompanyRepository.create({
            name: 'Company Test 1',
        });

        user_created_1 = await UserRepository.create({
            name: 'Richer',
            email: 'richer14@gmail.com',
            password: 'test14',
            company_id: company_created_1.id,
        });

        const user_session_1 = await UserSessionRepository
            .findById(user_created_1.id);

        expect(user_session_1).toMatchObject({
            name: 'Richer',
            email: 'richer14@gmail.com',
            password_hash: bcryptjs.hash('test14', 8),
            company_id: company_created_1.id,
        });
    });

    afterAll(async () => {
        await CompanyRepository.delete(company_created_1.id);
    });
});
