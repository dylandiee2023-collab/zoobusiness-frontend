export interface SidebarActions {
  toggle(): void;

  collapse(): void;

  expand(): void;

  hide(): void;

  openGroup(
    id: string,
  ): void;

  closeGroup(
    id: string,
  ): void;

  toggleGroup(
    id: string,
  ): void;
}