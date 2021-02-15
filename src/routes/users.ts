import { Express } from 'express';
import multer from "multer";
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { UserCreate, UserUpdate, UserUpdateAndDelete } from '@dto/UserDTO';
import UserController from '@controllers/UserController';

import uploadConfig from "../config/upload";
import ensureAuth from '@middlewares/ensureAuth';
const upload = multer(uploadConfig);

export default function routes(app: Express) {
    app.post('/users', validateBodyDTO(UserCreate), (req, res) =>
        UserController.store(req, res),
    );
    app.get('/users', (req, res) => UserController.index(req, res));
    app.put(
        '/users/:id',
        validateParamsDTO(UserUpdateAndDelete),
        validateBodyDTO(UserUpdate),
        (req, res) => UserController.update(req, res),
    );
    app.patch(
        '/users/avatar',
        ensureAuth('USER'),
        upload.single('avatar'),
        UserController.uploadAvatar
    );
    app.get('/users/:id', validateParamsDTO(UserUpdateAndDelete), (req, res) =>
        UserController.get(req, res),
    );
    app.delete(
        '/users/:id',
        validateParamsDTO(UserUpdateAndDelete),
        (req, res) => UserController.delete(req, res),
    );
}
