/**
 * Ekran wykresu zrealizowanych treningów
 */

import { StyleSheet, ActivityIndicator, View, Dimensions, Text } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { TrainingSummaryModel } from '../../module-plans/utils/TrainingSummaryModel';
import { getAllSummariesDB, getSummariesDB } from '../../firebase/Database';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis } from "victory-native";
import { WorkoutsChartModel } from '../utils/WorkoutsChartModel';
import OwnButton from '../../shared/components/OwnButton';

const WorkoutsChartScreen = () => {

  const [chartData, setChartData] = useState<WorkoutsChartModel[]>([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [dayStart, setDayStart] = useState(0);
  const [dayEnd, setDayEnd] = useState(0);
  const [week, setWeek] = useState(0);

  /**
   * zwrócenie dnia tydzień temu oraz dzisiejszego dnia
   */
  const getWeek = (week: number) => {
    const now = new Date();
    return {
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7 - (week * 7), now.getHours() + 2).getDate(),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - (week * 7), now.getHours() + 2).getDate(),
    }
  };

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * context uwierzytelniania
   */
  const {email} = useContext<AuthModel>(AuthContext);

  /**
   * załadowanie podsumowań treningów
   */
  useEffect(() => {
    let tempData: WorkoutsChartModel[] = [];

    getSummariesDB(email, week).then(
      (data: TrainingSummaryModel[]) => {

        data.forEach((training: TrainingSummaryModel) => {  
          let date = new Date(training.date).getDate();  
          tempData.push({day: date, trainings: 1});
        })

        /**
         * połączenie tych samych elementów
         */
        const map = new Map();
        for(const {day, trainings} of tempData) {
          const currTraining = map.get(day) || 0;
          map.set(day, currTraining + trainings);
        }
        const reducedArray = Array.from(map, ([day, trainings]) => ({day, trainings}));

        setChartData(reducedArray);
        setLoadingFinished(true);
      }
    );
    
    setDayStart(getWeek(week).start);
    setDayEnd(getWeek(week).end);
  }, [week])

  /**
   * następny tydzień
   */
  const handleNextWeek = () => {
    if (week === 0) 
      return
    setWeek(w => w - 1);
  }

  /**
   * poprzedni tydzień
   */
  const handlePreviousWeek = () => {
    setWeek(w => w + 1);
  }

  /**
   * aktualny tydzień
   */
  const handleCurrentWeek = () => {
    setWeek(0);
  }

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        <Text style={style.text}>Overview</Text>

        {loadingFinished 
          ?
            <VictoryChart 
              theme={VictoryTheme.material} 
              domain={{x: [dayStart - 0.5, dayEnd - 0.5]}} 
              padding={{top: 20, bottom: 60, right: 20, left: 40}} 
              height={Dimensions.get('window').height / 2}
            >
              <VictoryAxis
                label="Day"
                tickFormat={(t) => (Number.isInteger(t) ? t : null)}
                style={{
                  grid: {stroke: theme.colors.STEP_1, strokeDasharray: "8 12", strokeWidth: 1},
                  tickLabels: { fontSize: 12, fill: theme.colors.STEP_999},
                  axis: {stroke: theme.colors.STEP_999},
                  axisLabel: {fontSize: 20, padding: 40, fill: theme.colors.STEP_99},
                  ticks: {stroke: theme.colors.STEP_1, size: 6},
                }}
              />

              <VictoryAxis
                dependentAxis
                crossAxis={false}
                minDomain={{y: 0}}
                tickFormat={(t) => (Number.isInteger(t) ? t : null)}
                style={{
                  grid: {stroke: theme.colors.STEP_1, strokeDasharray: "8 12", strokeWidth: 1},
                  tickLabels: {fontSize: 12, padding: 16, fill: theme.colors.STEP_999},
                  axis: {stroke: theme.colors.STEP_999},
                  axisLabel: {fontSize: 15, padding: 40, fill: theme.colors.STEP_99},
                  ticks: {stroke: theme.colors.STEP_1, size: 6},
                }}
              />

              <VictoryBar 
                data={chartData} 
                x="day" 
                y="trainings" 
                alignment='middle'
                style={{ 
                  data: {fill: theme.colors.STEP_999, fillOpacity: 0.8}
                }}
                animate={{
                  duration: 1500,
                  easing: "linear",
                  animationWhitelist: ["style", "data", "size"],
                  onExit: {
                    duration: 300,
                  },
                  onEnter: {
                    duration: 300,
                  }
                }}
              />
            </VictoryChart>
          :
            <ActivityIndicator color={theme.colors.STEP_999} size={30} />
        }

        <View style={{flexDirection: 'row', marginBottom: -120}}>
          <OwnButton icon='calendar-arrow-left' onPress={handlePreviousWeek} numberInRow={3} />
          <OwnButton icon='calendar-arrow-right' onPress={handleNextWeek} numberInRow={3} />
          <OwnButton icon='calendar' onPress={handleCurrentWeek} numberInRow={3} />
        </View>

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
      marginTop: -120,
    },
  });