import { BaseController } from "../foundation/controllers";
import { DataDisplayRegistry } from "./DataDisplayRegistry";

export class DataDisplayController extends BaseController<DataDisplayRegistry> {
  constructor() {
    super(new DataDisplayRegistry());
  }
}
