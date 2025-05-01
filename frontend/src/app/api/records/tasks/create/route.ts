import { NextResponse, NextRequest } from "next/server";
import { pb } from "@/lib/utils";

export async function POST( request: NextRequest ) {
  
  try {
    const { title, description, user, status, priority, deadline } = await request.json();

    const createTask = await pb.collection( 'tasks' ).create({
      "title": title,
      "description": description,
      "user": user,
      "status": status,
      "priority": priority,
      "deadline": deadline
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