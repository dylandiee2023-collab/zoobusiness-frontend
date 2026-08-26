import type { NavigateFunction } from "react-router-dom";

export class RouterService {
  private readonly navigate: NavigateFunction;

  constructor(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  push(path: string): void {
    this.navigate(path);
  }

  replace(path: string): void {
    this.navigate(path, {
      replace: true,
    });
  }

  back(): void {
    this.navigate(-1);
  }

  forward(): void {
    this.navigate(1);
  }
}