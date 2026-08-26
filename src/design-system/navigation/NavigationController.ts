import { BaseController } from "../foundation/controllers";
import { NavigationRegistry } from "./NavigationRegistry";

export class NavigationController extends BaseController<NavigationRegistry> {
  constructor() {
    super(new NavigationRegistry());
  }
}