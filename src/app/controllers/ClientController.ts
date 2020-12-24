import ClientRepository from '@repositories/ClientRepository';

import Client, { IClient } from '@models/Client';

import BaseController from './BaseController';

class ClientController extends BaseController<Client, IClient> {
}

export default new ClientController(ClientRepository);
