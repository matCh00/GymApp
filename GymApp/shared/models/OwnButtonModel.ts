/** 
 * Model własnego buttona 
 */

export interface OwnButtonModel {
  onPress: () => void,
  title?: string,
  alignSelf?: boolean,
  icon?: string,
}
  