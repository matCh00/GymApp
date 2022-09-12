/**
 * Serwis do zdarzeń timera
 */

import { Subject } from "rxjs";
import { ResultModel } from "../utils/ResultModel";
import { TimerActionsEnum } from "../utils/TimerActionsEnum";

const signal$ = new Subject<TimerActionsEnum>()
const result$ = new Subject<any>()

export const timerService = {
  sendSignal: (type: TimerActionsEnum) => signal$.next(type),
  getSignal: () => signal$.asObservable(),

  sendResult: (data: ResultModel) => result$.next(data),
  getResult: () => result$.asObservable(),
}