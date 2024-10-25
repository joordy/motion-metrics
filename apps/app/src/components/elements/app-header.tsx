"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const PAGES = [
  { label: "Home", href: "/" },
  { label: "Workouts", href: "/workouts" },
  { label: "Profile", href: "/profile" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-0 left-0 right-0">
      <menu className="flex items-center justify-between px-8 py-6 w-full h-full">
        {PAGES.map((el) => {
          const isActive =
            el.href !== "/"
              ? pathname.startsWith(el.href)
              : pathname === el.href;

          return (
            <li
              className={cn("", {
                "underline underline-offset-4 font-extrabold": isActive,
              })}
              key={el.href}
            >
              <Link href={el.href}>{el.label}</Link>
            </li>
          );
        })}
      </menu>
    </header>
  );
}
