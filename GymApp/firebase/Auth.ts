/**
 * Uwierzytelnianie
 */

import { auth } from "./Init";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getUsers } from "./Init";

export const registerWithEmailAndPassword = async (email: string, password: string) => {  
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } 
  catch (err: any) {
    console.error(err);
  }
};

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  console.log(getUsers());
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } 
  catch (err: any) {
    console.error(err);
  }
};

export const logout = () => {
  signOut(auth);
};
