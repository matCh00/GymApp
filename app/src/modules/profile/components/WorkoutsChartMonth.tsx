/**
 * Wykres zrealizowanych treningów na przestrzeni miesiąca
 */

import { StyleSheet, ActivityIndicator, View, Dimensions } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { AuthModel } from '../../auth/models/AuthModel';
import { AuthContext } from '../../auth/context/AuthContext';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { WorkoutsChartModel } from '../models/WorkoutsChartModel';
import { useNavigation } from '@react-navigation/native';
import useTheme from '../../root/theme/hooks/useTheme';
import React from 'react';
import { getSummariesMonthDB } from '../../../firebase/Database';
import OwnButton from '../../../shared/components/OwnButton';
import { TrainingSummaryModel } from '../../plans/models/TrainingSummaryModel';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';

const WorkoutsChartMonth = ({setSelectedMonth}) => {

  const [chartData, setChartData] = useState<WorkoutsChartModel[]>([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [dayStart, setDayStart] = useState(0);
  const [dayEnd, setDayEnd] = useState(0);
  const [month, setMonth] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [ticks, setTicks] = useState([]);
  const [focusListener, setFocusListener] = useState(false);

  /**
   * zwrócenie pierwszego i ostatniego dnia miesiąca
   * monthIndex = 0 => aktualny miesiąc
   * monthIndex = 1 => moesiąc poprzedni
   */
  const monthBoundaries = (monthIndex: number) => {
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let month = new Date(now.getFullYear(), now.getMonth() - monthIndex + 1);
    let lastDay = new Date(month.getFullYear(), month.getMonth(), month.getDate() - 1, month.getHours() + 2);
    let name = monthNames[lastDay.getMonth()] + " " + lastDay.getFullYear();

    setSelectedMonth(lastDay);

    return {start: 1, last: lastDay.getDate(), name: name}
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
   * nawigacja
   */
  const navigation = useNavigation();

  /**
   * załadowanie podsumowań treningów
   */
  useEffect(() => {
    let tempData: WorkoutsChartModel[] = [];

    getSummariesMonthDB(email, month).then(
      (data: TrainingSummaryModel[]) => {

        data.forEach((training: TrainingSummaryModel) => { 
         
          /* pobranie oryginalnej daty bez dodawania TIMEZONE */
          let date = new Date(training.date).getUTCDate();  
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
    setDayEnd(monthBoundaries(month).last);
    setMonthName(monthBoundaries(month).name);

    let tempTicks = [1, 5, 10, 15, 20, 25];
    tempTicks.push(monthBoundaries(month).last);
    setTicks(tempTicks);
  }, [month, focusListener])

  /**
   * focus listener
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFocusListener(f => !f)
    });
    return unsubscribe;
  }, [navigation]);

  /**
   * następny miesiąc
   */
  const handleNextMonth = () => {
    if (month === 0) 
      return
    setMonth(m => m - 1);
  }

  /**
   * poprzedni miesiąc
   */
  const handlePreviousMonth = () => {
    setMonth(m => m + 1);
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
            domain={{x: [dayStart-0.7, dayEnd+0.4]}} 
            padding={{top: 20, bottom: 65, right: 20, left: 40}} 
            height={Dimensions.get('window').height / 2}
          >
            <VictoryAxis
              label={monthName}
              //tickFormat={(t) => (Number.isInteger(t) ? t : null)}
              tickValues={ticks}
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

      <View style={{flexDirection: 'row'}}>
        <OwnButton icon='calendar-arrow-left' onPress={handlePreviousMonth} width='30%' />
        <OwnButton icon='calendar-arrow-right' onPress={handleNextMonth} width='30%' />
        <OwnButton icon='calendar' onPress={handleCurrentMonth} width='30%' />
      </View>

    </>
  );
};

export default WorkoutsChartMonth;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});