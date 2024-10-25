import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {}

export function AppMain({ className, children }: Props) {
  return (
    <main className={cn("flex flex-col justify-between pt-8", className)}>
      {children}
    </main>
  );
}
