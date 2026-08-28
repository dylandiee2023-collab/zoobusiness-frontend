export interface InfiniteState {
  page: number;

  hasMore: boolean;

  loading: boolean;
}

export function nextPage(state: InfiniteState): InfiniteState {
  return {
    ...state,
    page: state.page + 1,
  };
}
