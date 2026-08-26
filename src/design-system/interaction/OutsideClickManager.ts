import { BaseManager } from "../foundation/managers";

import type {
  InteractionManager,
} from "./Interaction.types";

export class OutsideClickManager
  extends BaseManager
  implements InteractionManager {}