import { NextResponse, NextRequest } from "next/server";
import { pb } from "@/lib/utils";

export async function POST( request: NextRequest ) {
  
  try {
    const { title, description, status, priority, deadline } = await request.json();

    const createTask = await pb.collection( 'tasks' ).create({
      "task_title": title,
      "task_description": description,
      "task_userId": pb.authStore.record?.id,
      "task_status": status,
      "task_priority": priority,
      "task_deadline": deadline
    })

    console.log("Task created successfully:", createTask);

    const response = NextResponse.json({
      success: true,
      task: createTask.record,
    })

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create task:'
    }, { status: 500
    })
  }
}