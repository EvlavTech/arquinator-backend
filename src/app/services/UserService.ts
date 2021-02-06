import UserRepository from '@repositories/UserRepository';

import User, { IUser } from '@models/User';

import BaseService from './BaseService';
import BaseError from '../errors/BaseError';

class UserService extends BaseService<User, IUser> {
    async create(body: any) {
        const { id, name, email, company_id } = await UserRepository.create(
            body,
        );
        const result: IUser = {
            id,
            name,
            email,
            company_id,
        };

        return result;
    }

    async update(
        id: number,
        bodyUpdated: IUser,
    ): Promise<IUser | BaseError | null> {
        const hasUpdated = await UserRepository.update(id, bodyUpdated);
        if (!hasUpdated[0]) {
            throw new BaseError('Id not found!', 404);
        }
        const object = await UserRepository.findById(id);
        if (object) {
            const { name, email, company_id }: IUser = object;
            return { id, name, email, company_id };
        }
        return object;
    }
}

export default new UserService(UserRepository);
