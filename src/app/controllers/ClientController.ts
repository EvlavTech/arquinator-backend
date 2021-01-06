import Client, { IClient } from '@models/Client';

import BaseController from './BaseController';
import ClientService from '../services/ClientService';

class ClientController extends BaseController<Client, IClient> {
}

export default new ClientController(ClientService);
