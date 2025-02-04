/**
 * Obsługa uwierzytelniania
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./Init";
import { addUserDB } from "./Database";


/**
 * rejestracja uzytkownika
 */
export const registerWithEmailAndPassword = async (email: string, password: string) => {  

  const credentials = await createUserWithEmailAndPassword(auth, email, password);
  const user = credentials.user;

  await addUserDB(user.email);

  return user.email;
};


/**
 * logowanie uzytkownika
 */
export const logInWithEmailAndPassword = async (email: string, password: string) => {

  const credentials = await signInWithEmailAndPassword(auth, email, password);
  const user = credentials.user;

  return user.email;
};


/**
 * wylogowanie uzytkownika
 */
export const logout = async () => {

  await signOut(auth);
};