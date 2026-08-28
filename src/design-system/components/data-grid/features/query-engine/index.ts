export interface QueryState {
  page: number;

  pageSize: number;

  search?: string;

  sortBy?: string;

  sortDirection?: "asc" | "desc";
}

export function createQuery(state: QueryState): URLSearchParams {
  const query = new URLSearchParams();

  query.set("page", String(state.page));

  query.set("pageSize", String(state.pageSize));

  if (state.search) {
    query.set("search", state.search);
  }

  if (state.sortBy) {
    query.set("sortBy", state.sortBy);

    query.set("direction", state.sortDirection ?? "asc");
  }

  return query;
}
