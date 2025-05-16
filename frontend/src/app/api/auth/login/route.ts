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
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set( 'pb_user_id', pb.authStore.record?.id ?? '', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    response.cookies.set('pb_user_fn', (pb.authStore.record?.firstName ?? '').trim(), {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    response.cookies.set( 'pb_user_ln', pb.authStore.record?.lastName ?? '', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    response.cookies.set( 'pb_user_email', (pb.authStore.record?.email ?? '').trim(), {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response;
  } catch ( error ) {
    console.error(error);
    return NextResponse.json(
      { sucess: false, error: 'Invalid credentials', },
      { status: 401 }
    );
  }
}
