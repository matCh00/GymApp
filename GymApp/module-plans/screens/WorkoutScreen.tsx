/**
 * Ekran ćwiczeń
 */

import { DeviceEventEmitter, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlansStackParams } from '../navigation/PlansNavigation';
import WorkoutItem from '../components/WorkoutItem';
import OwnButton from '../../shared/components/OwnButton';
import { useNavigation } from '@react-navigation/native';
import Timer from '../components/Timer';
import { clearResults } from '../redux/WorkoutReducer';

const WorkoutScreen = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<PlansStackParams>>();

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * stan plan z reducera
   */
  const statePlan = useSelector((state: any) => state.selectedPlan.plan);

  /**
   * stan results z reducera
   */
  const stateResults = useSelector((state: any) => state.selectedPlan.results);

  /**
   * następne ćwiczenie
   */
  const nextExercise = () => {
    if (currentIndex < statePlan.exercises.length) {
      setCurrentIndex(index => index + 1)
      DeviceEventEmitter.emit('workout.NEXT');
    }
  }

  /**
   * zakończenie treningu
   */
  const handleFinish = () => {
    DeviceEventEmitter.emit('workout.FINISH');
    dispatch(clearResults({}));
    navigation.push("Plans");
  }
  
  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        {currentIndex < statePlan.exercises.length
          ?
            <> 
              <Timer />

              <WorkoutItem 
                pathName={statePlan.exercises[currentIndex].pathName} 
                muscleName={statePlan.exercises[currentIndex].muscleName}
                exerciseName={statePlan.exercises[currentIndex].exerciseName}
                exerciseKey={statePlan.exercises[currentIndex].exerciseKey}
                sets={statePlan.exercises[currentIndex].sets}
                reps={statePlan.exercises[currentIndex].reps}
                weight={statePlan.exercises[currentIndex].weight}
              />

              <OwnButton title="Next exercise" onPress={nextExercise} marginTop={20} />

              <View style={{flexDirection: 'row'}}>
                <OwnButton title="Resume" onPress={() => {DeviceEventEmitter.emit('workout.RESUME')}} />
                <OwnButton title="Pause" onPress={() => {DeviceEventEmitter.emit('workout.PAUSE')}} />
              </View>
            </>
            
          :
            <>
              <OwnButton title="Finish" onPress={handleFinish} marginTop={20} />

              {stateResults 
                ?
                  <FlatList
                    data={stateResults}
                    renderItem={(itemData) => {
                      return (
                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={style.text}>
                              {itemData.item.hours > 9 ? itemData.item.hours : '0' + itemData.item.hours + ':'}
                            </Text>
                            <Text style={style.text}>
                              {itemData.item.minutes > 9 ? itemData.item.minutes : '0' + itemData.item.minutes + ':'}
                            </Text>
                            <Text style={style.text}>
                              {itemData.item.seconds > 9 ? itemData.item.seconds : '0' + itemData.item.seconds}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => { return index.toString() + 'inner'; }} 
        
                    numColumns={1}
                  />
                :
                  <ActivityIndicator color={theme.colors.STEP_0} size={30} />
              }
            </>
        }

      </View>
    </BackgroundTemplate>
  );
};

export default WorkoutScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_999,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginBottom: 20,
    },
  });