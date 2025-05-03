import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Get the ID from the path

  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }

  try {
    const task = await pb.collection('tasks').getOne(id);
    return NextResponse.json({ success: true, task });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}