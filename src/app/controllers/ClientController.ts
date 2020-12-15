import { Request, Response } from 'express';

import Client from '@models/Client';

class ClientController {
    async store(req: Request, res: Response): Promise<Response<Client>> {
        const client = await Client.create(req.body);

        return res.json(client);
    }

    async index(req: Request, res: Response): Promise<Response<Client[]>> {
        const clients = await Client.findAll();

        return res.json(clients);
    }

    async delete(req: Request, res: Response): Promise<Response<Client>> {
        const client = await Client.destroy({ where: { id: req.params.id } });

        return res.json(client);
    }
}

export default new ClientController();
