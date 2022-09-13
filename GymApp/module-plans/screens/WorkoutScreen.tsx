/**
 * Ekran ćwiczeń
 */

import { StyleSheet, Text, View, FlatList } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlansStackParams } from '../navigation/PlansNavigation';
import WorkoutItem from '../components/WorkoutItem';
import OwnButton from '../../shared/components/OwnButton';
import { useNavigation } from '@react-navigation/native';
import Timer from '../components/Timer';
import { timerService } from '../services/TimerService';
import { TimerActionsEnum } from '../utils/TimerActionsEnum';
import { ResultModel } from '../utils/ResultModel';

const WorkoutScreen = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ResultModel[]>([]);

  /**
   * referencja do komponentu
   */
  const timerRef = useRef(null);

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
   * następne ćwiczenie
   */
  const nextExercise = () => {
    if (currentIndex < statePlan.exercises.length) {
      let res = timerRef.current.signalResult();
      res.name = statePlan.exercises[currentIndex].exerciseName;
      setResults([...results, res]);
      timerService.sendSignal('NEXT' as TimerActionsEnum);  
      setCurrentIndex(index => index + 1);    
    }
  }

  /**
   * zakończenie treningu
   */
  const handleFinish = () => {
    timerService.sendSignal('FINISH' as TimerActionsEnum);
    navigation.push("Plans");
  }
  
  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        {currentIndex < statePlan.exercises.length
          ?
            <> 
              <Timer ref={timerRef} />

              <WorkoutItem 
                pathName={statePlan.exercises[currentIndex].pathName} 
                muscleName={statePlan.exercises[currentIndex].muscleName}
                exerciseName={statePlan.exercises[currentIndex].exerciseName}
                exerciseKey={statePlan.exercises[currentIndex].exerciseKey}
                sets={statePlan.exercises[currentIndex].sets}
                reps={statePlan.exercises[currentIndex].reps}
                weight={statePlan.exercises[currentIndex].weight}
              />

              <OwnButton 
                title={currentIndex < statePlan.exercises.length - 1 ? "Next exercise" : "Finish"} 
                onPress={nextExercise} 
                marginTop={20} 
              />

              <View style={{flexDirection: 'row'}}>
                <OwnButton title="Start" onPress={() => {timerService.sendSignal('RESUME' as TimerActionsEnum)}} />
                <OwnButton title="Pause" onPress={() => {timerService.sendSignal('PAUSE' as TimerActionsEnum)}} />
              </View>
            </>
            
          :
            <>
              <OwnButton title="Save" onPress={handleFinish} marginTop={20} marginBottom={20} />

                <FlatList
                  data={results}
                  renderItem={(itemData) => {
                    return (
                      <View>
                        <Text style={style.headerText}>
                          {itemData.item.name}
                        </Text>

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
      textAlign: 'right',
      color: theme.colors.STEP_999,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginBottom: 20,
    },
    headerText: {
      textAlign: 'left',
      color: theme.colors.STEP_99,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginTop: 20,
      marginBottom: 10,
    }
  });