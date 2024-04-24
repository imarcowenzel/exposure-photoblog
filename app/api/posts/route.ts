import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { url, imageKey, userId, tags } = body;

    if (!url || !imageKey || !userId || !tags) {
      return NextResponse.json("All fields are required", { status: 400 });
    }

    const post = await db.post.create({
      data: {
        userId,
        tags,
      },
    });

    await db.photo.create({
      data: {
        url,
        key: imageKey,
        post: {
          connect: {
            id: post.id,
          },
        },
      },
    });

    return NextResponse.json("Post created.", { status: 201 });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || undefined;

    const post = await db.post.findMany({
      where: {
        AND: [
          {
            OR: [{ user: { username: query } }],
            // TODO: add tags
          },
        ],
      },
      include: { photo: true, user: true },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
