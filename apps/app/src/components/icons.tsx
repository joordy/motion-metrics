import React, { Suspense } from "react";

import type { LucideProps } from "lucide-react";
import { icons } from "lucide-react";

import { cn } from "@/lib/utils";

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

export const CustomIcons = {
  arrow: (props: LucideProps) => {
    return (
      <svg
        viewBox="0 0 8 12"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        className={cn(
          "bg-primary-900 flex h-6 w-6 flex-col items-center rounded-full p-1.5",
          props.className,
        )}
      >
        <path
          d="M0.444796 8.68724L3.13205 6.00074L0.444796 3.31274C0.0547959 2.92199 0.0547959 2.28899 0.444796 1.89824L1.29305 1.04999C1.6838 0.65924 2.3168 0.65924 2.70755 1.04999L6.9503 5.29274C7.34105 5.68349 7.34105 6.31649 6.9503 6.70724L2.70755 10.95C2.3168 11.3407 1.6838 11.3407 1.29305 10.95L0.444796 10.1017C0.0540459 9.71099 0.0540459 9.07724 0.444796 8.68724Z"
          fill="white"
        />
      </svg>
    );
  },
};

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof icons | keyof typeof CustomIcons;
}

const Icons = ({ name, className, ...props }: IconProps) => {
  const Icon =
    name in CustomIcons
      ? CustomIcons[name as keyof typeof CustomIcons]
      : icons[name as keyof typeof icons];

  return (
    Icon && (
      <Suspense fallback={fallback}>
        <Icon className={cn(className)} {...props} />
      </Suspense>
    )
  );
};

export default Icons;
