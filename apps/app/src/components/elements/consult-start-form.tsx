"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CardHeader } from "@motion-metrics/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormLabel,
} from "@motion-metrics/ui/components/ui/form";
import { Input } from "@motion-metrics/ui/components/ui/input";
import { motion } from "framer-motion";
import type { z } from "zod";

import { startSchema } from "@/lib/schemas/login";

import { useMultiStepForm } from "@/hooks/use-multi-step-form";

import { FormConsult } from "./form-consult";
import { PaginationMultiStepForm } from "./pagination-multi-step-form";

interface Props {
  config: {
    heading: string;
    paragraph: string;
  };
}
export function ConsultStartForm({ config }: Props) {
  const form = useForm<z.infer<typeof startSchema>>({
    resolver: zodResolver(startSchema),
    defaultValues: {},
  });
  const { onNext } = useMultiStepForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Form {...form}>
        <FormConsult
          onSubmit={form.handleSubmit(onNext)}
          className="justify-start items-start mx-auto w-full max-w-[550px]"
        >
          <CardHeader className="items-center">
            <FormLabel className="leading-tight text-3xl font-semibold">
              {config.heading}
            </FormLabel>
            <FormDescription className="text-left mr-auto inline max-w-64 justify-center  md:flex md:max-w-full md:flex-wrap">
              {config.paragraph}
            </FormDescription>
            <FormControl>
              <Input type="hidden" />
            </FormControl>
          </CardHeader>
          <PaginationMultiStepForm
            hidePrevious
            nextLabel="Create account"
            jumpToStep={3}
            jumpLabel="Already have an account?"
          />
        </FormConsult>
      </Form>
    </motion.div>
  );
}
