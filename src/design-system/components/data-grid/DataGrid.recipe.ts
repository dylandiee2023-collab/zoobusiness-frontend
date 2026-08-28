export function dataGridRecipe() {
  return {
    root: "w-full overflow-hidden rounded-xl border bg-white",

    table: "w-full border-collapse",

    header: "bg-slate-50",

    headerRow: "border-b",

    headerCell: "px-4 py-3 text-left text-sm font-semibold text-slate-700",

    body: "",

    row: "border-b transition-colors hover:bg-slate-50",

    striped: "even:bg-slate-50",

    cell: "px-4 py-3 text-sm text-slate-700",

    loading: "py-12 text-center text-slate-500",

    empty: "py-12 text-center text-slate-400",
  };
}
