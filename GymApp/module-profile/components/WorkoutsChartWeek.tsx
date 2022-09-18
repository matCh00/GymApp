/**
 * Wykres zrealizowanych treningów na przestrzeni miesiąca
 */

import { StyleSheet, ActivityIndicator, View, Dimensions, Text } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { useContext, useEffect, useState } from 'react';
import { TrainingSummaryModel } from '../../module-plans/utils/TrainingSummaryModel';
import { getSummariesWeekDB } from '../../firebase/Database';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { WorkoutsChartModel } from '../utils/WorkoutsChartModel';
import OwnButton from '../../shared/components/OwnButton';

const WorkoutsChartWeek = () => {

  const [chartData, setChartData] = useState<WorkoutsChartModel[]>([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [dayStart, setDayStart] = useState(0);
  const [dayEnd, setDayEnd] = useState(0);
  const [week, setWeek] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [carriage, setCarriage] = useState(0);

  /**
   * zwrócenie dnia tygodnia dzisiaj oraz 7 dni temu
   */
   const weekBoundaries = (week: number) => {
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + carriage + 1 - 7 - (week * 7), now.getHours() + 2);
    let end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + carriage - (week * 7), now.getHours() + 2); 
    let name = monthNames[end.getMonth()];    
    
    if (start.getDate() < end.getDate()) {
      setCarriage(0);
    }
    else {
      setCarriage(7 - end.getDate());
    }

    return {start: start.getDate() < end.getDate() ? start.getDate() : 1, end: end.getDate(), name: name}
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

    getSummariesWeekDB(email, week).then(
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
    
    setDayStart(weekBoundaries(week).start);
    setDayEnd(weekBoundaries(week).end);
    setMonthName(weekBoundaries(week).name);
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
    <>
      {loadingFinished 
        ?
          <VictoryChart 
            theme={VictoryTheme.material} 
            domain={{x: [dayStart - 0.5, dayEnd]}} 
            padding={{top: 20, bottom: 65, right: 20, left: 40}} 
            height={Dimensions.get('window').height / 2}
          >
            <VictoryAxis
              label={monthName}
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
                data: {fill: theme.colors.STEP_99, fillOpacity: 0.95, width: 5}
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

    </>
  );
};

export default WorkoutsChartWeek;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});