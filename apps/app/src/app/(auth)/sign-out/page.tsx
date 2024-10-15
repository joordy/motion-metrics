"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function SignOut() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // console.error("Error signing out:", error.message);
      } else {
        router.push("/auth"); // Redirect to home page after sign out
      }
    };

    signOut();
  }, [router]);

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center">
      <p>Signing out...</p>
    </main>
  );
}
