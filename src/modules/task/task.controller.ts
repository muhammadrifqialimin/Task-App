import { NextResponse } from 'next/server';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { validateDto, ValidationException } from '../../common/pipes/validation.pipe';

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  public async create(request: Request): Promise<NextResponse> {
    try {
      const body = await request.json();
      const createTaskDto = await validateDto(CreateTaskDto, body);
      const task = this.taskService.createTask(createTaskDto);
      return NextResponse.json(task, { status: 201 });
    } catch (error: unknown) {
      if (error instanceof ValidationException) {
        return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
      }
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }

  public async findAll(): Promise<NextResponse> {
    const tasks = this.taskService.getAllTasks();
    return NextResponse.json(tasks, { status: 200 });
  }

  public async findOne(id: string): Promise<NextResponse> {
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const task = this.taskService.getTaskById(taskId);
    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  }

  public async update(id: string, request: Request): Promise<NextResponse> {
    try {
      const taskId = parseInt(id, 10);
      if (isNaN(taskId)) {
        return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
      }

      const body = await request.json();
      const updateTaskDto = await validateDto(UpdateTaskDto, body);
      
      const task = this.taskService.updateTask(taskId, updateTaskDto);
      if (!task) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 });
      }

      return NextResponse.json(task, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof ValidationException) {
        return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
      }
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }

  public async remove(id: string): Promise<NextResponse> {
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const isDeleted = this.taskService.deleteTask(taskId);
    if (!isDeleted) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  }
}
