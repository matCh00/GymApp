/**
 * Ekran ćwiczeń
 */

import { StyleSheet, Text, View, FlatList,Alert } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlansStackParams } from '../navigation/PlansNavigation';
import OwnButton from '../../shared/components/OwnButton';
import { useNavigation } from '@react-navigation/native';
import { ResultModel } from '../utils/ResultModel';
import { ResultsModel } from '../utils/ResultsModel';
import { TrainingSummaryModel } from '../utils/TrainingSummaryModel';
import { addSummaryDB } from '../../firebase/Database';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import { ExerciseModel } from '../../module-creator/utils/ExerciseModel';
import WorkoutItemPassive from '../components/WorkoutItemPassive';

const WorkoutScreen = () => {
  
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [results, setResults] = useState<ResultsModel[]>([]);
  const [setIndex, setSetIndex] = useState(0);
  const [resultArr, setResultArr] = useState<ResultModel[]>([]);
  const [totalSets, setTotalSets] = useState(0);
  const [setsDone, setSetsDone] = useState(0);
  const [finished, setFinished] = useState(false);

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
   * zakończenie treningu
   */
  const handleFinish = () => {
    if (setsDone < totalSets) {
      Alert.alert("Not finished", "There are still unfinished exercises!", [
        { text: "OK", onPress: () => null },
      ]);
    }
    else {
      setFinished(true);
    }
  }

  /**
   * zapisanie treningu
   */
  const handleSave = () => {
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

  /**
   * sygnał zakończenia jednego ćwiczenia
   */
  const handleDoneSignal = (exercise: ResultsModel) => {
    setSetsDone(s => s + 1);

    setResults([...results, exercise]);
  }  
  
  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        {!finished
          ?
            <> 
              {setsDone < totalSets
                ?
                  <Text style={style.textProgress}>
                    {Math.floor((setsDone / totalSets) * 100)}% -&gt; {Math.floor(((setsDone + 1) / totalSets) * 100)}%
                  </Text>
                : 
                  <Text style={style.textProgress}>100%</Text>
              }
              
              <FlatList
                data={statePlan.exercises}
                renderItem={(itemData) => {
                  return (
                    <View style={style.listContainer}>

                      <WorkoutItemPassive 
                        pathName={itemData.item.pathName} 
                        muscleName={itemData.item.muscleName}
                        exerciseName={itemData.item.exerciseName}
                        exerciseKey={itemData.item.exerciseKey}
                        sets={itemData.item.sets}
                        reps={itemData.item.reps}
                        weight={itemData.item.weight}
                        doneSignal={handleDoneSignal}
                      />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => { return item.toString() + index.toString(); }} 
                numColumns={1} 
              />

              <OwnButton title={"Finish"} onPress={handleFinish} marginTop={10} marginBottom={12} />
            </>
            
          :
            <>
              <OwnButton title="Save" onPress={handleSave} marginTop={20} marginBottom={20} />

                <FlatList
                  data={results}
                  renderItem={(itemData) => {
                    return (
                      <View>
                        <Text style={style.headerText}>
                          {itemData.item.exerciseName}
                        </Text>

                        <Text style={style.descriptionText}>
                          reps: {itemData.item.reps}, weight: {itemData.item.weight}
                        </Text>

                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => { return index.toString(); }} 
      
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
      marginVertical: 10,
    }
  });