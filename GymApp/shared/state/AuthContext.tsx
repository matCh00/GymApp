/**
 * Context uwierzytelniania
 */

import { createContext, useState } from "react";
import { AuthModel } from "../models/AuthModel";

/** stan początkowy */
const initialState = {
  email: "",
  setEmail: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
}

/** context */
export const AuthContext = createContext<AuthModel>(initialState);

/** provider */
export const AuthProvider = ({children}: any) => {

  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ email, setEmail, loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
