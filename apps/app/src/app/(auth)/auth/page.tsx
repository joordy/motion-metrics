import { login, signup } from "@/lib/actions/server/auth";
import { REGISTRATION_CONTENT_MAP } from "@/lib/constants/auth";

import { ConsultAccountForm } from "@/components/elements/consult-account";
import { ConsultPersonalForm } from "@/components/elements/consult-personal";
import { ConsultStartForm } from "@/components/elements/consult-start-form";
import { LoginForm } from "@/components/elements/login-form";
import { MultiStepFormProvider } from "@/components/scopes/multi-step-form";

export default function Page() {
  return (
    <main className="flex flex-col justify-end min-h-[100dvh]">
      <div />

      <div className="bg-dark-100 rounded-t-2xl px-5 py-10">
        <MultiStepFormProvider
          signupAction={signup}
          loginAction={login}
          name="auth"
        >
          <ConsultStartForm config={REGISTRATION_CONTENT_MAP.intro} />
          <ConsultPersonalForm
            config={REGISTRATION_CONTENT_MAP.registerStepTwo}
          />
          <ConsultAccountForm
            config={REGISTRATION_CONTENT_MAP.registerStepOne}
          />

          <LoginForm config={REGISTRATION_CONTENT_MAP.login} />
        </MultiStepFormProvider>
      </div>
    </main>
  );
}
``;
