// app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  
  cookieStore.delete('pb_auth');
  cookieStore.delete('pb_user_id');
  cookieStore.delete('pb_user_fn');
  cookieStore.delete('pb_user_ln');
  cookieStore.delete('pb_user_email');
  
  return NextResponse.json({ success: true });
}