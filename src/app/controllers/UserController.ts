import { Request, Response } from 'express';

import User from '@models/User';

class UserController {
    async store(req: Request, res: Response) {
        const {
            id, name, email, company_id,
        } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            company_id,
        });
    }

    async index(req: Request, res: Response): Promise<Response<User[]>> {
        const users = await User.findAll();

        return res.json(users);
    }

    async delete(req: Request, res: Response): Promise<Response<User>> {
        const user = await User.destroy({ where: { id: req.params.id } });

        return res.json(user);
    }
}

export default new UserController();
