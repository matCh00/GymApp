/**
 * Wykres czasów trwania treningów na przestrzeni miesiąca
 */

import { StyleSheet, ActivityIndicator, View, Dimensions, Text } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { useContext, useEffect, useState } from 'react';
import { TrainingSummaryModel } from '../../module-plans/models/TrainingSummaryModel';
import { getSummariesMonthDB } from '../../firebase/Database';
import { AuthModel } from '../../module-auth/models/AuthModel';
import { AuthContext } from '../../module-auth/context/AuthContext';
import { VictoryPie, VictoryLabel } from "victory-native";
import { TimesChartModel } from '../models/TimesChartModel';
import OwnButton from '../../shared/components/OwnButton';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import { compare } from '../utils/Compare';

const TimesChartMonth = () => {

  const [chartData, setChartData] = useState<TimesChartModel[]>([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [month, setMonth] = useState(0);
  const [monthName, setMonthName] = useState('');
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
    let tempData: TimesChartModel[] = [];

    getSummariesMonthDB(email, month).then(
      (data: TrainingSummaryModel[]) => {

        data.forEach((training: TrainingSummaryModel) => { 
         
          if (training.time) {

            if (training.time.hours === 0 && training.time.minutes < 30) {
              tempData.push({section: '< 0:30', value: 1})
            }
            else if (training.time.hours === 0 && training.time.minutes >= 30) {
              tempData.push({section: '< 1:00', value: 1})
            }
            else if (training.time.hours === 1 && training.time.minutes < 30) {
              tempData.push({section: '< 1:30', value: 1})
            }
            else if (training.time.hours === 1 && training.time.minutes >= 30) {
              tempData.push({section: '< 2:00', value: 1})
            }
            else if (training.time.hours === 2 && training.time.minutes < 30) {
              tempData.push({section: '< 2:30', value: 1})
            }
            else if (training.time.hours === 2 && training.time.minutes >= 30) {
              tempData.push({section: '< 3:00', value: 1})
            }
            else {
              tempData.push({section: '>= 3:00', value: 1})
            }
          }
        })
        
        /**
         * połączenie tych samych elementów
         */
        const map = new Map();
        for(const {section, value} of tempData) {
          const currTraining = map.get(section) || 0;
          map.set(section, currTraining + value);
        }
        const reducedArray = Array.from(map, ([section, value]) => ({section, value}));

        /* sortowanie */
        reducedArray.sort(compare);

        if (reducedArray.length > 0) 
          setChartData(reducedArray);  
        else 
          setChartData([{section: 'No data', value: 1}])
        
        setLoadingFinished(true);
      }
    );
    
    setMonthName(monthBoundaries(month).name);
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
      <Text style={[GlobalStyles.text, style.text]}>{monthName}</Text>

      {loadingFinished 
        ?
          <VictoryPie 
            data={chartData} 
            x="section"
            y="value"
            width={Dimensions.get('window').width * 10 / 11}
            style={{
              data: {
                fillOpacity: 0.9, stroke: theme.colors.STEP_5, strokeWidth: 1
              },
              labels: {
                fontSize: 11, fill: theme.colors.STEP_999
              }
            }}
            colorScale={
              chartData.length > 1 ? [
                theme.colors.STEP_9999,
                theme.colors.STEP_999,
                theme.colors.STEP_99, 
                theme.colors.STEP_9, 
              ] : [
                theme.colors.STEP_999,
              ]
            }
            events={[{
              target: "data",
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: "data",
                      mutation: ({ style }) => {
                        /* po naciśnięciu zamiana koloru wypełnienia */
                        return style.fill === theme.colors.STEP_6 ? null : { style: { fill: theme.colors.STEP_6 } };
                      }
                    }, {
                      target: "labels",
                      mutation: ({ text }) => {
                        /* po naciśnięciu zamiana tekstu data.section na data.value */
                        return !text.includes(':') ? null : { text: chartData.find(d => {return d.section === text}).value.toString() };
                      }
                    }
                  ];
                }
              }
            }]}
          />
        :
          <ActivityIndicator color={theme.colors.STEP_999} size={30} />
      }

      <View style={{flexDirection: 'row', marginBottom: -120}}>
        <OwnButton icon='calendar-arrow-left' onPress={handlePreviousMonth} width='30%' />
        <OwnButton icon='calendar-arrow-right' onPress={handleNextMonth} width='30%' />
        <OwnButton icon='calendar' onPress={handleCurrentMonth} width='30%' />
      </View>

    </>
  );
};

export default TimesChartMonth;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_99,
      fontSize: theme.typography.size.L,
      marginBottom: 30,
      marginTop: -125,
    },
    legend: {
      color: theme.colors.STEP_99,
      fontSize: theme.typography.size.M,
    }
  });