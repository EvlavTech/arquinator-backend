import UserRepository from '@repositories/UserRepository';

import User, { IUser } from '@models/User';

import BaseService from './BaseService';

class UserService extends BaseService<User, IUser> {
    async create(body: any) {
        const {
            id, name, email, company_id,
        } = await UserRepository.create(body);
        const result: IUser = {
            id,
            name,
            email,
            company_id,
        };

        return result;
    }
}

export default new UserService(UserRepository);
