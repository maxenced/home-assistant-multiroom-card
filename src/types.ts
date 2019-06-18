import { ActionConfig } from "custom-card-helpers";

export interface BoilerplateConfig {
  type: string;
  name?: string;
  show_warning?: boolean;
  show_error?: boolean;
  entities?: Array;
  sources?: Object;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}
