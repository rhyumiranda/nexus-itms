import { NextRequest, NextResponse } from "next/server";
import { pb } from "@/lib/utils";


export async function POST( request: NextRequest ) {
  const { email } = await request.json();

  try {

    const response = await fetch('https://nexus-itms-db.fly.dev/api/collections/users/request-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Failed to send password reset email');
    }
    
    return NextResponse.json({
      message: 'Password reset email sent successfully',
      }, {
      status: 200,
    })

  } catch (error) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json({
      message: 'Failed to send password reset email',
    }, {
      status: 500,
    })
  }

}