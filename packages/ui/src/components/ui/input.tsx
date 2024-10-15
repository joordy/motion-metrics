import * as React from "react";

import { cn } from "@motion-metrics/ui/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex pb-[10px] pt-[12px] px-3 w-full rounded-md border border-dark-900 bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-dark-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dark-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-800 dark:placeholder:text-dark-400 dark:focus-visible:ring-dark-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
