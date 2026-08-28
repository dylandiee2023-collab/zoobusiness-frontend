import type { StyleObject } from "../contracts";

export type StateStyle = StyleObject;

export interface ComponentStates {
  base?: StateStyle;
  hover?: StateStyle;
  active?: StateStyle;
  focus?: StateStyle;
  disabled?: StateStyle;
  loading?: StateStyle;
}
