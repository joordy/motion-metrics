"use client";

import type { RegistrationStepOne } from "@/types/auth";

import { useCallback, useMemo, useState } from "react";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@motion-metrics/ui/components/ui/card";
import {
  Form,
  FormDescription,
  FormLabel,
} from "@motion-metrics/ui/components/ui/form";
import type { z } from "zod";

import type { RegisterSchema } from "@/lib/schemas/register";
import {
  registerAccountDetailsSchema,
  registerSchema,
} from "@/lib/schemas/register";

import { useMultiStepForm } from "@/hooks/use-multi-step-form";

import { FormConsult } from "@/components/elements/form-consult";
import { FormSubmit } from "@/components/elements/form-submit";
import { FormTextField } from "@/components/elements/form-text-field";
import Icons from "@/components/elements/icons";
import type { FormState } from "@/components/scopes/multi-step-form";

interface Props {
  config: RegistrationStepOne;
}

export const ConsultAccountForm = ({ config }: Props) => {
  const { state, onSubmit, clearData, onPrevious } = useMultiStepForm();
  const [pending, setPending] = useState(false);

  const currentStep = useMemo(() => state?.step || 0, [state?.step]);

  const form = useForm<z.infer<typeof registerAccountDetailsSchema>>({
    resolver: zodResolver(registerAccountDetailsSchema),
    defaultValues: {
      email: (state.email as string) || "",
      password: (state.password as string) || "",
      password_confirmation: (state.password_confirmation as string) || "",
    },
  });

  const handleSubmit: SubmitHandler<FormState> = useCallback(
    async (data) => {
      setPending(true);
      await onSubmit<RegisterSchema>(
        data,
        async (formData, action) => {
          const validation = registerSchema.safeParse({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
          });

          if (validation.success) {
            const res = await action(formData as RegisterSchema);
            setPending(false);
            if (res?.success) {
              clearData();
            } else if (res?.errors) {
              Object.entries(res.errors).forEach(([key, value]) => {
                form.setError(
                  key as keyof z.infer<typeof registerAccountDetailsSchema>,
                  {
                    message: String(value),
                  },
                );
              });
            }
          } else {
            // console.error("Validation failed", validation.error);
            setPending(false);
          }
        },
        true,
      );
    },
    [clearData, form, onSubmit],
  );

  const handleErrorSubmit: SubmitErrorHandler<z.infer<typeof registerSchema>> =
    useCallback(async () => {
      setPending(false);
    }, []);

  return (
    <Form {...form}>
      <FormConsult
        onSubmit={form.handleSubmit(handleSubmit, handleErrorSubmit)}
        className="justify-start items-start mx-auto w-full max-w-[550px]"
      >
        <CardHeader className="items-start w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => onPrevious(form.getValues())}
              >
                <Icons name="ArrowLeft" className="size-6" />
              </button>
              <FormLabel className="leading-tight text-2xl font-semibold">
                {config.heading}
              </FormLabel>
            </div>
            <span className="size-8 flex items-center">{currentStep} / 2</span>
          </div>
          <FormDescription className="text-left max-w-sm">
            {config.paragraph}
          </FormDescription>
        </CardHeader>
        <CardContent className="w-full">
          {config.fields.email && (
            <FormTextField form={form} config={config.fields.email} />
          )}
          {config.fields.password && (
            <FormTextField form={form} config={config.fields.password} />
          )}
          {config.fields.password_confirmation && (
            <FormTextField
              form={form}
              config={config.fields.password_confirmation}
            />
          )}
        </CardContent>

        <CardFooter className="w-full mt-4">
          <FormSubmit
            className="w-full"
            isPending={pending}
            label="Create account"
          />
        </CardFooter>
      </FormConsult>
    </Form>
  );
};
