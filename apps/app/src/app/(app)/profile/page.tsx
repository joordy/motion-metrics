import { getCurrentUser } from "@/lib/server-utils";

import { AppMain } from "@/components/elements/app-main";
import { DashboardHeader } from "@/components/elements/dashboard-header";

export default async function AppPage() {
  const { user: currentUser } = await getCurrentUser();

  return (
    <AppMain className="">
      <DashboardHeader {...{ type: "profile", user: currentUser }} />

      <div className="px-3">
        <h1>Profile Page</h1>
      </div>
    </AppMain>
  );
}
