import Permission, { IPermission } from '@models/Permission';

import BaseController from './BaseController';
import PermissionService from '../services/PermissionService';

class PermissionController extends BaseController<Permission, IPermission> {}

export default new PermissionController(PermissionService);
