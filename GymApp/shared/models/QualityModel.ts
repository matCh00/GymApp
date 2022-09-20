/** 
 * Model uwierzytelniania 
 */

import { Dispatch } from "react";

export interface QualityModel {
  quality: string,
  setQuality?: Dispatch<string>,
}
