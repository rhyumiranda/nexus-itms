import { NextResponse, NextRequest } from "next/server";
import { pb } from "@/lib/utils";
import { cookies } from "next/headers";

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies(); // no need to await
    const authCookie = cookieStore.get('pb_auth')?.value;

    if (authCookie) {
      pb.authStore.save(authCookie);
    }

    const url = new URL(request.url);
    const taskId = url.pathname.split("/").pop();

    if (!taskId) {
      return NextResponse.json({ success: false, error: "Missing task ID" }, { status: 400 });
    }

    const { title, description, user, status, priority, deadline, createdAt } = await request.json();

    const record = await pb.collection("tasks").update(taskId, {
      title,
      description,
      user,
      status,
      priority,
      deadline,
      createdAt,
    });

    return NextResponse.json({
      success: true,
      task: record,
    });
  } catch (error: unknown) {
    console.error("Error updating task:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
