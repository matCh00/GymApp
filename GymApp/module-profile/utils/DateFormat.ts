/**
 * Formatowanie daty
 */

export const DateFormat = (date: Date) => {

  let localeString = date.toISOString();
  let splitted = localeString.split('T');

  return splitted[0]; // + ' ' + splitted[1].slice(0,5);
}