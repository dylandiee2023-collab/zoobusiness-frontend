import type { ChangeEvent, JSX } from "react";

import { fileUploadRecipe } from "./FileUpload.recipe";

import type { FileUploadProps } from "./FileUpload.types";

export function FileUpload({
  accept,
  multiple = false,
  disabled = false,
  onValueChange,
  className = "",
  ...props
}: FileUploadProps): JSX.Element {
  const styles = fileUploadRecipe();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onValueChange?.(event.target.files, event);
  }

  return (
    <div className={`${styles.root} ${className}`} {...props}>
      <label
        className={[styles.label, disabled ? styles.disabled : ""].join(" ")}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className={styles.input}
          onChange={handleChange}
        />

        <div className="text-4xl">📁</div>

        <div className={styles.title}>Upload Files</div>

        <div className={styles.subtitle}>
          Click to browse or drag files here
        </div>
      </label>
    </div>
  );
}
