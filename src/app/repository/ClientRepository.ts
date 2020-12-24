import Client, { IClient } from '@models/Client';

import BaseRepository from './BaseRepository';

class ClientRepository extends BaseRepository<Client, IClient> {
}

export default new ClientRepository(Client);
