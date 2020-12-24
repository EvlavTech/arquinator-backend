import { Request, Response } from 'express';

import User, { IUser } from '@models/User';

import UserRepository from '../repository/UserRepository';
import BaseController from './BaseController';

class UserController extends BaseController<User, IUser> {
    async store(req: Request, res: Response) {
        const {
            id, name, email, company_id,
        } = await UserRepository.create(req.body);

        return res.status(201).json({
            id,
            name,
            email,
            company_id,
        });
    }
}

export default new UserController(UserRepository);
