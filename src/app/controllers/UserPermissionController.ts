import UserPermission, { IUserPermission } from '@models/UserPermission';

import BaseController from './BaseController';
import UserPermissionService from '../services/UserPermissionService';

class UserPermissionController extends BaseController<
    UserPermission,
    IUserPermission
> {}

export default new UserPermissionController(UserPermissionService);
