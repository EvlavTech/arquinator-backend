import User, { IUser } from '@models/User';

class UserRepository {
    async create(user: IUser): Promise<User> {
        const res = await User.create(user);

        return res;
    }

    async findAll(): Promise<User[]> {
        const res = await User.findAll();
        return res;
    }

    async findById(idUser: number): Promise<User | null> {
        const user = await User.findByPk(idUser);
        return user;
    }

    async delete(idUser: number): Promise<User | null> {
        const user = await this.findById(idUser);
        if (user) {
            await User.destroy({ where: { id: idUser } });
        }

        return user;
    }

    async update(idUser: number, user: IUser): Promise<[number, User[]]> {
        const userUpdated = await User.update(user, { where: { id: idUser } });
        return userUpdated;
    }
}

export default new UserRepository();
