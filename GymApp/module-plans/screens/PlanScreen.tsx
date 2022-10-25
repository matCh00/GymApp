/**
 * Ekran wybranego planu treningowego
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, FlatList } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { PlansStackParams } from '../navigation/PlansNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import OwnButton from '../../shared/components/OwnButton';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseItemPlans from '../components/ExerciseItemPlans';
import { PlanModel } from '../models/PlanModel';
import { useLayoutEffect, useState } from 'react';
import { ExerciseItemModel } from '../../module-creator/models/ExerciseItemModel';

type Props = NativeStackScreenProps<PlansStackParams, 'Plan'>;

const PlanScreen = ({route, navigation}: Props) => {

  const [exercises, setExercises] = useState<ExerciseItemModel[]>([]);

  /**
   * przekazane ćwiczenia w planie treningowym
   */
  const planKey = route.params.planKey;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * stan plans z reducera
   */
  const statePlans = useSelector((state: any) => state.savedPlans.plans);

  /**
   * załadowanie ćwiczeń dla konkretnego planu
   */
  useLayoutEffect(() => {
    let plan = statePlans.filter((plan: PlanModel) => {
      return plan.planKey === planKey;
    })
    setExercises(plan[0].exercises);
  }, [])

  /**
   * rozpoczęcie aktywnego treningu
   */
  const handleStartActiveWorkout = () => {
    navigation.push("ActiveWorkout");
  }

  /**
   * rozpoczęcie aktywnego treningu
   */
   const handleStartPassiveWorkout = () => {
    navigation.push("PassiveWorkout");
  }

  return (
    <BackgroundTemplate>

      <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 20}}>
        <OwnButton title="Start active workout!" onPress={handleStartActiveWorkout} marginTop={20} width='40%' />
        <OwnButton title="Start passive workout!" onPress={handleStartPassiveWorkout} marginTop={20} width='40%' />
      </View>

      <FlatList
        data={exercises}
        renderItem={(itemData) => {
          return (
            <View style={GlobalStyles.listItem}>
              <ExerciseItemPlans 
                pathName={itemData.item.pathName} 
                muscleName={itemData.item.muscleName}
                exerciseName={itemData.item.exerciseName}
                exerciseKey={itemData.item.exerciseKey}
                sets={itemData.item.sets}
                reps={itemData.item.reps}
                weight={itemData.item.weight}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => { return index.toString(); }} 

        numColumns={1}
      />

    </BackgroundTemplate>
  );
};

export default PlanScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});
