import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(req: NextRequest) {

  try {
    
    const body = await req.json();

    const { username, email, password } = body;

    if (!username) {
      return NextResponse.json("Please provide a username.", { status: 400 });
    }

    if (!email) {
      return NextResponse.json("Please provide a email.", { status: 400 });
    }

    if (!password) {
      return NextResponse.json("Please provide a password.", { status: 400 });
    }

    const existingEmailOrUsername = await db.user.findFirst({
      where: {
        OR: [{ email }, { name: username }],
      },
    });

    if (existingEmailOrUsername) {
      return NextResponse.json("Email or username already in use.", {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        username,
        hashedPassword,
        emailVerified: new Date(),
      },
    });

    return NextResponse.json("User created successfully!", { status: 201 });

  } catch (error: any) {

    console.error(error);
    
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );

  }
}
