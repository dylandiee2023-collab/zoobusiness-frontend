export interface DataGridState {
  selectedRows: string[];

  sortColumn?: string | undefined;

  sortDirection?: "asc" | "desc" | undefined;

  page: number;

  pageSize: number;
}

export const initialDataGridState: DataGridState = {
  selectedRows: [],

  page: 1,

  pageSize: 20,
};
