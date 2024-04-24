import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import db from "@/lib/db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateUniqueUsername(firstName: string) {
  let username = `${firstName.toLowerCase()}${Math.floor(
    Math.random() * 10000
  )}`;
  const usernameExists = await db.user.findFirst({
    where: {
      name: username,
    },
  });
  while (usernameExists) {
    username = `${firstName.toLowerCase()}${Math.floor(Math.random() * 10000)}`;
  }
  return username;
}

export const formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
