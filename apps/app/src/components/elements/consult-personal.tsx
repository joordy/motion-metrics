"use client";

import type { RegistrationStepOne } from "@/types/auth";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent, CardHeader } from "@motion-metrics/ui/components/ui/card";
import {
  Form,
  FormDescription,
  FormLabel,
} from "@motion-metrics/ui/components/ui/form";
import type { z } from "zod";

import { personalAccountSchema } from "@/lib/schemas/register";

import { useMultiStepForm } from "@/hooks/use-multi-step-form";

import { FormConsult } from "@/components/elements/form-consult";
import { FormTextField } from "@/components/elements/form-text-field";
import Icons from "@/components/elements/icons";
import { PaginationMultiStepForm } from "@/components/elements/pagination-multi-step-form";

interface Props {
  config: RegistrationStepOne;
}
export const ConsultPersonalForm = ({ config }: Props) => {
  const { onNext, onPrevious, state } = useMultiStepForm();

  const currentStep = useMemo(() => state?.step || 0, [state?.step]);

  const form = useForm<z.infer<typeof personalAccountSchema>>({
    resolver: zodResolver(personalAccountSchema),
    defaultValues: {
      first_name: (state.first_name as string) || "",
      last_name: (state.last_name as string) || "",
    },
  });

  return (
    <Form {...form}>
      <FormConsult
        onSubmit={form.handleSubmit(onNext)}
        className="justify-start items-start mx-auto w-full max-w-[550px]"
      >
        <CardHeader className="w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => onPrevious(form.getValues())}
              >
                <Icons name="ArrowLeft" className="size-6" />
              </button>
              <FormLabel className="leading-tight text-3xl font-semibold">
                {config.heading}
              </FormLabel>
            </div>
            <span>{currentStep} / 2</span>
          </div>
          <FormDescription className="max-w-prose">
            {config.paragraph.replace(
              "{{ email }}",
              String(state?.email || "your account"),
            )}
          </FormDescription>
        </CardHeader>
        <CardContent className="w-full flex flex-col space-y-2">
          {config.fields.first_name && (
            <FormTextField form={form} config={config.fields.first_name} />
          )}
          {config.fields.last_name && (
            <FormTextField form={form} config={config.fields.last_name} />
          )}
        </CardContent>

        <PaginationMultiStepForm
          hidePrevious={true}
          nextLabel="Continue"
          // onPrevious={() => onPrevious(form.getValues())}
        />
        {/* <PaginationMultiStepForm
          hidePrevious={true}
          nextLabel={"Register"}
          onPrevious={() => onPrevious(form.getValues())}
        /> */}
      </FormConsult>
    </Form>
  );
};
