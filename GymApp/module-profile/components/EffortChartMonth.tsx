/**
 * Wykres starań podczas treningów na przestrzeni miesiąca
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
import { VictoryArea, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel } from "victory-native";
import OwnButton from '../../shared/components/OwnButton';
import { EffortChartModel } from '../utils/EffortChartModel';
import { ResultsModel } from '../../module-plans/utils/ResultsModel';

const EffortChartMonth = ({exerciseName, type}) => {

  const [chartData, setChartData] = useState<EffortChartModel[]>([]);
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
    let last = new Date(mth.getFullYear(), mth.getMonth(), mth.getDate() - 1, mth.getHours() + 2);
    let name = monthNames[last.getMonth()] + " " + last.getFullYear(); 

    return {start: 1, last: last.getDate(), name: name}
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
        console.log(tempData);
        
        setChartData(tempData);
        setLoadingFinished(true);
      }
    );
    
    setDayStart(monthBoundaries(month).start);
    setDayEnd(monthBoundaries(month).last);
    setMonthName(monthBoundaries(month).name);
  }, [month, exerciseName, type])

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

      <View style={{flexDirection: 'row', marginBottom: -120}}>
        <OwnButton icon='calendar-arrow-left' onPress={handlePreviousMonth} numberInRow={3} />
        <OwnButton icon='calendar-arrow-right' onPress={handleNextMonth} numberInRow={3} />
        <OwnButton icon='calendar' onPress={handleCurrentMonth} numberInRow={3} />
      </View>

    </>
  );
};

export default EffortChartMonth;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});