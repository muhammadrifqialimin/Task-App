import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  public createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.nextId++,
      title: createTaskDto.title,
      description: createTaskDto.description || '',
      isCompleted: createTaskDto.isCompleted ?? false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  public updateTask(id: number, updateTaskDto: UpdateTaskDto): Task | undefined {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return undefined;
    }

    const task = this.tasks[taskIndex];
    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description;
    }
    if (updateTaskDto.isCompleted !== undefined) {
      task.isCompleted = updateTaskDto.isCompleted;
    }

    return task;
  }

  public deleteTask(id: number): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }
}
