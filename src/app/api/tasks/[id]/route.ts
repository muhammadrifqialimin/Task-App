import { taskController } from '@/modules/task/task.module';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  return taskController.findOne(p.id);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  return taskController.update(p.id, request);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  return taskController.remove(p.id);
}
