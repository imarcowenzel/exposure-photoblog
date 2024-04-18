import { Metadata } from "next";
import Link from "next/link";

import { LogInForm } from "@/app/(auth)/log-in/components/form";

export const metadata: Metadata = {
  title: "EXPOSURE | Log in",
  description: "A ficctitional website to post photographies",
};

const LogInPage = () => {
  return (
    <section className="flex w-full h-full flex-col justify-center gap-10 py-12 md:items-center">
      <div className="flex flex-col items-start gap-10 px-6 w-full md:max-w-96 md:px-0">
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
