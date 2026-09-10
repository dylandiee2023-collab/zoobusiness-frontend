import { Stack } from "@/design-system/layout";
import { Heading, Text } from "@/design-system/typography";

export function DashboardPage() {
  return (
    <main>
      <Stack spacing="24px">
        <Heading level={1}>Dashboard</Heading>

        <Text>You are successfully signed in.</Text>
      </Stack>
    </main>
  );
}
