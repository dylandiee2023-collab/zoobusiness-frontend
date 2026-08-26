import { BaseController } from "../foundation/controllers";
import { FormRegistry } from "./FormRegistry";

export class FormController extends BaseController<FormRegistry> {
  constructor() {
    super(new FormRegistry());
  }
}