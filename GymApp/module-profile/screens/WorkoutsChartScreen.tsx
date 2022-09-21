/**
 * Ekran wykresu zrealizowanych treningów
 */

import { StyleSheet, View, Text } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import OwnButton from '../../shared/components/OwnButton';
import WorkoutsChartMonth from '../components/WorkoutsChartMonth';
import WorkoutsChartWeek from '../components/WorkoutsChartWeek';
import { useState } from 'react';

const WorkoutsChartScreen = () => {

  const [selectedMonth, setSelectedMonth] = useState(new Date);
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

          <Text style={style.text}>{mode ? 'Month' : 'Week'}</Text>
          <OwnButton icon={mode ? 'calendar-week-begin' : 'calendar-weekend'} onPress={handleSwitchMode} numberInRow={4} marginTop={-250} />
          
        </View>

        {mode
          ? <WorkoutsChartMonth setSelectedMonth={(m: Date) => {setSelectedMonth(m)}} />
          : <WorkoutsChartWeek selectedMonth={selectedMonth} />      
        }

      </View>
    </BackgroundTemplate>
  );
};

export default WorkoutsChartScreen;

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