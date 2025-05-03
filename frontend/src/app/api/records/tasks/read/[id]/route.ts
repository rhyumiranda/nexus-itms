// src/app/api/records/tasks/update/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/utils';

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Extract task ID from URL

  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing task ID' }, { status: 400 });
  }

  const body = await request.json();

  try {
    const updated = await pb.collection('tasks').update(id, body);

    return NextResponse.json({
      success: true,
      task: updated,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ success: false, error: 'Failed to update task' }, { status: 500 });
  }
}
