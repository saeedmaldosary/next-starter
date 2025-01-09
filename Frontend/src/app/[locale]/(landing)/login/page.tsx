"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { env } from "@/lib/env";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <button onClick={() => signOut()}>
          Sign out ({session.user?.email})
        </button>
        <p className="break-all text-sm">{`Bearer ${session?.accessToken}`}</p>
      </div>
    );
  }

  return (
    <button onClick={() => signIn(env.PLATFORM, { callbackUrl: "/login" })}>
      Sign in
    </button>
  );
}
