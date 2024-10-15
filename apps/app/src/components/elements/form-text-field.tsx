import type { InputField } from "@/types/auth";

import type { HTMLAttributes } from "react";
import type { useForm } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@motion-metrics/ui/components/ui/form";
import { Input } from "@motion-metrics/ui/components/ui/input";
import type { z } from "zod";

interface Props extends HTMLAttributes<HTMLDivElement> {
  config: InputField;
  form: ReturnType<typeof useForm<z.infer<z.ZodSchema>>>;
}

export function FormTextField({ form, config }: Props) {
  return (
    <FormField
      control={form.control}
      name={config.id}
      render={({ field }) => (
        <FormItem className="space-y-1 w-full relative">
          <FormLabel className="block z-10 text-md font-medium pointer-events-none absolute -top-0.5 bg-dark-100 left-2 px-1 mb-1">
            {config.label}
          </FormLabel>
          <div className="grid grid-rows-[1fr,18px] gap-1">
            <FormControl>
              <div className="relative flex">
                <Input
                  className="mt-1 block w-full h-fit rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  type={config.type}
                  placeholder={config.label}
                  autoComplete={config.autoComplete ? "on" : "off"}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-md text-start" />
          </div>
        </FormItem>
      )}
    />
  );
}
