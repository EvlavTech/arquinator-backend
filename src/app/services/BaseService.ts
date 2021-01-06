import Sequelize from 'sequelize';
import BaseRepository from '@repositories/BaseRepository';

class BaseService<T extends Sequelize.Model<T> & K, K> {
    public repository: BaseRepository<T, K>;

    constructor(repository: BaseRepository<T, K>) {
        this.repository = repository;
    }

    async create(body: any): Promise<K | Error> {
        const object = await this.repository.create(body);
        return object;
    }

    async findAll(): Promise<K[]> {
        const objects = await this.repository.findAll();
        return objects;
    }

    async findById(id: number): Promise<K | null> {
        const object = await this.repository.findById(id);
        return object;
    }

    async delete(id: number): Promise<K | Error> {
        const object = await this.repository.delete(id);
        if (!object) {
            throw new Error(`Object with ID = ${id} not found!`);
        }

        return object;
    }

    async update(id: number, bodyUpdated: any): Promise<K | Error | null> {
        const hasUpdated = await this.repository.update(id, bodyUpdated);
        if (!hasUpdated[0]) {
            throw new Error('Id not found!');
        }

        const object = await this.repository.findById(id);
        return object;
    }
}

export default BaseService;
