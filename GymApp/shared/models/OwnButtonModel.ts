/** 
 * Model własnego buttona 
 */

export interface OwnButtonModel {
  onPress: () => void,
  title?: string,
  icon?: string,
  size?: number
  marginTop?: number,
  numberInRow?: number,
}
  