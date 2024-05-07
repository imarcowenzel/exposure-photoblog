import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, key, userId, tags } = body;

    if (!url) {
      return NextResponse.json(
        { message: "Please provide a URL." },
        { status: 400 },
      );
    }

    if (!key) {
      return NextResponse.json(
        { message: "Please provide a key." },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "Please provide a user ID." },
        { status: 400 },
      );
    }

    if (!tags) {
      return NextResponse.json(
        { message: "Please provide at least one tag." },
        {
          status: 400,
        },
      );
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
        key,
        post: {
          connect: {
            id: post.id,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Post created successfully!" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {

  try {

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || undefined;

    if (q) {
      const posts = await db.post.findMany({
        where: {
          OR: [
            {
              user: {
                username: q,
              },
            },
            { tags: { has: q } },
          ],
        },
        include: { photo: true, user: true },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(posts, { status: 200 });
    }

    const posts = await db.post.findMany({
      include: { photo: true, user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
