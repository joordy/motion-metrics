import {
  MultiStepFormProvider,
  RegisterForm,
} from "@/components/register-form/register-form";

export default function Page() {
  return (
    <main className="flex flex-col justify-end min-h-[100dvh]">
      <div />

      <div className="bg-dark-100 rounded-t-2xl px-5 py-10">
        <MultiStepFormProvider>
          <RegisterForm />
        </MultiStepFormProvider>
      </div>
    </main>
  );
}
``;
