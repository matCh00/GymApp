/**
 * Ekran wykresu używanego obciążenia podczas ćwiczeń
 */

import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import { useState } from 'react';
import OwnButton from '../../shared/components/OwnButton';
import WeightsChartMonth from '../components/WeightsChartMonth';

const WeightsChartScreen = () => {

  const [mode, setMode] = useState(true);

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * zmiana wykresu
   */
  const handleSwitchMode = () => {
    setMode(m => !m);
  }

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        
      <View style={{flexDirection: 'row', marginBottom: -80}}>

        <Text style={style.text}>{mode ? 'Month' : 'Year'}</Text>
        <OwnButton icon='swap-horizontal' onPress={handleSwitchMode} numberInRow={4} marginTop={-250} />

        </View>

        {mode
        ? <WeightsChartMonth />
        : null    
        }

      </View>
    </BackgroundTemplate>
  );
};

export default WeightsChartScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_999,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginBottom: 20,
      marginTop: -150,
    },
  });