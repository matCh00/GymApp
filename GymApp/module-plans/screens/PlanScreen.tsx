/**
 * Ekran wybranego planu treningowego
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { PlansStackParams } from '../navigation/PlansNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import OwnButton from '../../shared/components/OwnButton';
import { useSelector } from 'react-redux';
import ExerciseItem from '../components/ExerciseItem';
import { PlanModel } from '../utils/PlanModel';
import { useLayoutEffect, useState } from 'react';
import { ExerciseModel } from '../../module-creator/utils/ExerciseModel';

type Props = NativeStackScreenProps<PlansStackParams, 'Plan'>;

const PlanScreen = ({route, navigation}: Props) => {

  const [exercises, setExercises] = useState<ExerciseModel[]>([]);

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

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        <OwnButton title="Start workout!" onPress={() => {navigation.push("Workout")}} marginTop={20} />

        <FlatList
          data={exercises}
          renderItem={(itemData) => {
            return (
              <View style={style.listContainer}>

                <ExerciseItem 
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

      </View>
    </BackgroundTemplate>
  );
};

export default PlanScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    listContainer: {
      minWidth: '100%',
      alignItems: 'center',
    },
  });
