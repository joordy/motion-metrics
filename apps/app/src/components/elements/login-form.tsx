"use client";

import type { Login } from "@/types/auth";

import { useCallback, useState } from "react";
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
  FormMessage,
} from "@motion-metrics/ui/components/ui/form";
import type { z } from "zod";

import type { LoginSchema } from "@/lib/schemas/login";
import { authenticateSchema, loginSchema } from "@/lib/schemas/login";

import { useMultiStepForm } from "@/hooks/use-multi-step-form";

import { FormConsult } from "@/components/elements/form-consult";
import { FormSubmit } from "@/components/elements/form-submit";
import { FormTextField } from "@/components/elements/form-text-field";

interface Props {
  config: Login;
}

export const LoginForm = ({ config }: Props) => {
  const { state, onSubmit, clearData } = useMultiStepForm();
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof authenticateSchema>>({
    resolver: zodResolver(authenticateSchema),
    defaultValues: {
      email: (state.email as string) || "",
      password: (state.password as string) || "",
    },
  });

  const handleSubmit: SubmitHandler<z.infer<typeof authenticateSchema>> =
    useCallback(
      async (formData) => {
        setPending(true);
        try {
          await onSubmit(
            formData,
            async (data, action) => {
              const validation = loginSchema.safeParse(data);

              if (validation.success) {
                const res = await action(data as LoginSchema);

                setPending(false);

                if (res?.success) {
                  clearData();
                } else if (res?.errors) {
                  Object.entries(res.errors).forEach(([key, value]) => {
                    form.setError(key as keyof z.infer<typeof loginSchema>, {
                      message: String(value),
                    });
                  });
                }
              } else {
                // console.error("Validation failed", validation.error);
                setPending(false);
              }
            },
            false,
          );
        } catch (error) {
          // console.error("Submit error", error);
          setPending(false);
        }
      },
      [clearData, form, onSubmit],
    );

  const handleErrorSubmit: SubmitErrorHandler<z.infer<typeof loginSchema>> =
    useCallback(async () => {
      setPending(false);
    }, []);

  return (
    <Form {...form}>
      <FormConsult
        onSubmit={form.handleSubmit(handleSubmit, handleErrorSubmit)}
        className="justify-start items-start mx-auto w-full max-w-[550px]"
      >
        <CardHeader className="w-full">
          <FormLabel className="leading-tight text-3xl font-semibold">
            {config.heading}
          </FormLabel>
          <FormDescription className="max-w-prose">
            {config.paragraph}
          </FormDescription>
        </CardHeader>
        <CardContent className="mx-auto w-full max-w-[550px]">
          {config.fields.email && (
            <FormTextField form={form} config={config.fields.email} />
          )}
          {config.fields.password && (
            <FormTextField form={form} config={config.fields.password} />
          )}
          <FormMessage />
        </CardContent>
        <CardFooter className="w-full">
          <FormSubmit
            className="w-full"
            isPending={pending}
            label="Account aanmaken"
          />
        </CardFooter>
      </FormConsult>
    </Form>
  );
};
