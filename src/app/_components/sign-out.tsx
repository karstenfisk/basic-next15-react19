"use client";
import { type User } from "next-auth";

interface SignOutProps {
  user?: User;
}

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignOut({ user }: SignOutProps) {
  return (
    <Button
      variant={"link"}
      onClick={() => signOut()}
      disabled={user ? false : true}
    >
      Sign Out
    </Button>
  );
}
