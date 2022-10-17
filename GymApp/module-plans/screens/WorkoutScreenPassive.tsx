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
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlansStackParams } from '../navigation/PlansNavigation';
import OwnButton from '../../shared/components/OwnButton';
import { useNavigation } from '@react-navigation/native';
import { ResultsModel } from '../models/ResultsModel';
import { TrainingSummaryModel } from '../models/TrainingSummaryModel';
import { addSummaryDB } from '../../firebase/Database';
import { AuthModel } from '../../module-auth/models/AuthModel';
import { AuthContext } from '../../module-auth/context/AuthContext';
import WorkoutItemPassive from '../components/WorkoutItemPassive';

const WorkoutScreen = () => {
  
  const [results, setResults] = useState<ResultsModel[]>([]);
  const [trainingFinished, setTrainingFinished] = useState(false);
  const [startedTraining, setStartedTraining] = useState<Date>(new Date());  // czas: rozpoczęcie treningu
  const [finishedTraining, setFinishedTraining] = useState<Date>(null);

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
    setTrainingFinished(true);
    setFinishedTraining(new Date());  // czas: zakończenie treningu
  }

  /**
   * zapisanie treningu
   */
  const handleSave = () => {
    const trainingTime = +finishedTraining - +startedTraining;
    let seconds = Math.floor(trainingTime / 1000) % 60;
    let minutes = Math.floor(seconds / 60) % 60;
    let hours = Math.floor(minutes / 60) % 24;

    let date = new Date();
    let summary = {
      date: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON(),
      summary: results,
      time: {seconds: seconds, minutes: minutes, hours: hours}
    } as TrainingSummaryModel;

    addSummaryDB(email, summary);
    navigation.replace("Plans");
  }

  /**
   * sygnał zakończenia jednego ćwiczenia
   */
  const handleSetDoneSignal = (exercise: ResultsModel) => {
    setResults([...results, exercise]);
  }
  
  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        {!trainingFinished
          ?
            <>               
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
                        setDoneSignal={handleSetDoneSignal}
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
                      <View style={{width: '100%', paddingHorizontal: '20%'}}>
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
    headerText: {
      color: theme.colors.STEP_99,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginTop: 20,
    },
    descriptionText: {
      color: theme.colors.STEP_999,
      fontWeight: '600',
      fontSize: theme.typography.size.M,
      marginTop: 5,
      marginBottom: 10,
    },
  });