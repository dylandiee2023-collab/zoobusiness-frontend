import { createRecipe } from "@/design-system/foundation/recipes";

import type { GridProps } from "./Grid.types";

export const gridRecipe =
  createRecipe<GridProps>({
    recipe(_, props) {
      return {
        style: {
          display: "grid",
          gridTemplateColumns: props.columns,
          gridTemplateRows: props.rows,
          gridTemplateAreas: props.areas,
          gridAutoRows: props.autoRows,
          gridAutoColumns: props.autoColumns,
          gridAutoFlow: props.autoFlow,
          gap: props.gap,
          rowGap: props.rowGap,
          columnGap: props.columnGap,
          justifyItems: props.justifyItems,
          alignItems: props.alignItems,
          justifyContent: props.justifyContent,
          alignContent: props.alignContent,
        },
      };
    },
  });