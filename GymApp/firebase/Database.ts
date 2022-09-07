/**
 * Baza danych
 */

import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "./Init";


/**
 * referencja do kolekcji 'users'
 */
const usersRef = collection(firestore, 'users');


/**
 * pobierz użytkowników z bazy
 */
export const getUsers = async () => {

  let users = [];

  getDocs(usersRef).then((snapshot: any) => {
  
    snapshot.docs.forEach((doc: any) => {
      users.push({ ...doc.data() });
    });
    console.log(users);
    return users;
  })
  .catch((error: any) => {
    console.log(error.message);
    return null;
  })
};


/**
 * dodaj użytkownika do bazy
 */
export const addUser = async (email: string) => {
  
  addDoc(usersRef, {email: email})
}


/**
 * usuń użytkownika z bazy
 */
export const deleteUser = async (email: string) => {

  const docRef = doc(firestore, 'users', email);

  deleteDoc(docRef).then((res: any) => {
    console.log(res);
  })
  .catch((error: any) => {
    console.log(error);
  })
}


/**
 * dodaj zapisany motyw użytkownikowi
 */
export const addTheme = async (email: string, theme: string) => {
  
  const q = query(usersRef, where("email", '==', email));

  const querySnapshot = await getDocs(q);

  const docRef = doc(usersRef, querySnapshot.docs[0].id);

  await updateDoc(docRef, {theme: theme})
}

/**
 * dodaj zapisany motyw użytkownikowi
 */
 export const getTheme = async (email: string) => {
  
  // const q = query(usersRef, where("email", '==', email));

  // const querySnapshot = await getDocs(q);

  // const theme = doc(usersRef, querySnapshot.docs[0].data['theme']);

  // console.log(theme);

  getDocs(usersRef).then((snapshot: any) => {
  
    snapshot.docs.forEach((doc: any) => {
      console.log({ ...doc.data().theme });
    });
  })
}