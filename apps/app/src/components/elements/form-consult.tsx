import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLFormElement> {}

export function FormConsult({ children, onSubmit, className }: Props) {
  return (
    <form
      className={cn(
        "align-center flex h-full w-full grow flex-col justify-between",
        className,
      )}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
