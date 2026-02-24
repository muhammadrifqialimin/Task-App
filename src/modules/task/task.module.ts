import { TaskService } from './task.service';
import { TaskController } from './task.controller';

// Singleton instances for the application
export const taskService = new TaskService();
export const taskController = new TaskController(taskService);
