import { taskController } from '@/modules/task/task.module';

export async function POST(request: Request) {
  return taskController.create(request);
}

export async function GET() {
  return taskController.findAll();
}
