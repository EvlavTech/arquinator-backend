import Task, { ITask } from '@models/Task';

import BaseController from './BaseController';
import TaskService from '../services/TaskService';

class TaskController extends BaseController<Task, ITask> {
}

export default new TaskController(TaskService);
