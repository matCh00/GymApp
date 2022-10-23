/** 
 * Model kafelka 
 */

import { ReactNode } from "react";

export interface CardTemplateModel {
  children: ReactNode,
  width?: string,
  maxWidth?: string,
  radius?: number,
  color?: string,
  padding?: number,
  paddingBottom?: number,
  paddingVertical?: number,
  margin?: number,
}
