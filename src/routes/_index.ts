import { Express, Request, Response } from 'express';

import UsersRoutes from './users';
import UsersPermissionsRoutes from './usersPermissions';
import PermissionsRoutes from './permissions';
import ClientsRoutes from './clients';
import ProjectsRoutes from './projects';
import ProjectTemplateRoutes from './projectTemplate';
import CompaniesRoutes from './companies';
import TaskRoutes from './tasks';
import TaskTemplateRoutes from './taskTemplate';
import SessionRoutes from './sessions';

export default function initRoutes(app: Express) {
    app.get('/api', (req: Request, res: Response) =>
        res.status(200).send({
            message: 'server is running!',
        }),
    );

    UsersRoutes(app);
    UsersPermissionsRoutes(app);
    PermissionsRoutes(app);
    ClientsRoutes(app);
    ProjectsRoutes(app);
    CompaniesRoutes(app);
    ProjectTemplateRoutes(app);
    TaskRoutes(app);
    TaskTemplateRoutes(app);
    SessionRoutes(app);

    app.all('*', (req: Request, res: Response) =>
        res.status(404).json({ message: 'Route not found!' }),
    );
}
