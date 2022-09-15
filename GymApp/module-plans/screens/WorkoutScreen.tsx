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
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlansStackParams } from '../navigation/PlansNavigation';
import WorkoutItem from '../components/WorkoutItem';
import OwnButton from '../../shared/components/OwnButton';
import { useNavigation } from '@react-navigation/native';
import Timer from '../components/Timer';
import { timerService } from '../services/TimerService';
import { TimerActionsEnum } from '../utils/TimerActionsEnum';
import { ResultModel } from '../utils/ResultModel';
import { ResultsModel } from '../utils/ResultsModel';
import { TrainingSummaryModel } from '../utils/TrainingSummaryModel';
import { addSummaryDB } from '../../firebase/Database';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';

const WorkoutScreen = () => {
  
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [results, setResults] = useState<ResultsModel[]>([]);
  const [setIndex, setSetIndex] = useState(0);
  const [resultArr, setResultArr] = useState<ResultModel[]>([]);

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
    if (exerciseIndex < statePlan.exercises.length) {

      let res: ResultModel = timerRef.current.signalResult();
      timerService.sendSignal('NEXT' as TimerActionsEnum);  

      setResultArr([...resultArr, res])

      if (setIndex < statePlan.exercises[exerciseIndex].sets - 1) {
        setSetIndex(i => i + 1);
      }
      else {
        setResults([...results, {exerciseName: statePlan.exercises[exerciseIndex].exerciseName, results: [...resultArr, res]}]);
        setResultArr([]);
        setSetIndex(0);
        setExerciseIndex(index => index + 1); 
      }  
    }
  }

  /**
   * zakończenie treningu
   */
  const handleFinish = () => {
    timerService.sendSignal('FINISH' as TimerActionsEnum);

    let date = new Date();
    let summary = {
      date: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON(),
      summary: results
    } as TrainingSummaryModel;

    addSummaryDB(email, summary);

    navigation.replace("Plans");
  }
  
  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        {exerciseIndex < statePlan.exercises.length
          ?
            <> 
              <Timer ref={timerRef} />

              <WorkoutItem 
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
                  setIndex < statePlan.exercises[exerciseIndex].sets - 1 
                  ? "Next exercise" : "Finish"
                } 
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
                          {itemData.item.exerciseName}
                        </Text>

                        <FlatList
                          data={itemData.item.results}
                          renderItem={(itemData2) => {
                            return (
                              <View style={{flexDirection: 'row'}}>
                                <Text style={style.text}>
                                  {itemData2.item.hours > 9 ? itemData2.item.hours : '0' + itemData2.item.hours + ':'}
                                </Text>
                                <Text style={style.text}>
                                  {itemData2.item.minutes > 9 ? itemData2.item.minutes : '0' + itemData2.item.minutes + ':'}
                                </Text>
                                <Text style={style.text}>
                                  {itemData2.item.seconds > 9 ? itemData2.item.seconds : '0' + itemData2.item.seconds}
                                </Text>
                              </View>
                            );
                          }}
                          keyExtractor={(item, index) => { return index.toString() + 'inner'; }} 

                          numColumns={1}
                        />

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