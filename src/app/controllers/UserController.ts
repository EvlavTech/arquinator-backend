import { Request, Response } from 'express';
import User, { IUser } from '@models/User';

import BaseController from './BaseController';
import UserService from '../services/UserService';

import UploadUsersAvatarService from "../services/UploadUsersAvatarService";

class UserController extends BaseController<User, IUser> {
    public async uploadAvatar(req: Request, res: Response) {
        const { id, name, avatar, company_id, email } = await 
            UploadUsersAvatarService.uploadAvatar(
                req.user.id,
                req.file.filename,
            );

        return res.json({ id, name, avatar, company_id, email});
    }

}

export default new UserController(UserService);
