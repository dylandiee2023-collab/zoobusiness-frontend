import type {
  JSX,
} from "react";

import {
  avatarRecipe,
} from "./Avatar.recipe";

import type {
  AvatarProps,
} from "./Avatar.types";

function getInitials(
  name?: string,
): string {
  if (!name) {
    return "?";
  }

  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map(
      (part) => part[0]?.toUpperCase() ?? "",
    )
    .join("");
}

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  className = "",
  ...props
}: AvatarProps): JSX.Element {
  return (
    <div
      className={`${avatarRecipe(
        size,
      )} ${className}`}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}