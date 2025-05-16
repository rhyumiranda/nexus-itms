import { NextResponse } from "next/server";
import { pb } from "@/lib/utils";
import { cookies } from "next/headers";

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  
  if (!id) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pb_auth")?.value;
  if (authCookie) {
    pb.authStore.save(authCookie);
  }
  
  return NextResponse.json({ success: true });
}
