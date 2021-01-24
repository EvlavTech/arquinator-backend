import TaskTemplate, { ITaskTemplate } from '@models/templates/TaskTemplate';

import BaseController from './BaseController';
import TaskTemplateService from '../services/TaskTemplateService';

class TaskTemplateController extends BaseController<TaskTemplate, ITaskTemplate> {
}

export default new TaskTemplateController(TaskTemplateService);
