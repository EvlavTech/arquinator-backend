import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import BaseRepository from '../repository/BaseRepository';

class BaseController<T extends Sequelize.Model<T> & K, K> {
    public repository: BaseRepository<T, K>;

    constructor(repository: BaseRepository<T, K>) {
        this.repository = repository;
    }

    async store(req: Request, res: Response) {
        const object = await this.repository.create(req.body);

        return res.status(201).json(object);
    }

    async index(req: Request, res: Response): Promise<Response<K[]>> {
        const users = await this.repository.findAll();

        return res.status(200).json(users);
    }

    async delete(req: Request, res: Response): Promise<Response<K>> {
        const user = await this.repository.delete(Number(req.params.id));

        return res.status(200).json(user);
    }

    async update(req: Request, res: Response): Promise<Response<K>> {
        const hasUpdated = await this.repository.update(Number(req.params.id), req.body);
        if (hasUpdated[0]) {
            const user = await this.repository.findById(Number(req.params.id));
            return res.status(200).json(user);
        }

        return res.status(404).json({ message: 'Id not found!' });
    }
}

export default BaseController;
