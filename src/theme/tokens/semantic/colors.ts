import { primitiveColors } from "@/theme/tokens";

export const semanticColors = {
  light: {
    background: primitiveColors.white,

    surface: primitiveColors.slate[50],

    surfaceSecondary: primitiveColors.slate[100],

    primary: primitiveColors.blue[600],

    primaryHover: primitiveColors.blue[700],

    primaryActive: primitiveColors.blue[800],

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
    background: primitiveColors.slate[900],

    surface: primitiveColors.slate[800],

    surfaceSecondary: primitiveColors.slate[700],

    primary: primitiveColors.blue[500],

    primaryHover: primitiveColors.blue[400],

    primaryActive: primitiveColors.blue[300],

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

    textSecondary: primitiveColors.slate[300],

    textMuted: primitiveColors.slate[400],

    onPrimary: primitiveColors.white,

    onSecondary: primitiveColors.white,

    onDanger: primitiveColors.white,

    onSuccess: primitiveColors.white,

    onWarning: primitiveColors.slate[900],

    onInfo: primitiveColors.white,

    border: primitiveColors.slate[700],

    divider: primitiveColors.slate[800],
  },
} as const;