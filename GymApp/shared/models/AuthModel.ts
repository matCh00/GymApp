/** 
 * Model uwierzytelniania 
 */

import { Dispatch } from "react";

export interface AuthModel {
  email: string,
  setEmail: Dispatch<string>,
  loggedIn: boolean,
  setLoggedIn: Dispatch<boolean>,
}
