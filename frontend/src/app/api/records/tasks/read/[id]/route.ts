import { NextResponse } from 'next/server';
import { pb } from '@/lib/utils';

export async function POST({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const task = await pb.collection('tasks').getOne(id);

    return NextResponse.json({
      success: true,
      task,
    });
    
  } catch (error) {
    console.error('Error fetching task:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch task' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
