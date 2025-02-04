/**
 * Łączność z bazą danych
 */

import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, setDoc, where, getDoc, startAfter } from "firebase/firestore";
import { firestore } from "./Init";
import { PlanModel } from "../modules/plans/models/PlanModel";
import { TrainingSummaryModel } from "../modules/plans/models/TrainingSummaryModel";

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
 * oraz datę założenia konta
 */
export const addUserDB = async (email: string) => {
  
  await addDoc(usersRef, {
    email: email,
    created: new Date(),
  })
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
 * pobierz datę utworzenia konta
 */
export const getCreatedDB = async (email: string) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);  

  return querySnapshot.docs[0].get("created");
}


/**
 * dodaj nowy plan treningowy
 * edytuj istniejący plan treningowy
 */
export const addPlanDB = async (email: string, plan: PlanModel) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const docRef = doc(usersRef, querySnapshot.docs[0].id, 'plans', plan.planName);

  await setDoc(docRef, {plan: plan});
}


/**
 * usuń plan treningowy
 */
export const deletePlanDB = async (email: string, planName: string) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const docRef = doc(usersRef, querySnapshot.docs[0].id, 'plans', planName);

  await deleteDoc(docRef);
}


/**
 * pobierz nazwy planów treningowych
 */
export const getPlanNamesDB = async (email: string) => {

  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const colRef = collection(usersRef, querySnapshot.docs[0].id, 'plans');
  
  const plansSnapshot = await getDocs(colRef);

  let names: string[] = [];

  plansSnapshot.forEach((doc: any) => {
    names.push(doc.data().plan.planName);
  });
  
  return names;
}


/**
 * pobierz plany treningowe
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
export const getSummariesWeekDB = async (email: string, week: number) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const colRef = collection(usersRef, querySnapshot.docs[0].id, 'summary');
  
  const summariesSnapshot = await getDocs(colRef);
  
  let summaries = [];

  const now = new Date();
  const boundaries = {
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7 - (week * 7), now.getHours() + TIMEZONE),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - (week * 7), now.getHours() + TIMEZONE),
  };

  summariesSnapshot.forEach((doc: any) => {
    let summary = doc.data().summary

    if (new Date(summary.date) >= new Date(boundaries.start) && new Date(summary.date) <= new Date(boundaries.end)) {
      summaries.push({ ...doc.data().summary });
    }
  });
 
  return summaries;
}


/**
 * pobierz podsumowania treningów z konkretnego miesiąca
 * 0 - bieżący miesiąc, 1 - zeszły miesiąc, 2 - dwa miesiąc temu itd...
 */
export const getSummariesMonthDB = async (email: string, month: number) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const colRef = collection(usersRef, querySnapshot.docs[0].id, 'summary');
  
  const summariesSnapshot = await getDocs(colRef);
  
  let summaries = [];

  const now = new Date();
  let mth = new Date(now.getFullYear(), now.getMonth() - month);
  const boundaries = {
    start: new Date(mth.getFullYear(), mth.getMonth(), mth.getDate(), mth.getHours() + TIMEZONE, mth.getMinutes(), mth.getSeconds()),
    end: new Date(mth.getFullYear(), mth.getMonth() + 1, mth.getDate(), mth.getHours() + TIMEZONE, mth.getMinutes(), mth.getSeconds() - 1),
  };  

  summariesSnapshot.forEach((doc: any) => {
    let summary = doc.data().summary

    if (new Date(summary.date) >= new Date(boundaries.start) && new Date(summary.date) <= new Date(boundaries.end)) {
      summaries.push({ ...doc.data().summary });
    }
  });  
 
  return summaries;
}


/**
 * pobierz podsumowania treningów z podanego zakresu czasu
 * podajemy pełne daty (00:00:00)
 * dateFrom: 01.01 dateTo: 05.01 -> <01.01 00:00:00, 05.01 23:59:59>
 */
export const getSummariesBoundariesDB = async (email: string, dateFrom: Date, dateTo: Date) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const colRef = collection(usersRef, querySnapshot.docs[0].id, 'summary');
  
  const summariesSnapshot = await getDocs(colRef);
  
  let summaries = [];

  let dateToNext = dateTo;
  dateToNext.setDate(dateTo.getDate() + 1);

  summariesSnapshot.forEach((doc: any) => {
    let summary = doc.data().summary

    if (new Date(summary.date) >= new Date(dateFrom) && new Date(summary.date) < new Date(dateToNext)) {
      summaries.push({ ...doc.data().summary });
    }
  });

  return summaries;
}