import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import db from "@/lib/db";
import { auth } from "@/lib/auth-options";
import { UTApi } from "uploadthing/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } },
) {
  try {
    const user = await db.user.findUnique({
      where: {
        username: params.username,
      },
      include: {
        posts: {
          include: {
            photo: true,
            user: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "No user found." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { username: string } },
) {
  try {
    const body = await req.json();
    const {
      newUsername,
      currentPassword,
      newPassword,
      newImageUrl,
      newImageKey,
      deleteImageKey,
    } = body;

    const user = await db.user.findUnique({
      where: { username: params.username },
    });

    if (!user) {
      return NextResponse.json(
        { message: "No user found." },
        {
          status: 404,
        },
      );
    }

    const session = await auth();

    if (session?.user.id !== user?.id) {
      return NextResponse.json({ message: "Error." }, { status: 404 });
    }

    if (newUsername) {
      const existingUsername = await db.user.findUnique({
        where: {
          username: newUsername,
        },
      });

      if (existingUsername) {
        return NextResponse.json(
          { message: "Username already in use." },
          {
            status: 409,
          },
        );
      }

      await db.user.update({
        where: { id: user.id },
        data: { username: newUsername },
      });

      return NextResponse.json(
        { message: "Usernamed changed successfully!" },
        {
          status: 200,
        },
      );
    }

    if (newPassword) {
      if (!user.hashedPassword) {
        return NextResponse.json(
          { message: "User cannot change password." },
          {
            status: 409,
          },
        );
      }

      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.hashedPassword,
      );

      if (!isPasswordCorrect)
        return NextResponse.json(
          { message: "Password is incorrect." },
          {
            status: 409,
          },
        );

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db.user.update({
        where: { id: user.id },
        data: { hashedPassword },
      });

      return NextResponse.json(
        { message: "Password changed successfully!" },
        {
          status: 200,
        },
      );
    }

    if (newImageUrl) {
      if (user.image && user.imageKey) {
        const utapi = new UTApi();
        const res = await utapi.deleteFiles(user.imageKey);

        if (res.success === false) {
          return NextResponse.json(
            { message: "Failed to delete image from uploadthing." },
            {
              status: 400,
            },
          );
        }
      }

      await db.user.update({
        where: { id: user.id },
        data: { image: newImageUrl, imageKey: newImageKey },
      });

      return NextResponse.json(
        { message: "Image changed successfully!" },
        {
          status: 200,
        },
      );
    }

    if (deleteImageKey) {
      const utapi = new UTApi();
      const res = await utapi.deleteFiles(deleteImageKey);

      if (res.success === false) {
        return NextResponse.json(
          { message: "Failed to delete image from uploadthing." },
          {
            status: 400,
          },
        );
      }

      await db.user.update({
        where: { username: params.username },
        data: { image: "", imageKey: "" },
      });

      return NextResponse.json(
        { message: "Image deleted successfully!" },
        {
          status: 200,
        },
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { username: string } },
) {
  try {

    const session = await auth();

    const user = await db.user.findUnique({
      where: { username: params.username },
      include: { posts: { include: { photo: true } } },
    });

    if (!user) {
      return NextResponse.json({ message: "No user found." }, { status: 404 });
    }

    if (session?.user.id !== user?.id) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const keys: string[] = [];

    if (user.posts.length !== 0) {
      keys.push(
        ...user.posts
          .filter(({ photo }) => photo?.key)
          .map(({ photo }) => photo!.key)
      );
    }

    if (user.imageKey) {
      keys.push(user.imageKey);
    }

    if (keys.length > 0) {
      const utapi = new UTApi();
      const res = await utapi.deleteFiles(keys);

      if (!res.success) {
        return NextResponse.json(
          { message: "Failed to delete files from uploadthing." },
          { status: 400 },
        );
      }
    }

    await db.user.delete({ where: { username: params.username } });

    return NextResponse.json(
      { message: "User and associated data deleted successfully!" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
