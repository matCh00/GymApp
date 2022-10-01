/** 
 * Model własnego buttona 
 */

export interface OwnButtonModel {
  onPress: () => void,
  title?: string,
  icon?: string,
  size?: number
  marginTop?: number,
  marginBottom?: number,
  marginLeft?: string,
  marginRight?: string,
  width?: string,
}
  