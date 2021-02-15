import path from "path";
import fs from "fs";
import uploadConfig from "../../config/upload";
import UserRepository from "@repositories/UserRepository";
import BaseError from "../errors/BaseError";
import { IUser } from "@models/User";

class UploadUsersAvatarService {
    public async uploadAvatar(userId: number, avatarFilename: string): Promise<IUser> {
        const user = await UserRepository.findById(userId);

        if (!user) {
            throw new BaseError('Only authenticated users can change avatar.', 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatar = await fs.promises.stat(userAvatarFilePath);
            
            if (userAvatar) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await UserRepository.update(userId, {avatar: avatarFilename });

        return user;
    }
}

export default new UploadUsersAvatarService();