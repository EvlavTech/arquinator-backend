import ClientRepository from '@repositories/ClientRepository';

import Client, { IClient } from '@models/Client';

import BaseService from './BaseService';

class ClientService extends BaseService<Client, IClient> {
}

export default new ClientService(ClientRepository);
