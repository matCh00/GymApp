/**
 * Ekran wykresu starań podczas ćwiczeń
 */

import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import EffortChartMonth from '../components/EffortChartMonth';
import DropDownPicker from 'react-native-dropdown-picker';
import MusclesEnum from '../../creator/utils/MusclesEnum';
import { Exercises } from '../../creator/utils/Exercises';
import useTheme from '../../root/theme/hooks/useTheme';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';

const EffortChartScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * props dla DropDownPicker
   */
  const [muscleOpen, setMuscleOpen] = useState(false);
  const [muscleValue, setMuscleValue] = useState(null);
  const muscleItems: {label: string, value: string}[] = [];
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const [exerciseValue, setExerciseValue] = useState(null);
  const [exerciseItems, setExerciseItems] = useState<{label: string, value: string}[]>([]);
  const [effortOpen, setEffortOpen] = useState(false);
  const [effortValue, setEffortValue] = useState('weight');
  let effortItems: {label: string, value: string}[] = [];

  Object.values(MusclesEnum).forEach((e: string) => {
    muscleItems.push({label: e, value: e});
  });

  effortItems = [
    {label: 'sets', value: 'sets'},
    {label: 'reps', value: 'reps'},
    {label: 'weight', value: 'weight'}
  ]

  /**
   * selekcja ćwiczeń na podstawie partii mieśniowej
   */
  useEffect(() => {
    setExerciseItems([]);
    
    if (muscleValue) {      

      let muscleKey = Object.keys(MusclesEnum).find(
        key => MusclesEnum[key] === muscleValue
      )

      Exercises[muscleKey].forEach((val: any) => {        
        setExerciseItems(e => [...e, {label: val.name, value: val.name}]);
      })
    }
    else {
      setExerciseItems([]);
    }
  }, [muscleValue]);

  return (
    <BackgroundTemplate>
        
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

        <View style={{width: '30%', zIndex: 2000000}}>
          <DropDownPicker
            open={muscleOpen}
            value={muscleValue}
            items={muscleItems}
            setOpen={setMuscleOpen}
            setValue={setMuscleValue}
            placeholder={'Select muscle'}
            style={{
              backgroundColor: theme.colors.STEP_999,
            }}
            dropDownContainerStyle={{backgroundColor: theme.colors.STEP_9999}}
          />
        </View>

        <View style={{width: '30%', zIndex: 2000000}}>
          <DropDownPicker
            open={exerciseOpen}
            value={exerciseValue}
            items={exerciseItems}
            setOpen={setExerciseOpen}
            setValue={setExerciseValue}
            placeholder={'Select exercise'}
            bottomOffset={100}
            style={{
              backgroundColor: theme.colors.STEP_999,
            }}
            dropDownContainerStyle={{backgroundColor: theme.colors.STEP_9999}}
          />
        </View>

        <View style={{width: '30%', zIndex: 2000000}}>
          <DropDownPicker
            open={effortOpen}
            value={effortValue}
            items={effortItems}
            setOpen={setEffortOpen}
            setValue={setEffortValue}
            placeholder={'Select type'}
            style={{
              backgroundColor: theme.colors.STEP_999,
            }}
            dropDownContainerStyle={{backgroundColor: theme.colors.STEP_9999}}
          />
        </View>

      </View>

      <Text style={[GlobalStyles.text, style.text]}>{exerciseValue}</Text>

      <EffortChartMonth exerciseName={exerciseValue} type={effortValue} />

    </BackgroundTemplate>
  );
};

export default EffortChartScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.M,
      marginTop: 15,
      marginBottom: -15,
    },
  });