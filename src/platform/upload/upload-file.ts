export interface UploadFile {
  readonly file: File;

  readonly path?: string;

  readonly metadata?: Record<
    string,
    unknown
  >;
}