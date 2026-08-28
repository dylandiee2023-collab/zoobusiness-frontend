import { createSlots } from "../slots";

export const buttonSlots = createSlots({
  root: {},

  icon: {
    display: "flex",
    alignItems: "center",
  },

  label: {
    display: "flex",
    alignItems: "center",
  },

  loader: {
    display: "flex",
    alignItems: "center",
  },
});
