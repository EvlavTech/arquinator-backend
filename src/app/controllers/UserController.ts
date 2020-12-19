import { Request, Response } from 'express';

import { IUser } from '@models/User';

import UserRepository from '../repository/UserRepository';

class UserController {
    async store(req: Request, res: Response) {
        const {
            id, name, email, company_id,
        } = await UserRepository.create(req.body);

        return res.json({
            id,
            name,
            email,
            company_id,
        });
    }

    async index(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await UserRepository.findAll();

        return res.json(users);
    }

    async delete(req: Request, res: Response): Promise<Response<IUser>> {
        const user = await UserRepository.delete(Number(req.params.id));

        return res.json(user);
    }

    async update(req: Request, res: Response): Promise<Response<IUser>> {
        const hasUpdated = await UserRepository.update(Number(req.params.id), req.body);
        if (hasUpdated[0]) {
            const user = await UserRepository.findById(Number(req.params.id));
            return res.json(user);
        }

        return res.status(400).json({ message: `User with id = ${req.params.id} not found!` });
    }
}

export default new UserController();
