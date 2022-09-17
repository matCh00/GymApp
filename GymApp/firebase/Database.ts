/**
 * Łączność z bazą danych
 */

import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, setDoc, where, getDoc } from "firebase/firestore";
import { PlanModel } from "../module-plans/utils/PlanModel";
import { TrainingSummaryModel } from "../module-plans/utils/TrainingSummaryModel";
import { firestore } from "./Init";

/**
 * strefa czasowa
 */
const TIMEZONE = 2;

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

  const docRef = doc(usersRef, querySnapshot.docs[0].id, 'plans', plan.planName);

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
    plans.push({ ...doc.data().plan });
  });
 
  return plans;
}


/**
 * dodaj podsumowanie treningu
 */
export const addSummaryDB = async (email: string, summary: TrainingSummaryModel) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const docRef = doc(usersRef, querySnapshot.docs[0].id, 'summary', summary.date);

  await setDoc(docRef, {summary: summary});
}


/**
 * pobierz wszystkie podsumowania treningów
 */
export const getAllSummariesDB = async (email: string) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const colRef = collection(usersRef, querySnapshot.docs[0].id, 'summary');
  
  const summariesSnapshot = await getDocs(colRef);
  
  let summaries = [];

  summariesSnapshot.forEach((doc: any) => {
    summaries.push({ ...doc.data().summary });
  });
 
  return summaries;
}


/**
 * pobierz podsumowania treningów z konkretnego tygodnia
 * 0 - bieżący tydzień, 1 - zeszły tydzień, 2 - dwa tygodnie temu itd...
 */
export const getSummariesDB = async (email: string, week: number) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const colRef = collection(usersRef, querySnapshot.docs[0].id, 'summary');
  
  const summariesSnapshot = await getDocs(colRef);
  
  let summaries = [];

  const now = new Date();
  const getWeek = {
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7 - (week * 7), now.getHours() + TIMEZONE),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - (week * 7), now.getHours() + TIMEZONE),
  };

  summariesSnapshot.forEach((doc: any) => {
    let summary = doc.data().summary

    if (new Date(summary.date) >= new Date(getWeek.start) && new Date(summary.date) <= new Date(getWeek.end)) {
      summaries.push({ ...doc.data().summary });
    }
  });
 
  return summaries;
}