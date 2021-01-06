import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import BaseService from '../services/BaseService';

class BaseController<T extends Sequelize.Model<T> & K, K> {
    public service: BaseService<T, K>;

    constructor(service: BaseService<T, K>) {
        this.service = service;
    }

    async store(req: Request, res: Response) {
        try {
            const object = await this.service.create(req.body);
            return res.status(201).json(object);
        } catch (error) {
            // TODO: Error vai informar o status code.
            return res.status(500).json({ message: error.message });
        }
    }

    async index(req: Request, res: Response): Promise<Response<K[]>> {
        try {
            const objects = await this.service.findAll();
            return res.status(200).json(objects);
        } catch (error) {
            // TODO: Error vai informar o status code.
            return res.status(500).json({ message: error.message });
        }
    }

    async get(req: Request, res: Response): Promise<Response<K[]>> {
        try {
            const object = await this.service.findById(Number(req.params.id));
            return res.status(200).json(object);
        } catch (error) {
            // TODO: Error vai informar o status code.
            return res.status(404).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response<K>> {
        try {
            const object = await this.service.delete(Number(req.params.id));
            return res.status(200).json(object);
        } catch (error) {
            // TODO: Error vai informar o status code.
            return res.status(404).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response<K>> {
        try {
            await this.service.update(Number(req.params.id), req.body);
            const object = await this.service.findById(Number(req.params.id));
            return res.status(200).json(object);
        } catch (error) {
            // TODO: Error vai informar o status code.
            return res.status(404).json({ message: error.message });
        }
    }
}

export default BaseController;
