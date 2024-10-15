"use client";

import { useEffect } from "react";

import { toast } from "sonner";

export default function Page() {
  useEffect(() => {
    toast.success(
      "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.",
    );
  }, []);
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div>
        <h1 className="text-3xl font-extrabold">Verify email address</h1>
        <p>
          {`Check your inbox, we've sent you an email with a verification link to verify your account.`}
        </p>
      </div>
    </main>
  );
}
