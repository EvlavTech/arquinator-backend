import { Express } from 'express';
import { validateBodyDTO } from '@middlewares/validateDTO';
import SessionDTO from '@dto/SessionDTO';

import SessionController from '@controllers/SessionController';

export default function routes(app: Express) {
    app.post(
        '/session',
        validateBodyDTO(SessionDTO),
        (req, res) => SessionController.createToken(req, res),
    );
}
