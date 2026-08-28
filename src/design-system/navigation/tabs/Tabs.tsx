import { forwardRef, type KeyboardEvent } from "react";

import { useTheme } from "@/theme/hooks";

import { tabsRecipe } from "./Tabs.recipe";

import type { TabItem, TabsProps } from "./Tabs.types";

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, items, onChange, className, style, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = tabsRecipe(theme, {
    value,
    items,

    ...props,

    ...(onChange !== undefined && {
      onChange,
    }),
  });

  const activeIndex = items.findIndex((item) => item.value === value);

  const changeTab = (index: number) => {
    const item = items[index];

    if (item && !item.disabled && onChange) {
      onChange(item.value);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        changeTab(Math.min(index + 1, items.length - 1));
        break;

      case "ArrowLeft":
        event.preventDefault();
        changeTab(Math.max(index - 1, 0));
        break;

      case "Home":
        event.preventDefault();
        changeTab(0);
        break;

      case "End":
        event.preventDefault();
        changeTab(items.length - 1);
        break;
    }
  };

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
      <div
        role="tablist"
        aria-orientation="horizontal"
        style={{
          display: "flex",
          gap: "8px",
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        {items.map((item: TabItem, index) => {
          const active = item.value === value;

          return (
            <button
              key={item.value}
              id={`tab-${item.value}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${item.value}`}
              tabIndex={active ? 0 : -1}
              disabled={item.disabled}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onClick={() => changeTab(index)}
              style={{
                display: "flex",

                alignItems: "center",

                gap: "8px",

                padding: "10px 16px",

                border: "none",

                borderBottom: active
                  ? `2px solid ${theme.colors.primary}`
                  : "2px solid transparent",

                background: "transparent",

                color: active
                  ? theme.colors.primary
                  : theme.colors.textSecondary,

                cursor: item.disabled ? "not-allowed" : "pointer",

                opacity: item.disabled ? 0.5 : 1,

                fontWeight: active ? 600 : 500,

                transition: "all .2s ease",

                outline: "none",
              }}
            >
              {item.icon}

              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${items[activeIndex]?.value}`}
        role="tabpanel"
        aria-labelledby={`tab-${items[activeIndex]?.value}`}
      />
    </div>
  );
});

Tabs.displayName = "Tabs";
