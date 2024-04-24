import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(params: { username: string }, req: Request) {

  try {

    // const user = await db.user.findUnique({
    //   where: {
    //     username: params.username,
    //   },
    // });

    // if (!user) {
    //   return NextResponse.json("No user found.", { status: 409 });
    // }

    // return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
