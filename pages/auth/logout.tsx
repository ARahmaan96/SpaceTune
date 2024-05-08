import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const handleLogout = async () => {
      if (!session) return router.push("/");
      await signOut();
      // router.push("/");
      window.location.href = "/";
    };

    handleLogout();
  }, [session, router]);

  return null;
}
