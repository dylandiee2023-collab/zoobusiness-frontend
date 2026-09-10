import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useTheme } from "@/theme/hooks";

import { linkRecipe } from "./Link.recipe";

import type { LinkProps } from "./Link.types";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    style,
    children,
    underline = false,
    external = false,
    target,
    rel,
    href,
    ...props
  },
  ref,
) {
  const { theme } = useTheme();

  const recipe = linkRecipe(theme, {
    ...props,
    underline,
  });

  const sharedStyle = {
    ...recipe.style,
    ...style,
  };

  // Internal application links must stay inside the SPA. A native <a href>
  // would perform a full document navigation and briefly expose the browser's
  // default page background between documents, which is the white flash seen
  // when moving between auth/public pages.
  if (!external && href?.startsWith("/") && target === undefined) {
    return (
      <RouterLink ref={ref} to={href} {...props} style={sharedStyle}>
        {children}
      </RouterLink>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : target}
      rel={external ? "noopener noreferrer" : rel}
      {...props}
      style={sharedStyle}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
