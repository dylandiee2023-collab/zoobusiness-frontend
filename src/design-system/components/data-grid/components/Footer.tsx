import type {
  JSX,
} from "react";

interface FooterProps {
  totalRows: number;

  currentPage: number;

  pageSize: number;
}

export function Footer({
  totalRows,
  currentPage,
  pageSize,
}: FooterProps): JSX.Element {
  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalRows /
          pageSize,
      ),
    );

  return (
    <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-slate-600">
      <span>
        Rows:{" "}
        {totalRows}
      </span>

      <span>
        Page{" "}
        {
          currentPage
        }{" "}
        of{" "}
        {
          totalPages
        }
      </span>
    </div>
  );
}