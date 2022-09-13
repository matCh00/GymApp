/**
 * Serwis do zdarzeń timera
 */

import { Subject } from "rxjs";
import { TimerActionsEnum } from "../utils/TimerActionsEnum";

const signal$ = new Subject<TimerActionsEnum>()

export const timerService = {
  sendSignal: (type: TimerActionsEnum) => signal$.next(type),
  getSignal: () => signal$.asObservable(),
}