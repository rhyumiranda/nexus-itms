import { NextRequest, NextResponse } from "next/server";
import { pb } from "@/lib/utils";


export async function POST( request: NextRequest ) {
  const { email, password } = await request.json();

  try {
    const authData = await pb.collection( 'users' ).authWithPassword( email, password );
    
    const response = NextResponse.json({
      success: true,
      user: authData.record,
    });

    response.cookies.set( 'pb_auth', pb.authStore.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch ( error ) {
    return NextResponse.json(
      { sucess: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  }
}
