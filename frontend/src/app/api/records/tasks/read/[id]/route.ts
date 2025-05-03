import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/utils';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const task = await pb.collection('tasks').getOne(id);
    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}