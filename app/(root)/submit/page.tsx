import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth-options";
import { Submit } from "./submit";

export const metadata: Metadata = {
  title: "Submit | EXPOSURE",
};

const SubmitPage = async () => {

  const session = await auth();
  if (!session) redirect("/log-in");

  return <Submit user={session.user} />;

};

export default SubmitPage;
