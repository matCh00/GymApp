/**
 * Wykres starań podczas treningów na przestrzeni miesiąca
 */

import { StyleSheet, ActivityIndicator, View, Dimensions } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { useContext, useEffect, useState } from 'react';
import { TrainingSummaryModel } from '../../module-plans/models/TrainingSummaryModel';
import { getSummariesMonthDB } from '../../firebase/Database';
import { AuthModel } from '../../module-auth/models/AuthModel';
import { AuthContext } from '../../module-auth/context/AuthContext';
import { VictoryArea, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import OwnButton from '../../shared/components/OwnButton';
import { EffortChartModel } from '../models/EffortChartModel';
import { ResultsModel } from '../../module-plans/models/ResultsModel';
import { useNavigation } from '@react-navigation/native';

const EffortChartMonth = ({exerciseName, type}) => {

  const [chartData, setChartData] = useState<EffortChartModel[]>([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [month, setMonth] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [focusListener, setFocusListener] = useState(false);
  
  const TIMEZONE = 2;

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
    let lastDay = new Date(mth.getFullYear(), mth.getMonth(), mth.getDate() - 1, mth.getHours() + TIMEZONE);
    let name = monthNames[lastDay.getMonth()] + " " + lastDay.getFullYear(); 

    return {name: name}
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
   * wyciągnięcie z nich wszystkich elementów danego typu 
   * w kolejności od najmłodszego na przestrzeni wybranego miesiąca
   */
  useEffect(() => {
    let tempData: EffortChartModel[] = [];

    getSummariesMonthDB(email, month).then(
      (data: TrainingSummaryModel[]) => {

        data.forEach((training: TrainingSummaryModel) => {  
          
          let selectedResults: ResultsModel[] = [];

          training.summary.forEach((results: ResultsModel) => {

            if (results.exerciseName === exerciseName) {
              selectedResults.push(results);

              /* dodajemy obciążenie z każdej serii danego treningu */
              if (type === 'weight' && results.weight) {
                tempData.push({data: results.weight, iterator: tempData.length});
              }

              /* dodajemy liczbę powtórzeń z każdej serii danego treningu */
              else if (type === 'reps' && results.reps) {
                tempData.push({data: results.reps, iterator: tempData.length});
              }
            }
          })

          /* dodajemy liczbę serii z danego treningu */
          if (type === 'sets') {
            tempData.push({data: selectedResults.length, iterator: tempData.length});
          }
        })
        
        setChartData(tempData);
        setLoadingFinished(true);
      }
    );
    
    setMonthName(monthBoundaries(month).name);
  }, [month, exerciseName, type, focusListener])

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
            padding={{top: 20, bottom: 65, right: 20, left: 40}} 
            height={Dimensions.get('window').height / 2}
          >
            <VictoryAxis
              label={monthName}
              tickFormat={() => null}
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

            <VictoryArea 
              data={chartData} 
              y="data" 
              interpolation="basis"
              style={{ 
                data: {fill: theme.colors.STEP_99, fillOpacity: 0.95, width: 5}
              }}
              animate={{
                duration: 2000,
                easing: "bounce",
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

export default EffortChartMonth;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});