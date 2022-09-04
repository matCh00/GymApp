/**
 * Model własnego popupa
 */

import { ReactNode } from "react";

export interface OwnPopupModel {
  visible: boolean;
  setVisible?: (value: boolean) => void | Promise<void>;
  children: ReactNode;
}
