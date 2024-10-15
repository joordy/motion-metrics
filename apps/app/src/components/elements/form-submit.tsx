"use client";

import type { HTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@motion-metrics/ui/components/ui/button";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "link";
  label?: string;
  isPending?: boolean;
}

export function FormSubmit({
  variant = "default",
  className,
  isPending,
  label = "submit",
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      disabled={isPending || pending}
      className={cn("relative pl-3 pr-8", className)}
    >
      <Loader
        className={cn("z-10 mr-2 size-4 opacity-0", {
          "animate-spin opacity-100": isPending || pending,
        })}
      />

      <span>{label}</span>
    </Button>
  );
}
