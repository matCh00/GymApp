/**
 * Baza danych
 */

import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, setDoc, where, getDoc } from "firebase/firestore";
import { PlanModel } from "../module-plans/utils/PlanModel";
import { firestore } from "./Init";


/**
 * referencja do kolekcji 'users'
 */
const usersRef = collection(firestore, 'users');


/**
 * pobierz użytkowników
 */
export const getUsersDB = async () => {

  let users = [];

  const usersSnapshot = await getDocs(usersRef);
  
  usersSnapshot.forEach((doc: any) => {
    users.push({ ...doc.data() });
  });
  
  return users;
};


/**
 * dodaj użytkownika
 */
export const addUserDB = async (email: string) => {
  
  await addDoc(usersRef, {email: email})
}


/**
 * usuń użytkownika
 */
export const deleteUserDB = async (email: string) => {

  const docRef = doc(firestore, 'users', email);

  await deleteDoc(docRef);
}


/**
 * aktualizuj motyw, dodaj gdy nie ma
 */
export const addThemeDB = async (email: string, theme: string) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const docRef = doc(usersRef, querySnapshot.docs[0].id);

  await updateDoc(docRef, {theme: theme});
}


/**
 * pobierz motyw
 */
export const getThemeDB = async (email: string) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);  

  return querySnapshot.docs[0].get("theme");
}


/**
 * dodaj nowy plan treningowy
 */
export const addPlanDB = async (email: string, plan: PlanModel) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const docRef = doc(usersRef, querySnapshot.docs[0].id, 'plans', plan.name);

  await setDoc(docRef, {plan: plan});
}


/**
 * pobierz plany treningowy
 */
export const getPlansDB = async (email: string) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const colRef = collection(usersRef, querySnapshot.docs[0].id, 'plans');
  
  const plansSnapshot = await getDocs(colRef);
  
  let plans = [];

  plansSnapshot.forEach((doc: any) => {
    plans.push({ ...doc.data() });
  });
  
  return plans;
}