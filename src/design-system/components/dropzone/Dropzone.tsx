import { useState, type DragEvent, type JSX } from "react";

import { dropzoneRecipe } from "./Dropzone.recipe";

import type { DropzoneProps } from "./Dropzone.types";

export function Dropzone({
  disabled = false,
  onValueChange,
  onDragEnter,
  onDragLeave,
  onDragOver,
  className = "",
  ...props
}: DropzoneProps): JSX.Element {
  const styles = dropzoneRecipe();

  const [active, setActive] = useState(false);

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setActive(true);

    onDragOver?.(event);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    setActive(false);

    onDragLeave?.(event);
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    setActive(true);

    onDragEnter?.(event);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setActive(false);

    onValueChange?.(Array.from(event.dataTransfer.files));
  }

  return (
    <div
      className={[
        styles.root,
        active ? styles.active : "",
        disabled ? styles.disabled : "",
        className,
      ].join(" ")}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      {...props}
    >
      <div className={styles.icon}>📂</div>

      <div className={styles.title}>Drop files here</div>

      <div className={styles.subtitle}>or click to browse</div>
    </div>
  );
}
