/**
 * Komponent zegara
 */

import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useStopwatch } from 'react-timer-hook';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { timerService } from '../services/TimerService';
import { ResultModel } from '../utils/ResultModel';
import { TimerActionsEnum } from '../utils/TimerActionsEnum';

const Timer = () => {

  /**
   * timer
   */
  const {
    seconds, 
    minutes, 
    hours, 
    days, 
    isRunning,
    start, 
    pause, 
    reset, 
  } = useStopwatch({ autoStart: true });
  
  let counter= 0;
  useEffect(() => {
    const interval = setInterval(() => {
      counter = counter + 1;
      console.log(counter);
      
    }, 1000);
    return () => clearInterval(interval);
  });

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

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
        timerService.sendResult({seconds: seconds, minutes: minutes, hours: hours});                
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
      <Text style={style.text}>
        {hours > 9 ? hours : '0' + hours + ':'}
      </Text>
      <Text style={style.text}>
        {minutes > 9 ? minutes : '0' + minutes + ':'}
      </Text>
      <Text style={style.text}>
        {seconds > 9 ? seconds : '0' + seconds}
      </Text>
    </View>
  );
};

export default Timer;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_999,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginBottom: 20,
    },
  });