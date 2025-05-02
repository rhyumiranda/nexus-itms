import {NextResponse, NextRequest} from "next/server";
import { pb } from "@/lib/utils";
import { cookies } from "next/headers";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) { 

  try{

    const cookieStore = await cookies();
    const authCookie = cookieStore.get('pb_auth')?.value;

    if (authCookie) {
      pb.authStore.save(authCookie);
    }

    const taskId = params.id;

    const { title, description, user, status, priority, deadline, createdAt } = await request.json();

    console.log("Updating task:", taskId);
    console.log("Data:", { title, description, user, status, priority, deadline });

  
    const record = await pb.collection('tasks').update(taskId, {
      "title": title,
      "description": description, 
      "user": user,
      "status": status,
      "priority": priority,
      "deadline": deadline,
      "createdAt": createdAt
    });

    console.log("Update successful:", record);

    return NextResponse.json({
      success: true,
      task: record
    });
  } catch (error: unknown) {
    console.error("Error updating task:", error);
    
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      
      const pbError = error as any;
      if (pbError.data) {
        console.error("PocketBase error data:", pbError.data);
      }
      
      return NextResponse.json({
        success: false,
        error: 'Failed to update task: ' + error.message,
        errorDetails: pbError.data || {}
      }, { status: 500 });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to update task: ' + String(error),
        errorDetails: {}
      }, { status: 500 });
    }
  }
}