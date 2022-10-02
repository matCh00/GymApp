/**
 * Wykres zrealizowanych treningów na przestrzeni miesiąca
 */

import { StyleSheet, ActivityIndicator, View, Dimensions, Text } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { useContext, useEffect, useState } from 'react';
import { TrainingSummaryModel } from '../../module-plans/models/TrainingSummaryModel';
import { getSummariesBoundariesDB } from '../../firebase/Database';
import { AuthModel } from '../../module-auth/models/AuthModel';
import { AuthContext } from '../../module-auth/context/AuthContext';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { WorkoutsChartModel } from '../models/WorkoutsChartModel';
import OwnButton from '../../shared/components/OwnButton';
import { createDateAsUTC } from '../../shared/utils/DateFunctions';
import { useNavigation } from '@react-navigation/native';

const WorkoutsChartWeek = ({selectedMonth}) => {

  const [chartData, setChartData] = useState<WorkoutsChartModel[]>([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [dayStart, setDayStart] = useState(0);
  const [dayEnd, setDayEnd] = useState(0);
  const [week, setWeek] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [focusListener, setFocusListener] = useState(false);

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
   * zwrócenie daty od i do na podstawie tygodnia wstecz
   */
  const weekBoundaries = (week: number) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let time = createDateAsUTC(new Date());
    time.setFullYear(selectedMonth.getFullYear());
    time.setMonth(selectedMonth.getMonth());
    
    let start: Date;
    let end: Date;

    if (new Date().getFullYear() === time.getFullYear() && new Date().getMonth() === time.getMonth()) {
      start = createDateAsUTC(new Date(time.getFullYear(), time.getMonth(), time.getDate() - 6 - (week * 7)));
      end = createDateAsUTC(new Date(time.getFullYear(), time.getMonth(), time.getDate() - (week * 7)));
    }
    else {
      let startTemp = new Date(time.getFullYear(), time.getMonth())
      start = createDateAsUTC(new Date(startTemp.getFullYear(), startTemp.getMonth() + 1, startTemp.getDate() - 7 - (week * 7)));
      end = createDateAsUTC(new Date(startTemp.getFullYear(), startTemp.getMonth() + 1, startTemp.getDate() - 1 - (week * 7)));
    }        
    
    let name = monthNames[start.getMonth()] + " " + end.getFullYear();   

    return {name: name, start: start, end: end}
  };

  /**
   * ustawienie wartości po wyborze tygodnia
   */
  useEffect(() => {    
    const data: any = weekBoundaries(week);
    
    setDayStart(data.start.getDate() < data.end.getDate() ? data.start.getDate() : 1);
    setDayEnd(data.end.getDate());
    setMonthName(data.name);
    setStart(data.start);
    setEnd(data.end);
  }, [week])

  /**
   * załadowanie podsumowań treningów
   */
  useEffect(() => {
    let tempData: WorkoutsChartModel[] = [];

    getSummariesBoundariesDB(email, start, end).then(
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
  }, [start, focusListener])

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
   * następny tydzień
   */
  const handleNextWeek = () => {
    if (week === 0) 
      return;
    setWeek(w => w - 1);
  }

  /**
   * poprzedni tydzień
   */
  const handlePreviousWeek = () => {
    if (dayStart <= 1)
      return;
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
            domain={{x: [dayStart-0.4, dayEnd+0.4]}} 
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
                data: {fill: theme.colors.STEP_99, fillOpacity: 0.95, width: 15}
              }}
              animate={{
                duration: 1000,
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
        <OwnButton icon='calendar-arrow-left' onPress={handlePreviousWeek} width='30%' />
        <OwnButton icon='calendar-arrow-right' onPress={handleNextWeek} width='30%' />
        <OwnButton icon='calendar' onPress={handleCurrentWeek} width='30%' />
      </View>

    </>
  );
};

export default WorkoutsChartWeek;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});