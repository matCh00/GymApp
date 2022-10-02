/**
 * Ekran ćwiczeń
 */

import { StyleSheet, Text, View, FlatList } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlansStackParams } from '../navigation/PlansNavigation';
import WorkoutItemActive from '../components/WorkoutItemActive';
import OwnButton from '../../shared/components/OwnButton';
import { useNavigation } from '@react-navigation/native';
import Timer from '../components/Timer';
import { timerService } from '../services/TimerService';
import { TimerActionsEnum } from '../utils/TimerActionsEnum';
import { ResultTimeModel } from '../models/ResultTimeModel';
import { ResultsModel } from '../models/ResultsModel';
import { TrainingSummaryModel } from '../models/TrainingSummaryModel';
import { addSummaryDB } from '../../firebase/Database';
import { AuthModel } from '../../module-auth/models/AuthModel';
import { AuthContext } from '../../module-auth/context/AuthContext';
import { ExerciseModel } from '../../module-creator/models/ExerciseModel';

const WorkoutScreenActive = () => {
  
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [results, setResults] = useState<ResultsModel[]>([]);
  const [setsIndex, setSetsIndex] = useState(0);
  const [totalSets, setTotalSets] = useState(0);
  const [setDone, setSetDone] = useState(0);

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
   * context uwierzytelniania
   */
  const {email} = useContext<AuthModel>(AuthContext);

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
    setSetDone(s => s + 1);

    if (exerciseIndex < statePlan.exercises.length) {

      let res: ResultTimeModel = timerRef.current.signalResult();
      timerService.sendSignal('NEXT' as TimerActionsEnum);  

      if (setsIndex < statePlan.exercises[exerciseIndex].sets - 1) {
        setSetsIndex(i => i + 1);
      }
      else {
        setSetsIndex(0);
        setExerciseIndex(index => index + 1);
      } 

      setResults([
        ...results, 
        {
          exerciseName: statePlan.exercises[exerciseIndex].exerciseName, 
          muscleName: statePlan.exercises[exerciseIndex].muscleName,
          sets: statePlan.exercises[exerciseIndex].sets,
          reps: statePlan.exercises[exerciseIndex].reps,
          weight: statePlan.exercises[exerciseIndex].weight,
          time: res
        }
      ]);
    }
  }

  /**
   * zakończenie treningu
   */
  const handleSave = () => {
    timerService.sendSignal('FINISH' as TimerActionsEnum);

    let date = new Date();
    let summary = {
      date: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON(),
      summary: results
    } as TrainingSummaryModel;

    addSummaryDB(email, summary);
    navigation.replace("Plans");
  }

  /**
   * zliczenie wszystkich serii
   */
  useEffect(() => {
    let sum = 0;
    statePlan.exercises.forEach((e: ExerciseModel) => {
      sum += e.sets;
    })
    setTotalSets(sum);
  }, [])
  
  
  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        {exerciseIndex < statePlan.exercises.length
          ?
            <> 
              <Text style={style.textProgress}>
                {Math.floor((setDone / totalSets) * 100)}% -&gt; {Math.floor(((setDone + 1) / totalSets) * 100)}%
              </Text>

              <Timer ref={timerRef} />

              <WorkoutItemActive 
                pathName={statePlan.exercises[exerciseIndex].pathName} 
                muscleName={statePlan.exercises[exerciseIndex].muscleName}
                exerciseName={statePlan.exercises[exerciseIndex].exerciseName}
                exerciseKey={statePlan.exercises[exerciseIndex].exerciseKey}
                sets={statePlan.exercises[exerciseIndex].sets}
                reps={statePlan.exercises[exerciseIndex].reps}
                weight={statePlan.exercises[exerciseIndex].weight}
              />

              <OwnButton 
                title={
                  exerciseIndex < statePlan.exercises.length - 1 || 
                  setsIndex < statePlan.exercises[exerciseIndex].sets - 1 
                  ? "Next exercise" : "Finish"
                } 
                onPress={nextExercise} 
                marginTop={20} 
              />

              <View style={{flexDirection: 'row'}}>
                <OwnButton title="Reset" onPress={() => {timerService.sendSignal('RESUME' as TimerActionsEnum)}} width='40%' />
                <OwnButton title="Pause" onPress={() => {timerService.sendSignal('PAUSE' as TimerActionsEnum)}} width='40%' />
              </View>
            </>
            
          :
            <>
              <OwnButton title="Save" onPress={handleSave} marginTop={20} marginBottom={20} />

                <FlatList
                  data={results}
                  renderItem={(itemData) => {
                    return (
                      <View style={{width: '100%', paddingHorizontal: '20%'}}>
                        <Text style={style.headerText}>
                          {itemData.item.exerciseName}
                        </Text>

                        <Text style={style.descriptionText}>
                          reps: {itemData.item.reps}, weight: {itemData.item.weight}
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                          <Text style={style.text}>
                            {itemData.item.time.hours > 9 ? itemData.item.time.hours : '0' + itemData.item.time.hours + ':'}
                          </Text>
                          <Text style={style.text}>
                            {itemData.item.time.minutes > 9 ? itemData.item.time.minutes : '0' + itemData.item.time.minutes + ':'}
                          </Text>
                          <Text style={style.text}>
                            {itemData.item.time.seconds > 9 ? itemData.item.time.seconds : '0' + itemData.item.time.seconds}
                          </Text>
                        </View>

                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => { return index.toString() + 'outer'; }} 
      
                  numColumns={1}
                />
            </>
        }

      </View>
    </BackgroundTemplate>
  );
};

export default WorkoutScreenActive;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_999,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginBottom: 20,
    },
    headerText: {
      color: theme.colors.STEP_99,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginTop: 20,
    },
    descriptionText: {
      color: theme.colors.STEP_99,
      fontWeight: '600',
      fontSize: theme.typography.size.M,
      marginTop: 5,
      marginBottom: 10,
    },
    textProgress: {
      color: theme.colors.STEP_9,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginBottom: 10,
    }
  });