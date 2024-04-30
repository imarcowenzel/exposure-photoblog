import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth-options";
import { DeleteAccountModal } from "./components/delete-account-modal";
import { Header } from "./components/header";
import { ImageForm } from "./components/image-form";
import { PasswordForm } from "./components/password-form";
import { UsernameForm } from "./components/username-form";

export const metadata: Metadata = {
  title: "EXPOSURE | Account",
};

const AccountPage = async () => {

  const session = await auth();
  if (!session) {
    redirect("/log-in");
  }

  return (
    <section className="2xl:h-dhv flex w-full flex-col items-center gap-10 px-5 py-16 md:px-16 2xl:px-24">
      <div className="flex w-full max-w-96 flex-col items-center justify-center gap-12">
        <Header />
        <div className="flex w-full flex-col items-center justify-center gap-7">
          <Separator className="w-1/2" />
          <h3 className="text-sm font-semibold">Profile</h3>
          <ImageForm user={session.user} />
          <UsernameForm user={session.user} />
          <Separator className="w-1/2" />
          {!session.user.accounts.length && (
            <>
              <h3 className="text-sm font-semibold">Password</h3>
              <PasswordForm user={session.user} />
              <Separator className="w-1/2" />
            </>
          )}
          <DeleteAccountModal user={session.user} />
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
