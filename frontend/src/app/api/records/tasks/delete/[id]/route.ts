import { NextResponse } from 'next/server';
import { pb } from '@/lib/utils';
import { cookies } from 'next/headers';
import { env } from 'process';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('pb_auth')?.value;
  if (authCookie) {
    pb.authStore.save(authCookie);
  }
  
  const pb_auth_token = cookieStore.get('pb_auth')?.value;
  const path = process.env.NEXT_PUBLIC_API_URL || `http://127.0.0.1:8090`

  const res = await fetch(`${path}/api/collections/tasks/records/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${pb_auth_token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}