import type { PropsWithChildren } from "react";

import { AppProvider } from "@/components/scopes/app-state";

export default async function Layout({ children }: PropsWithChildren) {
  return <AppProvider>{children}</AppProvider>;
}
