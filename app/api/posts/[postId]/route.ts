import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

import db from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await db.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        photo: true,
        user: true,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {

    const body = await req.json();
    const { user } = body;

    console.log(user)

    const post = await db.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        photo: true,
        user: true,
      },
    });

    if (!post || !post.photo || !post.photo.key)
      return NextResponse.json("No post found!", { status: 400 });

    if (post?.userId !== user.id)
      return NextResponse.json("ERROR 403: Unauthorized user.", {
        status: 403,
      });

    const utapi = new UTApi();
    const res = await utapi.deleteFiles(post?.photo?.key);

    if (res.success === false) {
      return NextResponse.json("Failed to delete post from uploadthing.", {
        status: 400,
      });
    }

    await db.post.delete({ where: { id: post.id } });

    // TODO: Check revalidate path
    // TODO: if not the user whos deleting, says unauthorize

    revalidatePath("/");

    return NextResponse.json(
      { revalidate: true, message: "Post deleted." },
      { status: 200 }
    );

  } catch (error: any) {

    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );

  }
}

export async function PUT(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const body = await req.json();
    const { tags, user } = body;

    // TODO: if not the user whos deleting, says unauthorize
    if (!tags || !user)
      return NextResponse.json("ERROR 400: No tags or user found.", {
        status: 400,
      });

    const post = await db.post.findUnique({ where: { id: params.postId } });

    if (post?.userId !== user.id)
      return NextResponse.json("ERROR 403: Unauthorized user.", {
        status: 403,
      });

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        tags,
      },
    });

    revalidatePath(`/post/${params.postId}`);

    return NextResponse.json(
      { revalidated: true, message: "Post edited" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
