/**
 * Model własnego alertu
 */

export interface OwnAlertModel {
  visible: boolean;
  setVisible?: (value: boolean) => void | Promise<void>;
  header: string;
  question: string;
  func?: () => void | Promise<void>;
  variant: OwnAlertVariantsEnum;
}

export enum OwnAlertVariantsEnum {
  YES_NO = 'YES_NO',
  OK = 'OK'
}
