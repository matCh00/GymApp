import { Dispatch } from "react";

/** model uwierzytelniania */
export interface AuthModel {
  email: string,
  setEmail: Dispatch<string>,
  loggedIn: boolean,
  setLoggedIn: Dispatch<boolean>,
}
