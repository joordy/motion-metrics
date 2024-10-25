import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@motion-metrics/ui/lib/utils";

const badgeVariants = cva(
  "font-normal inline-flex items-center rounded-md border border-dark-500 bg-transparent border-dark-500 font-normal w-fit px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-transparent border border-dark-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
