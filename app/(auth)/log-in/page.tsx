import { Metadata } from "next";
import Link from "next/link";

import { LogInForm } from "@/app/(auth)/log-in/components/form";

export const metadata: Metadata = {
  title: "EXPOSURE | Log in",
  description: "A ficctitional website to post photographies",
};

const LogInPage = () => {
  return (
    <section className="flex h-[calc(100dvh-50px)] w-full flex-col justify-center gap-10 px-4 py-8 md:h-auto md:items-center lg:h-dvh">
      <div className="flex h-full w-full max-w-96 flex-col items-start justify-center gap-10">
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
