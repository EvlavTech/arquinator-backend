import { Request, Response } from 'express';

import { IUser } from '@models/User';

import UserRepository from '../repository/UserRepository';

class UserController {
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

    async index(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await UserRepository.findAll();

        return res.status(200).json(users);
    }

    async delete(req: Request, res: Response): Promise<Response<IUser>> {
        const user = await UserRepository.delete(Number(req.params.id));

        return res.status(200).json(user);
    }

    async update(req: Request, res: Response): Promise<Response<IUser>> {
        const hasUpdated = await UserRepository.update(Number(req.params.id), req.body);
        if (hasUpdated[0]) {
            const user = await UserRepository.findById(Number(req.params.id));
            return res.status(200).json(user);
        }

        return res.status(404).json({ message: `User with id = ${req.params.id} not found!` });
    }
}

export default new UserController();
