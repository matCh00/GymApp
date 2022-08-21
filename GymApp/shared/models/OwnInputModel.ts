import { Dispatch } from "react";

/** 
 * model własnego inputu 
 */
export interface OwnInputModel {
  placeholder: string,
  value: string,
  onChangeText: Dispatch<string>,
  secureTextEntry?: boolean,
}
