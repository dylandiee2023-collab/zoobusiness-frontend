import type { Dispatch, SetStateAction } from "react";

import type { DataGridState } from "./state";

export interface DataGridContextValue {
  state: DataGridState;

  setState: Dispatch<SetStateAction<DataGridState>>;
}
