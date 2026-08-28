import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { TabsProps } from "./Tabs.types";

export const tabsRecipe = createRecipe<TabsProps>({
  recipe(theme) {
    return {
      style: {
        display: "flex",

        flexDirection: "column",

        gap: "16px",

        width: "100%",

        color: theme.colors.text,

        transition: createMotion(),
      },
    };
  },
});
