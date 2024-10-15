import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@motion-metrics/ui/components/ui/dropdown-menu";
import type { User } from "@supabase/supabase-js";

interface Props {
  date: string;
  user: User;
}

export function DashboardHeader({ date, user }: Props) {
  return (
    <article className="flex mx-3 justify-between items-center mb-8">
      <div className="flex  flex-col-reverse">
        <h1 className="font-bold -mt-1 text-3xl">Dashboard</h1>
        <p className="">{date}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full overflow-hidden">
          <div className="size-12 flex flex-col items-center justify-center bg-dark-900 text-dark-100">
            {user.user_metadata.first_name.slice(0, 1) +
              user.user_metadata.last_name.slice(0, 1)}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/sign-out">Sign out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
}
