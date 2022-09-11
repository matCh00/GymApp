/**
 * Komponent zegara
 */

import { DeviceEventEmitter, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useStopwatch } from 'react-timer-hook';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { addResult } from '../redux/WorkoutReducer';

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
  DeviceEventEmitter.addListener('workout.NEXT', (event: any) => {
    dispatch(addResult({result: {seconds: seconds, minutes: minutes, hours: hours}}));
    reset();
  });
  DeviceEventEmitter.addListener('workout.RESUME', (event: any) => {
    start();
  });
  DeviceEventEmitter.addListener('workout.PAUSE', (event: any) => {
    pause();
  });
  DeviceEventEmitter.addListener('workout.FINISH', (event: any) => {
    pause();
    reset();
  });
  
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