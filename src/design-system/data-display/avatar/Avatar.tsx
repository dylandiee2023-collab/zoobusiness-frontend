import { forwardRef } from "react";

import { avatarRecipe } from "./Avatar.recipe";
import { useTheme } from "@/theme/hooks";

import type { AvatarProps } from "./Avatar.types";

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { src, alt, name, icon, size, rounded, className, style, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = avatarRecipe(theme, {
    ...props,

    ...(src !== undefined && {
      src,
    }),

    ...(alt !== undefined && {
      alt,
    }),

    ...(name !== undefined && {
      name,
    }),

    ...(icon !== undefined && {
      icon,
    }),

    ...(size !== undefined && {
      size,
    }),

    ...(rounded !== undefined && {
      rounded,
    }),
  });

  const initials =
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") ?? "";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...recipe.style,
        ...style,
      }}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? name ?? "Avatar"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : icon ? (
        icon
      ) : (
        initials
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";
