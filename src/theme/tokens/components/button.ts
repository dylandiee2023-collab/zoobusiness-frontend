export const buttonTokens = {
  size: {
    sm: {
      height: "32px",
      paddingX: "12px",
      fontSize: "14px",
      gap: "6px",
      radius: "6px",
    },

    md: {
      height: "40px",
      paddingX: "16px",
      fontSize: "16px",
      gap: "8px",
      radius: "8px",
    },

    lg: {
      height: "48px",
      paddingX: "20px",
      fontSize: "18px",
      gap: "10px",
      radius: "10px",
    },
  },

  variant: {
    primary: {
      background: "primary",
      color: "background",
      border: "transparent",
    },

    secondary: {
      background: "surface",
      color: "text",
      border: "border",
    },

    outline: {
      background: "transparent",
      color: "primary",
      border: "primary",
    },

    ghost: {
      background: "transparent",
      color: "text",
      border: "transparent",
    },

    destructive: {
      background: "danger",
      color: "onDanger",
      border: "transparent",
    },
  },

  state: {
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },

    loading: {
      opacity: 0.8,
      cursor: "wait",
    },
  },
} as const;
