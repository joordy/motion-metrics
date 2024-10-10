import { LoginForm } from "@/components/login-form";

export default async function LoginPage() {
  return (
    <main className="px-8 bg-dark-50 min-h-screen flex flex-col justify-center">
      <LoginForm />
    </main>
  );
}
