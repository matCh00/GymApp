/**
 * Wykres zrealizowanych treningów na przestrzeni miesiąca
 */

import { StyleSheet, ActivityIndicator, View, Dimensions, Text } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { useContext, useEffect, useState } from 'react';
import { TrainingSummaryModel } from '../../module-plans/utils/TrainingSummaryModel';
import { getSummariesMonthDB } from '../../firebase/Database';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { WorkoutsChartModel } from '../utils/WorkoutsChartModel';
import OwnButton from '../../shared/components/OwnButton';

const WorkoutsChartMonth = () => {

  const [chartData, setChartData] = useState<WorkoutsChartModel[]>([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [dayStart, setDayStart] = useState(0);
  const [dayEnd, setDayEnd] = useState(0);
  const [month, setMonth] = useState(0);
  const [monthName, setMonthName] = useState('');

  /**
   * zwrócenie pierwszego i ostatniego dnia miesiąca
   * month = 0 => aktualny miesiąc
   * month = 1 => moesiąc poprzedni
   */
  const monthBoundaries = (month: number) => {
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let mth = new Date(now.getFullYear(), now.getMonth() - month + 1);
    let end = new Date(mth.getFullYear(), mth.getMonth(), mth.getDate() - 1, mth.getHours() + 2);
    let name = monthNames[end.getMonth()];

    return {start: 1, end: end.getDate(), name: name}
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

    getSummariesMonthDB(email, month).then(
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
    
    setDayStart(monthBoundaries(month).start);
    setDayEnd(monthBoundaries(month).end);
    setMonthName(monthBoundaries(month).name);
  }, [month])

  /**
   * następny miesiąc
   */
  const handleNextMonth = () => {
    if (month === 0) 
      return
    setMonth(w => w - 1);
  }

  /**
   * poprzedni miesiąc
   */
  const handlePreviousMonth = () => {
    setMonth(w => w + 1);
  }

  /**
   * aktualny miesiąc
   */
  const handleCurrentMonth = () => {
    setMonth(0);
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
              // tickValues={[1, 2, 3]}
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
        <OwnButton icon='calendar-arrow-left' onPress={handlePreviousMonth} numberInRow={3} />
        <OwnButton icon='calendar-arrow-right' onPress={handleNextMonth} numberInRow={3} />
        <OwnButton icon='calendar' onPress={handleCurrentMonth} numberInRow={3} />
      </View>

    </>
  );
};

export default WorkoutsChartMonth;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});