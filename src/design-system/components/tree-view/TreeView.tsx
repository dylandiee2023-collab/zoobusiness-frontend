import { Fragment, useState, type JSX } from "react";

import { treeViewRecipe } from "./TreeView.recipe";

import type { TreeNode, TreeViewProps } from "./TreeView.types";

interface TreeItemProps {
  node: TreeNode;

  selectedId?: string | undefined;

  expandOnClick?: boolean | undefined;

  onValueChange?: ((id: string) => void) | undefined;
}

function TreeItem({
  node,
  selectedId,
  expandOnClick = true,
  onValueChange,
}: TreeItemProps): JSX.Element {
  const styles = treeViewRecipe();

  const [expanded, setExpanded] = useState(node.expanded ?? false);

  const hasChildren = (node.children?.length ?? 0) > 0;

  function handleClick() {
    if (node.disabled) {
      return;
    }

    onValueChange?.(node.id);

    if (expandOnClick && hasChildren) {
      setExpanded((value) => !value);
    }
  }

  return (
    <Fragment>
      <button
        type="button"
        disabled={node.disabled}
        className={[
          styles.node,
          selectedId === node.id ? styles.selected : "",
          node.disabled ? styles.disabled : "",
        ].join(" ")}
        onClick={handleClick}
      >
        <span className={styles.arrow}>
          {hasChildren ? (expanded ? "▼" : "▶") : ""}
        </span>

        {node.icon && <span className={styles.icon}>{node.icon}</span>}

        <span className={styles.label}>{node.label}</span>
      </button>

      {expanded && hasChildren && (
        <div className={styles.children}>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              expandOnClick={expandOnClick}
              onValueChange={onValueChange}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export function TreeView({
  nodes,
  selectedId,
  expandOnClick = true,
  onValueChange,
  className = "",
  ...props
}: TreeViewProps): JSX.Element {
  const styles = treeViewRecipe();

  return (
    <div className={[styles.root, className].join(" ")} {...props}>
      {nodes.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          selectedId={selectedId}
          expandOnClick={expandOnClick}
          onValueChange={onValueChange}
        />
      ))}
    </div>
  );
}
