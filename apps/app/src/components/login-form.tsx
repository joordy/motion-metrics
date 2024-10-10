"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";

import Link from "next/link";

import { toast } from "sonner";

import { login } from "@/lib/actions/server/auth";

export function LoginForm() {
  // const [status, action] = useFormState<unknown, FormData>(login, null);
  const [status, action] = useFormState(login, null);

  useEffect(() => {
    if (status?.type === "error") {
      // toast({
      //   variant: "destructive",
      //   title: "Er is een fout opgetreden.",
      //   description: status?.message,
      // });
      toast("Er is een fout opgetreden", {
        description: status?.message,
        // action: {
        //   label: "Undo",
        //   // onClick: () => console.log("Undo"),
        // },
      });
    }
  }, [status]);

  return (
    <form
      action={action}
      className="flex bg-dark-200 flex-col space-y-2 px-4 py-8 rounded-xl"
    >
      <div className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          className="text-black"
          id="email"
          name="email"
          type="email"
          required
        />
        {status?.errors && "email" in status.errors && (
          <span className="mt-1 text-xs text-ui-error">
            {status?.errors?.email}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password:</label>
        <input
          className="text-black"
          id="password"
          name="password"
          type="password"
          required
        />

        {status?.errors &&
          "password" in status.errors &&
          status.errors.password?.[0] && (
            <span className="mt-1 text-xs text-ui-error">
              {status?.errors?.password?.[0]}
            </span>
          )}
      </div>

      <div className="flex justify-between">
        <button type="submit">Log in</button>
        <Link className="underline underline-offset-4" href="/register">
          Sign up
        </Link>
      </div>
    </form>
  );
}
