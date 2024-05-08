import { Metadata } from "next";
import Link from "next/link";

import { LogInForm } from "@/app/(auth)/log-in/components/form";

export const metadata: Metadata = {
  title: "EXPOSURE | Log in",
  description: "A ficctitional website to post photographies",
};

const LogInPage = () => {
  return (
    <section className="flex w-full h-[calc(100dvh-50px)] md:h-auto lg:h-dvh flex-col justify-center gap-10 px-4 py-8 md:items-center">
      <div className="flex h-full w-full max-w-96 flex-col items-start gap-10 lg:justify-center">
        <h1 className="text-xl font-medium">Log into your account</h1>
        <LogInForm />
        <Link href="/sign-up" className="text-sm font-semibold hover:underline">
          or sing up for an account
        </Link>
      </div>
    </section>
  );
};

export default LogInPage;
