import { NextResponse, NextRequest } from "next/server";
import { pb } from "@/lib/utils";

export async function POST( request: NextRequest ) {

  const { email, password, passwordConfirm, firstName, lastName } = await request.json();

  try {
    const authData = await pb.collection( 'users' ).create({
      email,
      emailVisibility: true,
      firstName,
      lastName,
      password,
      passwordConfirm
    });

    const response = NextResponse.json({
      success: true,
      user: authData.record,
    });

    response.cookies.set( 'pb_auth', pb.authStore.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })

    return response;
  } catch ( error ) {
  
  }
}