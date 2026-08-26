export type TopBarSidebarMode =
  | "expanded"
  | "collapsed"
  | "hidden";

export interface TopBarState {
  readonly sidebarMode: TopBarSidebarMode;

  readonly searching: boolean;

  readonly syncing: boolean;

  readonly unreadNotifications: number;

  readonly unreadChats: number;

  readonly currentBranch: string;
}