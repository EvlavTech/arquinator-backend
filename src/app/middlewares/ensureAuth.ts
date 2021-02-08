import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import PermissionService from '../services/PermissionService';
import auth from '@config/auth';
import BaseError from '../errors/BaseError';
import UserPermissionService from '../services/UserPermissionService';
import { error } from 'console';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuth(permissionName: String) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            response.status(401).json({ message: 'unauthorized' });
            return;
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded = verify(token, auth.jwt.secret) as TokenPayload;
            const permissionNameId = await PermissionService.repository.findByFilters(
                { name: permissionName },
            );
            const checkUserPermission = await UserPermissionService.repository.findByFilters(
                {
                    user_id: Number(decoded.sub),
                    permission_id: permissionNameId[0].id,
                },
            );

            if (!checkUserPermission[0]) {
                throw error;
            }

            request.user = {
                id: decoded.sub,
            };

            return next();
        } catch {
            response.status(401).json({ message: 'unauthorized' });
        }
    };
}
