import {NextResponse, NextRequest} from "next/server";
import { pb } from "@/lib/utils";
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {

  try{

    const cookie = await cookies();
    const currentUserId = cookie.get('pb_user_id')?.value;

    const retrieveTasks = await pb.collection('tasks').getFullList({
      sort: '-created',
      filter: `user = "${currentUserId}"`
    });

    const response = NextResponse.json({
      success: true,
      tasks: retrieveTasks
    })

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve tasks'
    }, { status: 500 })
  }
}