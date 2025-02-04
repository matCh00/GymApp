/** 
 * Model własnego inputa
 */

import { Dispatch } from "react";

export interface OwnInputModel {
  placeholder: string,
  value: string,
  onChangeText: Dispatch<string>,
  secureTextEntry?: boolean,
}
