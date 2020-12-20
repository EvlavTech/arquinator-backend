import Client, { IClient } from '@models/Client';

import ClientRepository from '../repository/ClientRepository';
import BaseController from './BaseController';

class ClientController extends BaseController<Client, IClient> {
}

export default new ClientController(ClientRepository);
