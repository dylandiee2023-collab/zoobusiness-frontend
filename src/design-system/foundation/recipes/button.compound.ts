import { createCompoundVariants } from "../compound-variants";

export const buttonCompoundVariants =
  createCompoundVariants([
    {
      when: {
        variant: "solid",
        disabled: true,
      },

      styles: {
        filter: "grayscale(100%)",
      },
    },

    {
      when: {
        variant: "outline",
        disabled: true,
      },

      styles: {
        borderStyle: "dashed",
      },
    },

    {
      when: {
        variant: "ghost",
        loading: true,
      },

      styles: {
        cursor: "wait",
      },
    },

    {
      when: {
        variant: "solid",
        loading: true,
      },

      styles: {
        cursor: "wait",
        opacity: 0.8,
      },
    },
  ]);