import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Props {
  className?: string;
}

export function LoadingSpinner({ className }: Props) {
  return (
    <LoaderCircle
      size={16}
      className={cn("h-full w-full animate-spin", className)}
    />
  );
}
