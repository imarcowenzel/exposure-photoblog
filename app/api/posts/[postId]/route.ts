import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

import { auth } from "@/lib/auth-options";
import db from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } },
) {

  try {

    if (!params.postId) {
      return NextResponse.json({message: "postId parameter is missing."}, { status: 400 });
    }

    const post = await db.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        photo: true,
        user: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "No post found." },
        { status: 404 },
      );
    }

    return NextResponse.json(post, { status: 200 });

  } catch (error: any) {

    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );

  }
}

export async function PUT(
  req: Request,
  { params }: { params: { postId: string } },
) {

  try {

    const body = await req.json();
    const { tags } = body;

    if (!tags) {
      return NextResponse.json({message: "Please provide at least one tag."}, { status: 400 });
    }

    const session = await auth();

    const post = await db.post.findUnique({ where: { id: params.postId } });

    if (!post) {
      return NextResponse.json({message: "No post found."}, { status: 404 });
    }

    if (session?.user.id !== post?.userId) {
      return NextResponse.json({message: "Error."}, { status: 404 });
    }

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        tags,
      },
    });

    return NextResponse.json({message: "Post edited successfully!"}, { status: 200 });

  } catch (error: any) {

    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );

  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } },
) {

  try {

    const session = await auth();

    const post = await db.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        photo: true,
      },
    });

    if (!post || !post.photo || !post.photo.key)
      return NextResponse.json({message: "No post found."}, { status: 409 });

    if (session?.user.id !== post?.userId) {
      return NextResponse.json({message: "Error."}, { status: 404 });
    }
    
    const utapi = new UTApi();
    const res = await utapi.deleteFiles(post?.photo?.key);

    if (res.success === false) {
      return NextResponse.json({message: "Failed to delete post from uploadthing."}, {
        status: 400,
      });
    }

    await db.post.delete({ where: { id: post.id } });

    revalidatePath(`/profile/${session?.user.username}`);

    return NextResponse.json(
      { revalidate: true, message: "Post deleted successfully!" },
      { status: 200 },
    );

  } catch (error: any) {

    console.log(error)
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );

  }
}
