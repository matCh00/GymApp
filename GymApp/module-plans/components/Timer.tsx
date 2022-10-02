/**
 * Komponent zegara
 */

import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useStopwatch } from 'react-timer-hook';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import { timerService } from '../services/TimerService';
import { ResultTimeModel } from '../models/ResultTimeModel';
import { TimerActionsEnum } from '../utils/TimerActionsEnum';

const Timer = forwardRef((props, ref) => {

  /**
   * timer
   */
  const {
    seconds, minutes, hours, days, isRunning,
    start, pause, reset,
  } = useStopwatch({ autoStart: true });

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * wysłanie rezultatu
   * przekazanie wartości instancji komponentowi nadrzędnemu
   */
  useImperativeHandle(ref, () => ({
    signalResult() {
      return ({seconds: seconds, minutes: minutes, hours: hours} as ResultTimeModel);
    },
  }));

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * nasłuchiwanie zdarzeń
   */
  useEffect(() => {
    const subscription = timerService.getSignal().subscribe(
      (signal: TimerActionsEnum) => {
        handleSignal(signal);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  /**
   * przechwycenie sygnału
   */
  const handleSignal = (signal: TimerActionsEnum) => {
    switch (signal) {
      case TimerActionsEnum['NEXT']:
        reset();
        break;

      case TimerActionsEnum['RESUME']:
        start();
        break;

      case TimerActionsEnum['PAUSE']:
        pause();
        break;

      case TimerActionsEnum['FINISH']:
        pause();
        reset();
        break;
    
      default:
        break;
    }
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={[GlobalStyles.text, style.text]}>
        {hours > 9 ? hours : '0' + hours + ':'}
      </Text>
      <Text style={[GlobalStyles.text, style.text]}>
        {minutes > 9 ? minutes : '0' + minutes + ':'}
      </Text>
      <Text style={[GlobalStyles.text, style.text]}>
        {seconds > 9 ? seconds : '0' + seconds}
      </Text>
    </View>
  );
});

export default Timer;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.L,
      marginBottom: 20,
    },
  });