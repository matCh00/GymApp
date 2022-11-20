/**
 * Ekran wykresu zrealizowanych treningów
 */

import { StyleSheet, View, Text } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
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
    //setMode(m => !m);
  }

  return (
    <BackgroundTemplate>

      <View style={{flexDirection: 'row'}}>

        <Text style={[GlobalStyles.text, style.text]}>{mode ? 'Month' : 'Week'}</Text>
        <OwnButton icon={mode ? 'calendar-week-begin' : 'calendar-weekend'} onPress={handleSwitchMode} width='25%' marginTop={-10} />
        
      </View>

      {mode
        ? <WorkoutsChartMonth setSelectedMonth={(m: Date) => {setSelectedMonth(m)}} />
        : <WorkoutsChartWeek selectedMonth={selectedMonth} />      
      }

    </BackgroundTemplate>
  );
};

export default WorkoutsChartScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.XL,
    },
  });