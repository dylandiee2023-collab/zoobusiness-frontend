import type { FooterProps } from "./Footer.types";
import { FOOTER_STYLE } from "./Footer.styles";

export function Footer({
  children,
}: FooterProps) {
  return (
    <footer style={FOOTER_STYLE}>
      {children}
    </footer>
  );
}