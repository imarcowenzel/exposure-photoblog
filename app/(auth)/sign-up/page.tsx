import { Metadata } from "next";
import Link from "next/link";

import { SignUpForm } from "@/app/(auth)/sign-up/components/form";

export const metadata: Metadata = {
  title: "EXPOSURE | Sign up",
  description: "A ficctitional website to post photographies",
};

const SignUpPage = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-10 px-4 py-8 2xl:h-dvh">
      <div className="flex h-full w-full max-w-96 flex-col items-start justify-center gap-10">
        <h1 className="text-xl font-medium">Sign up for an account</h1>

        <SignUpForm />

        <Link href="/log-in" className="text-sm font-semibold hover:underline">
          or log in to your account
        </Link>

        <p className="text-[10px] font-extralight">
          By signing up, you agree to EXPOSURES&apos;s{" "}
          <Link href="#" className="font-normal">
            Terms of Use & Privacy Policy
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
