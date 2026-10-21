import { primitiveColors } from "@/theme/tokens";

export const semanticColors = {
  light: {
    background: primitiveColors.white,

    surface: primitiveColors.slate[50],

    surfaceSecondary: primitiveColors.slate[100],

    primary: primitiveColors.green[600],

    primaryHover: primitiveColors.green[700],

    primaryActive: primitiveColors.green[800],

    secondary: primitiveColors.slate[200],

    secondaryHover: primitiveColors.slate[300],

    secondaryActive: primitiveColors.slate[400],

    danger: primitiveColors.red[600],

    dangerHover: primitiveColors.red[700],

    dangerActive: primitiveColors.red[800],

    success: primitiveColors.green[600],

    successHover: primitiveColors.green[700],

    successActive: primitiveColors.green[800],

    warning: primitiveColors.amber[500],

    warningHover: primitiveColors.amber[600],

    warningActive: primitiveColors.amber[700],

    info: primitiveColors.sky[600],

    infoHover: primitiveColors.sky[700],

    infoActive: primitiveColors.sky[800],

    text: primitiveColors.slate[900],

    textSecondary: primitiveColors.slate[600],

    textMuted: primitiveColors.slate[500],

    onPrimary: primitiveColors.white,

    onSecondary: primitiveColors.slate[900],

    onDanger: primitiveColors.white,

    onSuccess: primitiveColors.white,

    onWarning: primitiveColors.slate[900],

    onInfo: primitiveColors.white,

    border: primitiveColors.slate[200],

    divider: primitiveColors.slate[100],
  },

  dark: {
    background: "#1E1F21",

    surface: "#202324",

    surfaceSecondary: "#292d2e",

    primary: primitiveColors.green[500],

    primaryHover: primitiveColors.green[400],

    primaryActive: primitiveColors.green[300],

    secondary: primitiveColors.slate[700],

    secondaryHover: primitiveColors.slate[600],

    secondaryActive: primitiveColors.slate[500],

    danger: primitiveColors.red[500],

    dangerHover: primitiveColors.red[400],

    dangerActive: primitiveColors.red[300],

    success: primitiveColors.green[500],

    successHover: primitiveColors.green[400],

    successActive: primitiveColors.green[300],

    warning: primitiveColors.amber[400],

    warningHover: primitiveColors.amber[300],

    warningActive: primitiveColors.amber[200],

    info: primitiveColors.sky[500],

    infoHover: primitiveColors.sky[400],

    infoActive: primitiveColors.sky[300],

    text: primitiveColors.white,

    textSecondary: "#c9d1cf",

    textMuted: "#9aa5a2",

    onPrimary: primitiveColors.white,

    onSecondary: primitiveColors.white,

    onDanger: primitiveColors.white,

    onSuccess: primitiveColors.white,

    onWarning: primitiveColors.slate[900],

    onInfo: primitiveColors.white,

    border: "#292d2e",

    divider: "#202324",
  },
} as const;
