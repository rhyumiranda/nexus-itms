import { NextResponse, NextRequest } from 'next/server';
import { pb } from '@/lib/utils';
import { cookies } from 'next/headers';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {  
  const id = await request.json();
  
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('pb_auth')?.value;
  if (authCookie) {
    pb.authStore.save(authCookie);
  }
  console.log("Auth cookie:", authCookie);
  
  
  try {
    const taskId = params.id;

    console.log("Deleting task:", taskId);

    const response = await pb.collection('tasks').delete(id);

    console.log("Delete response:", response);

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to delete task: ' + String(error)
    }, { status: 500 });
  }
}