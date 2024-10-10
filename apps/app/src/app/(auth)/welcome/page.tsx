import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <main>
      <div />
      <article className="px-4">
        <h1>Welcome to MotionMetrics</h1>
        <p>
          Transform your fitness journey into a captivating story. Track,
          celebrate, and grow with every workout
        </p>

        <div className="flex flex-col space-y-3">
          <Link href="" className={cn(buttonVariants({ variant: "default" }))}>
            Get Started
          </Link>
          <Link
            href=""
            className={cn(
              buttonVariants({ variant: "outline" }),
              "text-dark-100",
            )}
          >
            Already have a occount?
          </Link>
        </div>
      </article>
    </main>
  );
}
``;
