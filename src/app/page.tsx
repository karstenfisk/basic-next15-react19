import { Button, buttonVariants } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

import Link from "next/link";
import SignOut from "./_components/sign-out";

function HomeLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className={buttonVariants({ variant: "link" })} href={href}>
      {label}
    </Link>
  );
}

export default async function Home() {
  const session = await auth();
  return (
    <div className="font-sans flex gap-4 min-h-screen p-8">
      <HomeLink href="/private" label="Private Route" />
      <HomeLink href="/auth/login" label="Sign in" />
      <HomeLink href="/auth/register" label="Register" />
      <SignOut user={session?.user} />
    </div>
  );
}
