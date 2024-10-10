import Link from "next/link";

import { signup } from "@/lib/actions/server/auth";

export default function RegisterPage() {
  return (
    <main className="px-8 bg-dark-50 min-h-screen flex flex-col justify-center">
      <form className="flex bg-dark-200 flex-col space-y-2 px-4 py-8 rounded-xl">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />

        <div className="flex justify-between">
          <button formAction={signup}>Log in</button>
          <Link className="underline underline-offset-4" href="/register">
            Sign up
          </Link>
        </div>
      </form>
    </main>
  );
}
