import { AppProviders } from "@/app/providers";
import { AppShell } from "@/app/shell";
import { RouterProvider } from "@/app/router";

export default function App() {
  return (
    <AppProviders>
      <AppShell>
        <RouterProvider />
      </AppShell>
    </AppProviders>
  );
}
